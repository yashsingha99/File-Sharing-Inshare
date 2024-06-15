import { useEffect, useState } from "react";
import "./App.css";
import {Routes, Route, Outlet, useLocation, useNavigate} from 'react-router-dom'
import Home from "./components/Home/Home";
import Login from "./components/auth/Login"
import Signup from "./components/auth/SignUp"
import Navbar from "./components/Home/Navbar";
import About from "./components/Home/About";
import Dashoard from "./components/dashboard/Dashoard";
import Header from "./components/dashboard/Header";
import Premium from "./components/dashboard/Premium";
import PlanLimit from "./components/dashboard/PlanLimit";
import ShareFile from "./components/dashboard/ShareFile";
import LearnMore from "./components/Home/LearnMore";
import ContactUs from "./components/Home/ContactUs";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import CreatedFile from "./components/files/CreatedFile";
import History from "./components/dashboard/History";
import PortableWifiOffIcon from '@mui/icons-material/PortableWifiOff';
const MySwal = withReactContent(Swal);
function App() {
  const [offLine, setOffLine] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    const handleOffline = () => {
      setOffLine(true)
      MySwal.fire({
        title: 'Network Disconnected',
        text: 'It seems you have lost your network connection. Please check your internet connection.',
        icon: 'error',
        confirmButtonText: 'OK',
        
        customClass: {
          popup: 'bg-white rounded-lg shadow-lg p-4',
          title: 'text-lg font-semibold',
          content: 'text-sm',
          confirmButton: 'bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline',
        }
      });
      // navigate('/')
    };

    const handleOnline = () => {
      Swal.close();
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);
  
  const location = useLocation().pathname.split('/')[1]
  return (
    <div className=" App-scroll h-full w-full">

      {location !== 'app' ? location != 'CreatedFile' && <Navbar /> : location != 'CreatedFile' && <Header />}
       <Outlet />
       <Routes>
        <Route path="/"  element={ <Home/> }/>
        <Route path="/downloadFile/:fileSlug"  element={ <CreatedFile/> } />
        <Route path="/about"  element={ <About/> }/>
        <Route path="/login"  element={ <Login/> }/>
        <Route path="/register"  element={ <Signup/> }/>
        <Route path="/CreatedFile/:fileId"  element={ <CreatedFile/> }/>
        <Route path="/learnMore"  element={ <LearnMore/> }/>
        <Route path="/contactUs"  element={ <ContactUs/> }/>
        <Route path="/app"  element={ <Dashoard/> }>
        <Route path="/app/"  element={ <ShareFile/> } />
        <Route path="/app/pricing"  element={ <Premium/> }/>
        <Route path="/app/history"  element={ <History/> }/>
        <Route path="/app/planlimit"  element={ <PlanLimit/> }/>
        </Route>
       </Routes>
       {/* {offLine && <div className="w-full bg-red-500" >
        <PortableWifiOffIcon />
          no internet connection
        </div>} */}
    </div>
    
  );
}

export default App;
