import React, { useEffect, useState } from "react";
import { updateStatus, userFiles } from "../../api/api";
import { useUser } from "@clerk/clerk-react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import "./history.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "tailwindcss/tailwind.css";
import filesrc from "../../images/file.png";
import { Link } from "react-router-dom";
import Container from "../Container/Container";
const MySwal = withReactContent(Swal);

function History() {
  const { user } = useUser();
  const [allFile, setAllFile] = useState([]);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const res = await userFiles(user);
      setAllFile(res.data.data);
    };
    user && fetch();
  }, [user]);

  const fetch = async () => {
    const res = await userFiles(user);
    setAllFile(res.data.data);
  };

  const handleOpen = async (filePath) => {
    window.open(filePath, "_blank");
  };

  const handleDelete = (fileId) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await updateStatus(fileId);
        console.log("Deleted!");
        MySwal.fire("Deleted!", "Your item has been deleted.", "success");
        fetch();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        MySwal.fire("Cancelled", "Your file is safe 🙂", "error");
      }
    });
  };
  if (!allFile)
    return (
      <div className="mt-20 container w-full py-8 mt-20 text-center">
        <Container>
          <div className="  flex flex-wrap">
            <div className="p-2 w-full">
              <h1>You haven't post yet</h1>
              <h1 className="text-2xl flex justify-center items-center font-bold hover:text-gray-500">
                {/* <img src={img1} className="h-50 w-50" alt="" /> */}
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
    
  return (
    <section className=" w-5/6 text-gray-600 mx-auto ">
      <div className=" px-5 py-24  flex  flex-col">
        {allFile.map((file, i) => {
          if (file.status === true)
            return (
              <div
                key={i}
                className="flex-shrink-0  mb-4 flex flex-wrap items-center justify-between   pr-4  border-gray-950 w-80 lg:w-full h-80 lg:h-40 m-2  bg-gray-100 rounded-xl shadow-2xl"
              >
                <div className="flex mr-20 flex-col w-1/4 md:w-auto ">
                  {/* <div className=""> */}
                  {file.type !== "video/mp4" &&
                    file.type !== "application/pdf" && (
                      <img
                        onClick={() => handleOpen(file.path)}
                        className="rounded-xl h-40 w-40"
                        src={
                          file.type === "image/jpeg" ||
                          file.type === "image/jpg" ||
                          file.type === "image/png" ||
                          file.type === "image/gif"
                            ? file.path
                            : filesrc
                        }
                        alt=""
                      />
                    )}
                  {file.type === "video/mp4" && (
                    <video
                      src={file.path}
                      className="rounded-xl h-full w-full"
                    />
                  )}
                  {file.type === "application/pdf" && (
                    <iframe
                      src={file.path}
                      className="rounded-xl h-full w-full"
                    ></iframe>
                  )}
                  {/* </div> */}
                </div>
                <div className="w-2/3 flex justify-around" >
                  <div className="md:text-lg text-center w-1/4 text-sm font-medium title-font text-gray-900">
                  {(file.filename).substring(0, 6) + (file.filename).substring((file.filename).length - 5, (file.filename).length)}
                    <div className="text-gray-400 text-center">
                      {(file.size / (1000 * 1000)).toFixed(2)} MB
                    </div>
                  </div>
                  <span
                    onClick={() => handleOpen(file.path)}
                    className=" relative cursor-pointer hover:text-blue-600 ml-4 flex items-start flex-col leading-none"
                    onMouseEnter={() => setHover(i)}
                    onMouseLeave={() => setHover(null)}
                  >
                    <OpenInNewIcon />
                 { hover === i && <span className=" text-sm absolute bottom-16 left-4 px-2 py-1 rounded-lg text-black bg-gray-300" >open</span>}
                  </span>
                  <button
                    onClick={() => handleDelete(file._id)}
                    className="ml-8 flex items-start flex-col leading-none hover:text-red-600 "
                  >
                    <DeleteForeverIcon />
                  </button>
                </div>
              </div>
            );
        })}
        {allFile.map((file, i) => {
          if (file.status === true)
            return (
              <div
                key={i}
                className="flex-shrink-0  mb-4 flex flex-wrap items-center justify-between   pr-4  border-gray-950 w-80 lg:w-full h-80 lg:h-40 m-2  bg-gray-100 rounded-xl shadow-2xl"
              >
                <div className="flex mr-20 flex-col w-1/4 md:w-auto ">
                  {/* <div className=""> */}
                  {file.type !== "video/mp4" &&
                    file.type !== "application/pdf" && (
                      <img
                        onClick={() => handleOpen(file.path)}
                        className="rounded-xl h-40 w-40"
                        src={
                          file.type === "image/jpeg" ||
                          file.type === "image/jpg" ||
                          file.type === "image/png" ||
                          file.type === "image/gif"
                            ? file.path
                            : filesrc
                        }
                        alt=""
                      />
                    )}
                  {file.type === "video/mp4" && (
                    <video
                      src={file.path}
                      className="rounded-xl h-full w-full"
                    />
                  )}
                  {file.type === "application/pdf" && (
                    <iframe
                      src={file.path}
                      className="rounded-xl h-full w-full"
                    ></iframe>
                  )}
                  {/* </div> */}
                </div>
                <div className="w-2/3 flex justify-around" >
                  <div className="md:text-lg text-center w-1/4 text-sm font-medium title-font text-gray-900">
                  {(file.filename).substring(0, 6) + (file.filename).substring((file.filename).length - 5, (file.filename).length)}
                    <div className="text-gray-400 text-center">
                      {(file.size / (1000 * 1000)).toFixed(2)} MB
                    </div>
                  </div>
                  <button
                    onClick={() => handleOpen(file.path)}
                    className=" hover:text-blue-600 ml-4 flex items-start flex-col leading-none"
                  >
                    <OpenInNewIcon />
                  </button>
                  <button
                    onClick={() => handleDelete(file._id)}
                    className="ml-8 flex items-start flex-col leading-none hover:text-red-600 "
                  >
                    <DeleteForeverIcon />
                  </button>
                </div>
              </div>
            );
        })}
        {allFile.map((file, i) => {
          if (file.status === true)
            return (
              <div
                key={i}
                className="flex-shrink-0  mb-4 flex flex-wrap items-center justify-between   pr-4  border-gray-950 w-80 lg:w-full h-80 lg:h-40 m-2  bg-gray-100 rounded-xl shadow-2xl"
              >
                <div className="flex mr-20 flex-col w-1/4 md:w-auto ">
                  {/* <div className=""> */}
                  {file.type !== "video/mp4" &&
                    file.type !== "application/pdf" && (
                      <img
                        onClick={() => handleOpen(file.path)}
                        className="rounded-xl h-40 w-40"
                        src={
                          file.type === "image/jpeg" ||
                          file.type === "image/jpg" ||
                          file.type === "image/png" ||
                          file.type === "image/gif"
                            ? file.path
                            : filesrc
                        }
                        alt=""
                      />
                    )}
                  {file.type === "video/mp4" && (
                    <video
                      src={file.path}
                      className="rounded-xl h-full w-full"
                    />
                  )}
                  {file.type === "application/pdf" && (
                    <iframe
                      src={file.path}
                      className="rounded-xl h-full w-full"
                    ></iframe>
                  )}
                  {/* </div> */}
                </div>
                <div className="w-2/3 flex justify-around" >
                  <div className="md:text-lg text-center w-1/4 text-sm font-medium title-font text-gray-900">
                  {(file.filename).substring(0, 6) + (file.filename).substring((file.filename).length - 5, (file.filename).length)}
                    <div className="text-gray-400 text-center">
                      {(file.size / (1000 * 1000)).toFixed(2)} MB
                    </div>
                  </div>
                  <button
                    onClick={() => handleOpen(file.path)}
                    className=" hover:text-blue-600 ml-4 flex items-start flex-col leading-none"
                  >
                    <OpenInNewIcon />
                  </button>
                  <button
                    onClick={() => handleDelete(file._id)}
                    className="ml-8 flex items-start flex-col leading-none hover:text-red-600 "
                  >
                    <DeleteForeverIcon />
                  </button>
                </div>
              </div>
            );
        })}
        {allFile.map((file, i) => {
          if (file.status === true)
            return (
              <div
                key={i}
                className="flex-shrink-0  mb-4 flex flex-wrap items-center justify-between   pr-4  border-gray-950 w-80 lg:w-full h-80 lg:h-40 m-2  bg-gray-100 rounded-xl shadow-2xl"
              >
                <div className="flex mr-20 flex-col w-1/4 md:w-auto ">
                  {/* <div className=""> */}
                  {file.type !== "video/mp4" &&
                    file.type !== "application/pdf" && (
                      <img
                        onClick={() => handleOpen(file.path)}
                        className="rounded-xl h-40 w-40"
                        src={
                          file.type === "image/jpeg" ||
                          file.type === "image/jpg" ||
                          file.type === "image/png" ||
                          file.type === "image/gif"
                            ? file.path
                            : filesrc
                        }
                        alt=""
                      />
                    )}
                  {file.type === "video/mp4" && (
                    <video
                      src={file.path}
                      className="rounded-xl h-full w-full"
                    />
                  )}
                  {file.type === "application/pdf" && (
                    <iframe
                      src={file.path}
                      className="rounded-xl h-full w-full"
                    ></iframe>
                  )}
                  {/* </div> */}
                </div>
                <div className="w-2/3 flex justify-around" >
                  <div className="md:text-lg text-center w-1/4 text-sm font-medium title-font text-gray-900">
                  {(file.filename).substring(0, 6) + (file.filename).substring((file.filename).length - 5, (file.filename).length)}
                    <div className="text-gray-400 text-center">
                      {(file.size / (1000 * 1000)).toFixed(2)} MB
                    </div>
                  </div>
                  <button
                    onClick={() => handleOpen(file.path)}
                    className=" hover:text-blue-600 ml-4 flex items-start flex-col leading-none"
                  >
                    <OpenInNewIcon />
                  </button>
                  <button
                    onClick={() => handleDelete(file._id)}
                    className="ml-8 flex items-start flex-col leading-none hover:text-red-600 "
                  >
                    <DeleteForeverIcon />
                  </button>
                </div>
              </div>
            );
        })}
        {allFile.map((file, i) => {
          if (file.status === true)
            return (
              <div
                key={i}
                className="flex-shrink-0  mb-4 flex flex-wrap items-center justify-between   pr-4  border-gray-950 w-80 lg:w-full h-80 lg:h-40 m-2  bg-gray-100 rounded-xl shadow-2xl"
              >
                <div className="flex mr-20 flex-col w-1/4 md:w-auto ">
                  {/* <div className=""> */}
                  {file.type !== "video/mp4" &&
                    file.type !== "application/pdf" && (
                      <img
                        onClick={() => handleOpen(file.path)}
                        className="rounded-xl h-40 w-40"
                        src={
                          file.type === "image/jpeg" ||
                          file.type === "image/jpg" ||
                          file.type === "image/png" ||
                          file.type === "image/gif"
                            ? file.path
                            : filesrc
                        }
                        alt=""
                      />
                    )}
                  {file.type === "video/mp4" && (
                    <video
                      src={file.path}
                      className="rounded-xl h-full w-full"
                    />
                  )}
                  {file.type === "application/pdf" && (
                    <iframe
                      src={file.path}
                      className="rounded-xl h-full w-full"
                    ></iframe>
                  )}
                  {/* </div> */}
                </div>
                <div className="w-2/3 flex justify-around" >
                  <div className="md:text-lg text-center w-1/4 text-sm font-medium title-font text-gray-900">
                  {(file.filename).substring(0, 6) + (file.filename).substring((file.filename).length - 5, (file.filename).length)}
                    <div className="text-gray-400 text-center">
                      {(file.size / (1000 * 1000)).toFixed(2)} MB
                    </div>
                  </div>
                  <button
                    onClick={() => handleOpen(file.path)}
                    className=" hover:text-blue-600 ml-4 flex items-start flex-col leading-none"
                  >
                    <OpenInNewIcon />
                  </button>
                  <button
                    onClick={() => handleDelete(file._id)}
                    className="ml-8 flex items-start flex-col leading-none hover:text-red-600 "
                  >
                    <DeleteForeverIcon />
                  </button>
                </div>
              </div>
            );
        })}
        {allFile.map((file, i) => {
          if (file.status === true)
            return (
              <div
                key={i}
                className="flex-shrink-0  mb-4 flex flex-wrap items-center justify-between   pr-4  border-gray-950 w-80 lg:w-full h-80 lg:h-40 m-2  bg-gray-100 rounded-xl shadow-2xl"
              >
                <div className="flex mr-20 flex-col w-1/4 md:w-auto ">
                  {/* <div className=""> */}
                  {file.type !== "video/mp4" &&
                    file.type !== "application/pdf" && (
                      <img
                        onClick={() => handleOpen(file.path)}
                        className="rounded-xl h-40 w-40"
                        src={
                          file.type === "image/jpeg" ||
                          file.type === "image/jpg" ||
                          file.type === "image/png" ||
                          file.type === "image/gif"
                            ? file.path
                            : filesrc
                        }
                        alt=""
                      />
                    )}
                  {file.type === "video/mp4" && (
                    <video
                      src={file.path}
                      className="rounded-xl h-full w-full"
                    />
                  )}
                  {file.type === "application/pdf" && (
                    <iframe
                      src={file.path}
                      className="rounded-xl h-full w-full"
                    ></iframe>
                  )}
                  {/* </div> */}
                </div>
                <div className="w-2/3 flex justify-around" >
                  <div className="md:text-lg text-center w-1/4 text-sm font-medium title-font text-gray-900">
                  {(file.filename).substring(0, 6) + (file.filename).substring((file.filename).length - 5, (file.filename).length)}
                    <div className="text-gray-400 text-center">
                      {(file.size / (1000 * 1000)).toFixed(2)} MB
                    </div>
                  </div>
                  <button
                    onClick={() => handleOpen(file.path)}
                    className=" hover:text-blue-600 ml-4 flex items-start flex-col leading-none"
                  >
                    <OpenInNewIcon />
                  </button>
                  <button
                    onClick={() => handleDelete(file._id)}
                    className="ml-8 flex items-start flex-col leading-none hover:text-red-600 "
                  >
                    <DeleteForeverIcon />
                  </button>
                </div>
              </div>
            );
        })}
      </div>
    </section>
  );
}

export default History;
