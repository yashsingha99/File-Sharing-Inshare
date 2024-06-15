import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.jpg";
import DehazeIcon from "@mui/icons-material/Dehaze";
import ClearIcon from "@mui/icons-material/Clear";

import {
  SignedIn,
  useUser,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { createUser } from "../../api/api";
import NaveItems from "./NaveItems";
function Navbar() {
  const [isClosed, setIsClosed] = useState(true);

  const [pageSize, setPageSize] = useState({
    width: window.innerWidth,
    hight: window.innerHeight,
  });
  console.log(pageSize);
  const navItems = [
    {
      path: "/",
      name: "Home",
      active: true,
    },
    {
      path: "/learnMore",
      name: "Learn more",
      active: true,
    },
    {
      path: "/about",
      name: "About us",
      active: true,
    },
    {
      path: "/contactUs",
      name: "Contact us",
      active: true,
    },
  ];
  
  useEffect(() => {
    const handleResize = () => {
      setPageSize({
        width: window.innerWidth,
        hight: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { user } = useUser();
  useEffect(() => {
    const userRegister = async () => {
      const res = await createUser(user);
    };
    user && userRegister();
  }, [user]);

  return (
    <header className=" w-full header bg-blue-100 text-gray-600 body-font">
      <div className=" w-full  mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <div
          className={`flex relative w-full justify-between title-font font-medium items-center text-gray-900 mb-4 md:mb-0`}
        >
          <div className="flex cursor-pointer title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl ">InShare</span>
          </div>
          {pageSize.width >= 600 && (
            <nav className="md:mr-auto gap:20 md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
              {navItems.map((nav, i) => (
                <div
                  key={i}
                  className="cursor-pointer text-cyan-600 text-sm hover:text-sky-800 hover:font-medium ml-6"
                >
                  <Link to={nav.path}>{nav.name}</Link>
                </div>
              ))}
            </nav>
          )}
          <div className=" h-full flex justify-end">
            <SignedOut>
              <SignInButton>
                <button className="bg-cyan-700 py-2 px-6 text-white rounded hover:bg-cyan-600">
                  Let's Share
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton className="w-1/3" />
            </SignedIn>
          </div>

          {pageSize.width < 600 && (
            <>
              <div className="cursor-pointer" onClick={() => setIsClosed((p) => !p)}>
                {isClosed ? <DehazeIcon /> : <ClearIcon />}
              </div>
              {
                !isClosed && 
                  <div className="index rounded  justify-center btn-border absolute top-12 flex right-0 flex-col">
                  <NaveItems />
                </div>
                
                
              }
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
