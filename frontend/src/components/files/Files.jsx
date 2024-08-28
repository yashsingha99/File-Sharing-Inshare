import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, uploadBytesResumable, ref } from "firebase/storage";
import { ButtonBase } from "@mui/material";
import {
  addFile,
  fetchActivatedBuyPlan,
  upadatePassword 
} from "../../api/api";
import { fetchPurchashedPlans } from "../../api/user.api";
import { storage } from "../../firebase/config";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneIcon from "@mui/icons-material/Done";
import FileDrop from "./FileDrop";
import filesrc from "../../images/file.png";
import "./file.css";

const MySwal = withReactContent(Swal);

function Files() {
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShare, setIsShare] = useState(false);
  const [isUploadFile, setIsUploadFile] = useState(false);
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState(null);
  const [allBoughtPlan, setAllBoughtPlan] = useState([]);
  const [fileType, setFileType] = useState("");
  const [fileId, setFileId] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [pageSize, setPageSize] = useState();
  const { user } = useUser();
  const navigate = useNavigate();
  const path = "http://localhost:5173";

  useEffect(() => {
    const handleResize = () => {
      setPageSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchPlans = async () => {
      if (user) {
        const resPlan = await fetchPurchashedPlans(user);
        setAllBoughtPlan(resPlan.data.result.BuyPlan);
      }
    };
    fetchPlans();
  }, [user]);

  const checkIsAbleToUpload = async () => {
    const res = await fetchActivatedBuyPlan(user);
    if (res.status === 400) {
      await MySwal.fire({
        title: "You are not able to share the file",
        text: "You need to purchase a plan before sharing files.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Go to Plans",
        confirmButtonColor: "#d33",
      }).then((result) => {
        if (result.isConfirmed) navigate("/");
      });
      return false;
    }
    return true;
  };

  const uploadFile = async (snapshot, downloadURL) => {
    if (user) {
      const data = { snapshot, downloadURL, user };
      const res = await addFile(data);
      setFileId(res.data.data.newFile._id);
    } else {
      alert("User doesn't exist");
    }
  };

  const handleDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(`${path}/CreatedFile/${fileId}`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };
  const UpdatePassword = async (data) => {
    const res = await upadatePassword(data)
    console.log("UpdatePassword", res);
  }

  const handlePasswordUpdate = () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "Do you really want to update the password?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Proceed",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = { password, fileId };
        await UpdatePassword(data);
        MySwal.fire("Success", "Password updated.", "success");
        setPassword("");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        MySwal.fire("Cancelled", "Password update cancelled.", "error");
      }
    });
  };



  const handleFileUpload = async () => {
    // const isAbleToUpload = await checkIsAbleToUpload();
    // if (isAbleToUpload && file) {
      try {
        const imgRef = ref(storage, `files/${uuidv4()}`);
        const uploadTask = uploadBytesResumable(imgRef, file, file.type);

        uploadTask.on("state_changed", async (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress.toFixed(2));
          setFileType(snapshot.metadata.contentType);

          if (progress === 100) {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setUrl(downloadURL);
            uploadFile(
              {
                ...snapshot,
                fileSize: file.size,
                fileName: file.name,
                type: file.type,
              },
              downloadURL
            );
            setIsUploadFile(true);
            setFile(null);
            setProgress(0);
            setIsShare(false);
          }
        });
      } catch (error) {
        alert("File upload failed. Please try a different file.");
        resetUploadState();
      }
    // }
  };

  const resetUploadState = () => {
    setIsUploadFile(true);
    setFile(null);
    setProgress(0);
    setIsShare(false);
  };

 

  if (!isUploadFile)
    return (
      <section className="w-full text-gray-600 mt-8 justify-start items-center">
        <div className="py-24 flex flex-col">
          <div className="index w-full ml-20 h-full flex flex-col items-center">
            <p className="text-xl md:text-5xl text-center font-bold text-cyan-900 mb-4">
              Share your files
            </p>
            <div className="w-full h-1/2 flex justify-center">
              <FileDrop onDrop={handleDrop} />
            </div>
            {file && !isShare && (
              <>
                <div className="p-4 rounded-lg overflow-y-auto w-2/3 flex justify-center flex-col items-center gap-4 mt-4">
                  <div className="w-full flex shadow-lg flex-row items-center p-2 bg-blue-200 rounded-lg shadow-md hover:shadow-lg duration-300 ease-in-out">
                    <div className="flex-1 p-2 text-left">{file.name}</div>
                    <div className="flex-1 p-2 text-left">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </div>
                    <div className="flex-1 p-2 text-left">{file.type}</div>
                    <div
                      onClick={() => setFile(null)}
                      className="hover:text-red-600 text-blue-700 transition-colors duration-300 cursor-pointer"
                    >
                      <CloseIcon />
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleFileUpload();
                    setIsShare(true);
                  }}
                  className="px-8 mx-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded transition-colors duration-300"
                >
                  Share File
                </button>
              </>
            )}
            {file && isShare && (
              <div className="w-1/2 pt-1 mx-auto mt-4">
                <div className="flex mx-auto w-1/6 mb-2 items-center justify-between">
                  <span className="text-lg font-semibold inline-block py-2 px-3 uppercase rounded-full text-blue-600 bg-blue-200">
                    {progress}%
                  </span>
                </div>
                <div className="overflow-hidden w-full h-2 mb-4 text-xs flex rounded bg-blue-200">
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
    );
  else
    return (
      <>
        <section
          className={`md:mt-24 ${
            window.innerWidth < 1030 ? "mt-24" : ""
          } text-gray-600 w-full flex  justify-center body-font`}
        >
          <div
            onClick={() => {
              setIsUploadFile(false);
            }}
            className=" m-4 cursor-pointer flex items-center hover:text-red-600 justify-center border w-8 h-8"
          >
            <ArrowBackIcon />
          </div>
          <div
            className={`container   ${
              window.innerWidth < 1030 ? " flex-wrap w-1/2" : ""
            } w-full flex px-8`}
          >
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
                    onClick={handlePasswordUpdate}
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

export default Files