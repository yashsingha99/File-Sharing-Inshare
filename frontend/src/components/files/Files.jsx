import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import CloseIcon from "@mui/icons-material/Close";
import { getDownloadURL, uploadBytesResumable, ref } from "firebase/storage";
import FileDrop from "./FileDrop";
import { addFile, upadatePassword } from "../../api/api";
import { storage } from "../../firebase/config";
import { useUser } from "@clerk/clerk-react";
import { ButtonBase } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import "./file.css";
import CreatedFile from "./CreatedFile";
import DoneIcon from "@mui/icons-material/Done";
import filesrc from "../../images/file.png";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { isAbleToShare } from "../../api/user.api";
const MySwal = withReactContent(Swal);

function Files() {
  const [url, setUrl] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShare, setIsShare] = useState(false);
  const [isUploadFile, setIsUploadFile] = useState(false);
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState();
  const [fileType, setFileType] = useState("");
  const [fileId, setFileId] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const {user} = useUser();
  const path = "http://localhost:5173";
  console.log(fileType);

  const [pageSize, setPageSize] = useState({
    width: window.innerWidth,
    hight: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setPageSize({
        width: window.innerWidth,
        hight: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const uploadFile = async (snapshot, downloadURL) => {
    if(user){
     const data = { snapshot, downloadURL, user };
     const res = await addFile(data);
     setFileId(res.data.data.newFile._id);
    } else 
     alert("user doesn't exist")
  }; 

  const handleDrop = (acceptedFiles) => {
    const data = {user, size : ((acceptedFiles[0].size)/(1000 * 1000)).toFixed(2)}
    isAbleToShare(data)
    console.log(((acceptedFiles[0].size)/(1000 * 1000)).toFixed(2));
    setFile(acceptedFiles)
  };

  const updatePassword = (acceptedFiles) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "Do you really want to update the password?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Proceed",
      cancelButtonText: "Cancle",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setPassword("");
        const data = { password, fileId };
        const res = await upadatePassword(data);
        MySwal.fire("Success", "password updated.", "success");
        fetch();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        MySwal.fire("Cancelled", "Cancelled", "error");
      }
        setPassword("");
    });
    setPassword("");
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(`${path}/CreatedFile/${fileId}`);
    setTimeout(() => {
      setIsCopied(false);
    }, [3000]);
    setIsCopied(true);
  };

  const handleClick = () => {
   try {
     const imgRef = ref(storage, `files/${v4()}`);
     const uploadTask = uploadBytesResumable(imgRef, file[0], file[0].type);
 
     uploadTask.on("state_changed", async (snapshot) => {
       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
       setProgress(progress.toFixed(2));
       setFileType(snapshot.metadata.contentType);
       if (progress === 100) {
         const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
 
         setUrl(downloadURL);
         uploadFile(
           {
             ...snapshot,
             fileSize: file[0].size,
             fileName: file[0].name,
             type: file[0].type,
           },
           downloadURL
         );
         setIsUploadFile(true);
         setFile("");
         setProgress(0);
         setIsShare(false);
       }
     });
   } catch (error) {
    alert("This is not support. please another file ")
    setIsUploadFile(true);
    setFile("");
    setProgress(0);
    setIsShare(false);
   }
  };

  if (!isUploadFile)
    return (
      <section className="w-full text-gray-600 mt-8 justify-start items-center ">
        <div className=" py-24  flex  flex-col">
          <div className=" index w-full ml-20 h-full flex flex-col items-center ">
            <p className="text-xl md:text-5xl text-center font-bold text-cyan-900 mb-4">
              Share your files;
            </p>
            <div className="w-full  h-1/2 flex justify-center">
              <FileDrop onDrop={handleDrop} />
            </div>
            {file && !isShare && (
              <>
                <div className="p-4 rounded-lg   overflow-y-auto w-2/3 flex justify-center flex-col items-center gap-4 mt-4">
                  <div className="w-full flex shadow-lg flex-row  items-center p-2 bg-blue-200 rounded-lg shadow-md hover:shadow-lg duration-300 ease-in-out">
                    <div className="flex-1 p-2 text-left">{file[0].name}</div>
                    <div className="flex-1 p-2 text-left">
                      {(file[0].size / (1024 * 1024)).toFixed(2)} MB
                    </div>
                    <div className="flex-1 p-2 text-left">{file[0].type}</div>
                    <div className="flex gap-2">
                      <div
                        onClick={() => {
                          setFile("");
                        }}
                        className="hover:text-red-600 text-blue-700  transition-colors duration-300"
                      >
                        <CloseIcon />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <button
                    onClick={() => {
                      handleClick();
                      setIsShare(true);
                    }}
                    className="px-8 mx-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded transition-colors duration-300"
                  >
                    Share File
                  </button>
                </div>
              </>
            )}{" "}
            {file && isShare && (
              <div className="w-1/2 pt-1 mx-auto mt-4">
                <div className="flex mx-auto w-1/6 mb-2 items-center justify-between">
                  <div>
                    <span className="text-lg font-semibold inline-block py-2 px-3 uppercase rounded-full text-blue-600 bg-blue-200">
                      {progress}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden w-full   h-2 mb-4 text-xs flex rounded bg-blue-200">
                  <div
                    style={{ width: `${progress}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500 ease-in-out"
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      //  </div>
    );
  else
    return (
      <>
        <section className={`md:mt-24 ${window.innerWidth < 1030 ? "mt-24" : ""} text-gray-600 w-full flex  justify-center body-font`}>
          <div
            onClick={() => {
              setIsUploadFile(false);
            }}
            className=" m-4 cursor-pointer flex items-center hover:text-red-600 justify-center border w-8 h-8"
          >
            <ArrowBackIcon />
          </div>
          <div className={`container   ${window.innerWidth < 1030 ? " flex-wrap w-1/2" : ""} w-full flex px-8`}>
            <div className=" bg-gray-300  md:h-2/3 md:w-1/3  rounded-lg overflow-hidden sm:mr-10 p-8 flex items-start justify-center ">
              {fileType !== "video/mp4" && fileType !== "application/pdf" && (
                <img
                  className="w-full h-full"
                  src={
                    fileType === "image/jpeg" ||
                    fileType === "image/jpg" ||
                    fileType === "image/png" ||
                    fileType === "image/gif"
                      ? url
                      : filesrc
                  }
                  alt=""
                />
              )}

              {fileType === "video/mp4" && (
                <video src={url} controls className="w-full h-full" />
              )}

              {fileType === "application/pdf" && (
                <iframe src={url} className="h-full w-full"></iframe>
              )}
            </div>
            <div className="md:w-1/3 md:h-2/3  bg-blue-300 rounded text-blue-600 p-8 flex flex-col md:mx-auto  md:py-8 mt-8 md:mt-0">
              <div className="mb-4">
                <label htmlFor="name" className="leading-7 text-sm">
                  URL
                </label>
                <div className="w-full py-4 flex items-center justify-around cursor-pointer  text-blue-500 bg-white rounded-xl file focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  outline-none text-gray-700  leading-8 transition-colors duration-200 ease-in-out">
                  <input
                    className="w-5/6 border-none outline-none"
                    value={`${path}/CreatedFile/${fileId}`}
                    readOnly
                  />
                  <div onClick={handleCopyClick} className="flex justify-end">
                    {isCopied ? <DoneIcon /> : <ContentCopyIcon />}
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="leading-7 text-sm">
                  Password
                </label>
                <div className="w-full flex gap-4">
                  <input
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    name="password"
                    className="w-3/4 bg-white rounded Input focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  <button
                    onClick={updatePassword}
                    className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                  >
                    Update
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="leading-7 text-sm">
                  Reciver Email
                </label>
                <div className=" gap-4 w-full flex">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    className="w-3/4 bg-white rounded Input focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
}

export default Files;
