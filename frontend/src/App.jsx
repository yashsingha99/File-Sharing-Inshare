import { useEffect, useState } from "react";
import "./App.css";
import {
  Routes,
  Route,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/SignUp";
import Navbar from "./components/Home/Navbar";
import About from "./components/Home/About";
import Dashoard from "./components/dashboard/Dashoard";
import Header from "./components/dashboard/Header";
import Premium from "./components/dashboard/Premium";
import PlanLimit from "./components/dashboard/PlanLimit";
import ShareFile from "./components/dashboard/ShareFile";
import LearnMore from "./components/Home/LearnMore";
import ContactUs from "./components/Home/ContactUs";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import CreatedFile from "./components/files/CreatedFile";
import History from "./components/dashboard/History";
import PortableWifiOffIcon from "@mui/icons-material/PortableWifiOff";
import { ThemeProvider } from "./contexts/theme";
import ThemeBtn from "./Theme/ThemeBtn";
import Card from "./Theme/Card";
import { useUser } from "@clerk/clerk-react";
const MySwal = withReactContent(Swal);
function App() {
  // useEffect(() => {
  //   const handleContextMenu = (event) => {
  //     event.preventDefault();
  //   };

  //   const handleKeyDown = (event) => {
  //     if (
  //       event.keyCode === 123 || // F12
  //       (event.ctrlKey && event.shiftKey && event.keyCode === 73)
  //     ) {
  //       // Ctrl+Shift+I
  //       event.preventDefault();
  //       return false;
  //     }
  //   };

  //   const checkDevToolsOpen = () => {
  //     const threshold = 160;
  //     const widthThreshold = window.outerWidth - window.innerWidth > threshold;
  //     const heightThreshold =
  //       window.outerHeight - window.innerHeight > threshold;
  //     if (widthThreshold || heightThreshold) {
  //       alert("Developer tools are open. Please close them.");
  //     }
  //   };

  //   document.addEventListener("contextmenu", handleContextMenu);
  //   document.addEventListener("keydown", handleKeyDown);
  //   const interval = setInterval(checkDevToolsOpen, 1000);

  //   return () => {
  //     document.removeEventListener("contextmenu", handleContextMenu);
  //     document.removeEventListener("keydown", handleKeyDown);
  //     clearInterval(interval);
  //   };
  // }, []);

  const [offLine, setOffLine] = useState(false);
  const [themeMode, setThemeMode] = useState("light");
  const user = useUser();
  const lightTheme = () => {
    setThemeMode("light");
  };

  const darkTheme = () => {
    setThemeMode("dark");
  };

  const navigate = useNavigate();
  useEffect(() => {
    const handleOffline = () => {
      setOffLine(true);
      MySwal.fire({
        title: "Network Disconnected",
        text: "It seems you have lost your network connection. Please check your internet connection.",
        icon: "error",
        confirmButtonText: "OK",

        customClass: {
          popup: "bg-white rounded-lg shadow-lg p-4",
          title: "text-lg font-semibold",
          content: "text-sm",
          confirmButton:
            "bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",
        },
      });
      // navigate('/')
    };

    const handleOnline = () => {
      Swal.close();
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);

  const location = useLocation().pathname.split("/")[1];
  return (
    <>
      <div className=" App-scroll h-full w-full">
        <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
          {/* <ThemeBtn /> */}
        </ThemeProvider>

        {location !== "app"
          ? location != "CreatedFile" && <Navbar />
          : location != "CreatedFile" && <Header />}
        <Outlet />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/downloadFile/:fileSlug" element={<CreatedFile />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/CreatedFile/:fileId" element={<CreatedFile />} />
          <Route path="/learnMore" element={<LearnMore />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/app" element={<Dashoard />}>
            <Route path="/app/" element={<ShareFile />} />
            <Route path="/app/pricing" element={<Premium />} />
            <Route path="/app/history" element={<History />} />
            <Route path="/app/planlimit" element={<PlanLimit />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}
export default App;
