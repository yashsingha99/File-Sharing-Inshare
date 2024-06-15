import React, { useState } from "react";
import { motion } from "framer-motion";
import IosShareIcon from "@mui/icons-material/IosShare";
import HistoryIcon from "@mui/icons-material/History";
import PaymentIcon from "@mui/icons-material/Payment";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import { Resizable } from "react-resizable";
import DehazeIcon from "@mui/icons-material/Dehaze";
import ClearIcon from '@mui/icons-material/Clear';
import "./Sider.css";
function Sider() {
  const navigate = useNavigate();
  const [width, setWidth] = useState(250);
  const [height, setHeight] = useState(600);
  const [isClosed, setIsClosed] = useState(false);

  const onResize = (event, { size }) => {
    setWidth(size.width);
    setHeight(size.width);
  };

  return (
    <div className=" sider bg-blue-50 mt-20 w-1/5 h-full">
      <span onClick={() =>setIsClosed((p) => !p)} className="flex m-4 justify-end cursor-pointer">
      {isClosed ? <DehazeIcon /> : <ClearIcon /> }
      </span>
      <div className="h-full">
        <div className="flex h-full gap-5 flex-col items-center">
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
            icon={<SettingsIcon />}
            label="Settings"
            onClick={() => navigate("/app/pricing")}
          />
        </div>
      </div>
    </div>
  );
}

const SiderButton = ({ icon, label, onClick }) => {
  return (
    <div
      className="flex items-center gap-2 font-medium text-cyan-800 bg-blue-300 h-10 hover:bg-cyan-700 hover:text-white rounded-lg py-2 px-4 w-5/6 mt-4"
      whileHover={{ scale: 1.0 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
};

export default Sider;
