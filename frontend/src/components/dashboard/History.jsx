import React, { useEffect, useState } from "react";
import { updateStatus, userFiles } from "../../api/api";
import { useUser } from "@clerk/clerk-react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import "./history.css"
function History() {
  const { user } = useUser();
  const [allFile, setAllFile] = useState([]);
  
  useEffect(() => {
    const fetch = async () => {
      const res = await userFiles(user);
      setAllFile(res.data.data);
    };
    user && fetch();
  }, [user]);

  const handleDelete = async (fileId) => {
      const res = await updateStatus(fileId);
      console.log(res);
  }

  return (
    <>
      <div className="w-full scroll-smooth mt-28  history-scroll gap-20 flex flex-col items-center justify-center h-full">
        {allFile.map((file, i) =>{
          if(file.status !== false )
         return (
          <div key={i} className=" flex history border justify-between items-center rounded w-3/4 ">
            <div >
              <img src={file.path} className="w-40 " alt="file" />
            </div>
            <div className="w-1/3">
              {file.filename}
            </div>
            <div className="w-1/3">
               {(file.size /1000000).toFixed(2)} MB
            </div>
            <div onClick={() => handleDelete(file._id)} className=" pr-4 cursor-pointer hover:text-red-600" >
              <DeleteForeverIcon />
            </div>
          </div>
        )})}
      </div>
    </>
  );
}

export default History;
