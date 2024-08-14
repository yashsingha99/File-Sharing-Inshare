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
import { Link, useLocation } from "react-router-dom";
import Container from "../Container/Container";
import { AnimatePresence, motion } from "framer-motion"
const MySwal = withReactContent(Swal);

function History() {
  const { user } = useUser();
  const [allFile, setAllFile] = useState([]);
  const [hover, setHover] = useState(null);
  const [selectedId, setSelectedId] = useState(null)
  const location = useLocation()
  useEffect(() => {
    const fetch = async () => {
      const res = await userFiles(user);
      setAllFile(res.data.data);
    };
    user && fetch();
  }, [user, location]);
 console.log();
 
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
      text: "Do you really want to buy this plan?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Proceed",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await updateStatus(fileId);
        MySwal.fire("Success", "payment succesfull.", "success");
        fetch();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        MySwal.fire("Cancelled", "Your transaction failed", "error");
      }
    });
  };

 if(allFile.length === 0)
  return (
    <section className=" w-full text-gray-600 flex justify-center">
      <div className=" px-5 py-24 w-5/6  flex  flex-col">
        {allFile.map((file, i) => {
          if (file.status === true)
            return (
              <div
                key={i}
                className="flex-shrink-0   mb-4 flex flex-wrap items-center justify-between pr-4 border-gray-950 w-full lg:w-full h-80 lg:h-40 m-2  bg-gray-100 rounded-xl shadow-2xl"
              >
                <div className="flex cursor-pointer mr-20 flex-col w-1/4 md:w-auto ">
                  {file.type !== "video/mp4" &&
                    file.type !== "application/pdf" && (
                      <img
                        onClick={() => handleOpen(file.path)}
                        className="rounded-xl h-40 w-full lg:w-40"
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
                </div>
                <div className="w-2/3 flex justify-around">
                  <div className="md:text-lg text-center w-1/4 text-sm font-medium title-font text-gray-900">
                    {file.filename.substring(0, 6) +
                      file.filename.substring(
                        file.filename.length - 5,
                        file.filename.length
                      )}
                    <div className="text-gray-400 text-center">
                      {(file.size / (1000 * 1000)).toFixed(2)} MB
                    </div>
                  </div> 
                  <button 
                    onClick={() => handleOpen(file.path)}
                    className="hover:text-blue-600 ml-4 flex items-start flex-col leading-none"
                    onMouseEnter={() => setHover(i)}
                    onMouseLeave={() => setHover(null)}
                  >
                    <OpenInNewIcon />
                    {hover === i && (
                      <span className=" text-sm absolute bottom-16 left-4 px-2 py-1 rounded-lg text-black bg-gray-300">
                        open
                      </span>
                    )}
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
      {/* {items.map((item, i) => (
        <motion.div layoutId={i} onClick={() => setSelectedId(item.id)}>
          <motion.h5>{item.subtitle}</motion.h5>
          <motion.h2>{item.title}</motion.h2>
        </motion.div>
      ))}
      <AnimatePresence>
        {selectedId && (
          <motion.div layoutId={selectedId}>
            <motion.h5>{items[selectedId].subtitle}</motion.h5>
            <motion.h2>{items[selectedId].title}</motion.h2>
            <motion.button onClick={() => setSelectedId(null)} />
          </motion.div>
        )}
      </AnimatePresence> */}
    </section>
  )
  else 
    return (
    <section className="flex ml-8 justify-center flex-col  h-full items-center w-full mx-auto bg-gray-100 body-font ">
      <h1 className="text-2xl" >Let's create history...</h1>
      <button className="text-white bg-blue" >Share</button>
    </section>
  );
}

export default History;
