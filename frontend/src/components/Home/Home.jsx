import React from "react";
import EastIcon from "@mui/icons-material/East";
import { SignedOut, SignInButton, SignedIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex h-full flex-col gap-40 items-center content-between  w-full mt-20 ">
        <div className="w-full h-5/6 max-w-4xl">
          <div className="flex flex-col justify-center items-center gap-6 text-center">
            <h1 className=" dark:text-cyan-900 text-white text-4xl sm:text-4xl lg:text-5xl font-extrabold">
              The Power of Seamless Sharing
              <div className="text-cyan-900 text-2xl sm:text-3xl font-bold mt-2">
                One Platform, Infinite Sharing
              </div>
            </h1>
            <p className="text-blue-400 text-xl sm:text-2xl lg:text-3xl font-medium">
              All your files, ready when you are
            </p>
            <p className="text-lg sm:text-xl lg:text-2xl font-medium">
              Share with Ease, Anywhere! Effortless File Transfers Your Files,
              Just a Click Away Fast. Secure. Reliable. Simplify Your File
              Sharing, Send Large Files in Seconds, Share Smarter, Not Harder
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <button
                onClick={() => {
                  navigate("/learnMore");
                }}
                className="bg-white text-cyan-900 font-medium py-3 px-6  flex items-center btn-border rounded hover:bg-cyan-700 hover:text-white transition"
              >
                Learn More
              </button>
              <SignedOut>
                <SignInButton>
                  <button className="bg-cyan-700 text-white gap-2 font-medium py-3 px-6 flex items-center btn-border rounded hover:bg-white hover:text-cyan-800 transition">
                    <p>Quick Share</p>
                    <EastIcon />
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <button
                  onClick={() => navigate("/app/shareFile")}
                  className="bg-cyan-700 text-white gap-2 font-medium py-3 px-6 flex items-center btn-border rounded hover:bg-white hover:text-cyan-800 transition"
                >
                  <p>Quick Share</p>
                  <EastIcon />
                </button>
              </SignedIn>
            </div>
          </div>
        </div>
      <div className="w-full h-1/5 items-end">
        <footer className="bg-gray-800 w-full py-4 text-white text-center">
          <p>&copy; 2024 File Sharing Service. All rights reserved.</p>
        </footer>
      </div>
      </div>
    </>
  );
}

export default Home;
