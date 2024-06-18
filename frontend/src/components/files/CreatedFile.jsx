import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import "./file.css";
import file from "../../images/file.png"
import { fetchFile } from "../../api/api";
function CreatedFile() {
  const user = useUser();
  const navigate = useNavigate();
  const location = useLocation().pathname.split("/");
  const [fileData, serFileData] = useState();
  const fileId = location[location.length - 1];
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      const file = await fetchFile(fileId);
      serFileData(file);
    };
    fileId && fetch();
  }, []);

  const checkPassword = () => {
    if (fileData.data.respond.password === password) setChecked(true);
    else alert("password mismatched");
    setPassword("");
    window.location.replace(fileData.data.respond.path);
  };

  // if (fileData)
  return (
    <>
      {/* <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={ckeckPassword}>button</button>
        {checked && (
          <div className="w-full h-full">
            <div className="flex items-center w-full">
              <img
                src={fileData.data.respond.path}
                className="h-1/6 w-1/3"
                alt="logo"
              />
            </div>
            <div className="">
              <div className="bg-blue-100"></div>
            </div>
          </div>
        )} */}
      {/* nmnm */}
      <div className="  w-full bg-blue-100 h-screen flex items-center justify-center">
        <div className="w-1/3 file h-3/4 shadow-xl mt-8 rounded flex flex-col justify-evenly  bg-blue-300">
          <div className="w-full flex justify-center" >
            <img className="  h-4/5 w-1/2" src={file} alt="" />
          </div>
          <div className="w-full h-1/6 flex-col flex gap-8 items-center justify-center">
            <input 
            type="text" 
            className="shadow-inset bg-blue-100 outline-none rounded py-2 px-2 w-1/2" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={checkPassword}  className="w-1/4 bg-green-600 hover:bg-green-800  text-white py-2 px-4 rounded outline-none active:bg-green-500 ">
              {" "}
              submit{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default CreatedFile;
