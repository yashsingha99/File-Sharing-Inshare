import React, { useState } from "react";
import IosShareIcon from "@mui/icons-material/IosShare";
import HistoryIcon from "@mui/icons-material/History";
import PaymentIcon from "@mui/icons-material/Payment";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import DehazeIcon from "@mui/icons-material/Dehaze";
import ClearIcon from "@mui/icons-material/Clear";
import RestorePageIcon from "@mui/icons-material/RestorePage";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import "./Sider.css";
function Sider() {
  const navigate = useNavigate();
  const [isClosed, setIsClosed] = useState(true);
  const sideItem = [
    {
      label: "Send Data",
      icon: <IosShareIcon />,
      onClick: () => navigate("/app"),
    },
    {
      onClick: () => navigate("/app/history"),
      icon: <HistoryIcon />,
      label: "History",
    },
    {
      icon: <PaymentIcon />,
      label: "Premium",
      onClick: () => navigate("/app/pricing"),
    },
    {
      icon: <DataUsageIcon />,
      label: "Your Plan Limit",
      onClick: () => navigate("/app/planlimit"),
    },
    {
      icon: <RestorePageIcon />,
      label: "Convert File",
      onClick: () => navigate("/app/pricing"),
    },
    {
      icon: <SettingsIcon />,
      label: "Settings",
      onClick: () => navigate("/app/pricing"),
    },
  ];

  if (!isClosed)
    return (
      <div className=" fixed bg-blue-50  sider mt-24 md:mt-20 w-52">
        <span
          onClick={() => setIsClosed((p) => !p)}
          className="flex p-2  justify-end cursor-pointer"
        >
          {!isClosed && <ClearIcon />}
        </span>
        <div className="h-full">
          <div className="flex w-9/10 h-full gap-5 flex-col items-center">
            {sideItem.map((side) => (
              <LGSiderButton
                icon={side.icon}
                label={side.label}
                onClick={side.onClick}
              />
            ))}
          </div>
        </div>
      </div>
    );
  else
    return (
      <div className="md:mt-20 mt-24 fixed px-4 py-3 transition  sider h-full gap-5 ">
        <span
          onClick={() => setIsClosed((p) => !p)}
          className="flex justify-center cursor-pointer"
        >
          {isClosed && <DehazeIcon />}
        </span>
        <div className="text-cyan-900 flex flex-col justify-start py-4 gap-12 h-full">
          {sideItem.map((side, i) => (
           <span
           key={i}
           className="relative cursor-pointer py-4"
          //  onMouseEnter={() => setIsClosed(false)}
          //  onMouseLeave={() => setIsClosed(true)}
           onClick={side.onClick}
         >
           {side.icon}
           {/* {hoveredBox === i && (
             <div className="absolute px-4 top-full left-12 mt-2 left-1/2 transform -translate-x-1/2 p-2 bg-white text-black border rounded shadow-lg">
               {side.label}
             </div>
           )} */}
         </span>
          ))}
        </div>
      </div>
    );
}

const LGSiderButton = ({ icon, label, onClick }) => {
  return (
    <div
      className="flex cursor-pointer text-sm items-center gap-2 font-medium text-cyan-800 bg-blue-300 h-10 hover:bg-cyan-700 hover:text-white rounded-lg py-2 px-4 w-5/6 mt-4"
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
};

export default Sider;
