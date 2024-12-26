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
import Navbar from "./components/Home/Navbar";
import About from "./components/Home/About";
import Dashboard from "./components/dashboard/Dashoard"; // Fixed typo from 'Dashoard' to 'Dashboard'
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
  const [offLine, setOffLine] = useState(false);
  const [themeMode, setThemeMode] = useState("light");
  const user = useUser();
  const navigate = useNavigate();

  const lightTheme = () => setThemeMode("light");
  const darkTheme = () => setThemeMode("dark");

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
          confirmButton: "bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",
        },
      });
    };

    const handleOnline = () => Swal.close();

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
    <div className="App-scroll h-full w-full">
      <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
        <div className="fixed top-0 w-full z-10">
          {location !== "app" && location !== "CreatedFile" ? (
            <Navbar />
          ) : (
            <Header />
          )}
        </div>

        <main className="pt-20 px-4 lg:px-8 w-full">
          <Outlet />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/downloadFile/:fileSlug" element={<CreatedFile />} />
            <Route path="/about" element={<About />} />
            <Route path="/CreatedFile/:fileId" element={<CreatedFile />} />
            <Route path="/learnMore" element={<LearnMore />} />
            <Route path="/contactUs" element={<ContactUs />} />
            <Route path="/app" element={<Dashboard />}>
              <Route path="shareFile" element={<ShareFile />} />
              <Route path="pricing" element={<Premium />} />
              <Route path="history" element={<History />} />
              <Route path="planlimit" element={<PlanLimit />} />
            </Route>
          </Routes>
        </main>
      </ThemeProvider>
    </div>
  );
}

export default App;
