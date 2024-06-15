import React, { useState } from "react";
import IosShareIcon from "@mui/icons-material/IosShare";
import HistoryIcon from "@mui/icons-material/History";
import PaymentIcon from "@mui/icons-material/Payment";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import DehazeIcon from "@mui/icons-material/Dehaze";
import ClearIcon from "@mui/icons-material/Clear";
import RestorePageIcon from '@mui/icons-material/RestorePage';
import "./Sider.css";
function Sider() {
  const navigate = useNavigate();
  const [isClosed, setIsClosed] = useState(false);

  if (!isClosed)
    return (
      <div className=" fixed sider bg-blue-50 mt-24 w-52">
        <span
          onClick={() => setIsClosed((p) => !p)}
          className="flex m-4 justify-end cursor-pointer"
        >
          {isClosed ? <DehazeIcon /> : <ClearIcon />}
        </span>
        <div className="h-full">
          <div className="flex w-9/10 h-full gap-5 flex-col items-center">
            <SiderButton
              icon={<IosShareIcon />}
              label="Send Data"
              onClick={() => navigate("/app")}
            />
            <SiderButton
              onClick={() => navigate("/app/history")}
              icon={<HistoryIcon />}
              label="History"
            />
            <SiderButton
              icon={<PaymentIcon />}
              label="Premium"
              onClick={() => navigate("/app/pricing")}
            />
            <SiderButton
              icon={<PaymentIcon />}
              label="Your Plan Limit"
              onClick={() => navigate("/app/planlimit")}
            />
            <SiderButton
              icon={<RestorePageIcon />}
              label="Convert File"
              onClick={() => navigate("/app/pricing")}
            />
            <SiderButton
              icon={<SettingsIcon />}
              label="Settings"
              onClick={() => navigate("/app/pricing")}
            />
            <SiderButton
              icon={<SettingsIcon />}
              label="Settings"
              onClick={() => navigate("/app/pricing")}
            />
          </div>
        </div>
      </div>
    );
  else 
    return (
      <div className="p-4 mt-24 fixed text flex sider h-full gap-5 ">
        <div className="text-cyan-900 py-8 gap-12 h-full" >
          <div className=" cursor-pointer py-4">
            <IosShareIcon />
          </div>
          <div className="py-4">
            <IosShareIcon />
          </div>
          <div className="py-4">
            <IosShareIcon />
          </div>
          <div className="py-4">
            <IosShareIcon />
          </div >
          <div className="py-4">
            <IosShareIcon />
          </div>
        </div>
        <div
          onClick={() => setIsClosed((p) => !p)}
          className="flex justify-end cursor-pointer"
        >
          {isClosed ? <DehazeIcon /> : <ClearIcon />}
        </div>
      </div>
    );
}

const SiderButton = ({ icon, label, onClick }) => {
  return (
    <div
      className="flex text-sm items-center gap-2 font-medium text-cyan-800 bg-blue-300 h-10 hover:bg-cyan-700 hover:text-white rounded-lg py-2 px-4 w-5/6 mt-4"

      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
};

export default Sider;
