import {
  SignInButton,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const user = useUser();
  const navigate = useNavigate();

  return (
    <header className="w-full fixed header bg-blue-100 text-gray-600 body-font">
      <div className="mx-auto flex flex-wrap p-5 justify-between items-center">
        <div
          onClick={() => navigate('/')}
          className="flex cursor-pointer title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
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
          <span className="ml-3 text-xl">InShare</span>
        </div>
        <div className="flex items-center border-0 rounded text-base">
          <UserButton />
        </div>
      </div>
    </header>
  );
}

export default Header;
