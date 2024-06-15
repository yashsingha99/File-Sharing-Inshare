import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { fetchFile } from "../../api/api";
function CreatedFile() {
  const user = useUser();
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
   
   

  const ckeckPassword = () => {
    if (fileData.data.respond.password === password) setChecked(true);
    else alert("password mismatched");
    setPassword("")
  };

  if (fileData)
    return (
      <>
        <input
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
        )}
      </>
    );
}
export default CreatedFile;
