import React, { useEffect, useState } from "react";
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
import { logEvent } from "firebase/analytics";
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
  const [pageSize, setPageSize] = useState({
    width: window.innerWidth,
    hight: window.innerHeight,
  });
  console.log(pageSize.width);
  useEffect(() => {
    const handleResize = () => {
      setPageSize({
        width: window.innerWidth,
        hight: window.innerHeight,
      });
      if (window.innerWidth < 560) setIsClosed(true);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!isClosed)
    return (
      <section className=" justify-start text-gray-600 w-40">
        <div className=" py-24  flex  flex-col">
          <div className="fixed bg-blue-50  sider  w-52"> 
            <span
              onClick={() => setIsClosed((p) => !p)}
              className="flex justify-end cursor-pointer"
            >
              {!isClosed && <ClearIcon />}
            </span>
            <div className="h-full">
              <div className="flex w-9/10  h-full  flex-col items-center">
                {sideItem.map((side, i) => (
                  <div
                    key={i}
                    className="flex cursor-pointer mb-12 text-sm items-center gap-2 font-medium text-cyan-800 bg-blue-300 h-10 hover:bg-cyan-700 hover:text-white rounded-lg py-2 px-4 w-5/6 mt-4"
                    onClick={side.onClick}
                  >
                    {side.icon}
                    <span>{side.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  else
    return (
      <section className=" text-gray-600 ">
        <div className=" py-24  flex  flex-col">
          <div className=" fixed bg-blue-50 px-4 transition  sider gap-5 ">
            <div className="flex justify-center ">
              <span className="cursor-pointer" >
                {isClosed && <DehazeIcon onClick={() => setIsClosed((p) => !p)} />}
              </span>
            </div>
            <div className="text-cyan-900 flex flex-col justify-start py-4 gap-12 h-full">
              {sideItem.map((side, i) => (
                <span
                  key={i}
                  className="relative cursor-pointer py-4"
                  onClick={side.onClick}
                >
                  {side.icon}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
}

export default Sider;
