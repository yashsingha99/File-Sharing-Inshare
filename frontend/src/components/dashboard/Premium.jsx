import React, { useState } from "react";
import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";
import { pricing } from "../files/pricing";
import { updatePlan } from "../../api/api";
import { useUser } from "@clerk/clerk-react";

function Premium() {
  const [isMonthly, setIsMonthly] = useState(true);
  const { user } = useUser()
  const Enroll = async (idx) => {
    const data = { plan : pricing[idx], user};
    const res = await updatePlan(data);
  };

  return (
    <section className="flex mt-32 ml-32 md:mt-12 md:ml-28 flex flex-col justify-center h-full items-center w-5/6 text-gray-600 body-font ">
      <div className="md:w-full flex flex-col items-center px-5">
        <div className="flex flex-col text-center md:w-1/2 mb-20">
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
            Pricing
          </h1>
          <div className="flex w-full  mx-auto border-2 border-indigo-500 rounded overflow-hidden">
            <button
              onClick={() => setIsMonthly((p) => true)}
              className={`py-1 px-4 focus:outline-none ${
                isMonthly && " bg-indigo-500 text-white "
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsMonthly((p) => false)}
              className={`py-1 px-4 focus:outline-none ${
                !isMonthly && " bg-indigo-500 text-white "
              } `}
            >
              Annually
            </button>
          </div>
        </div>
        {isMonthly && (
          <div className="flex flex-wrap  w-full justify-center">
            <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
              <div className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
                <h2 className="text-sm tracking-widest title-font mb-1 font-medium">
                  START
                </h2>
                <h1 className="text-2xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">
                  Free
                </h1>
                <p className="flex items-center text-gray-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center  text-indigo-500 rounded-full flex-shrink-0">
                    <CheckCircleSharpIcon />
                  </span>{" "}
                  5 GB storage, basic features
                </p>
                <p className="flex items-center text-gray-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center  text-indigo-500 rounded-full flex-shrink-0">
                    <CheckCircleSharpIcon />
                  </span>{" "}
                  Free - Limited to 10 files, 5 GB max
                </p>
                <p className="flex items-center text-gray-600 mb-6">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center  text-indigo-500 rounded-full flex-shrink-0">
                    <CheckCircleSharpIcon />
                  </span>{" "}
                  Free - 5 GB, essential tools
                </p>
                <button
                  onClick={() => {
                    Enroll(0);
                  }}
                  className="flex items-center mt-auto text-white bg-gray-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded"
                >
                  Button
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-auto"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
              <div className="h-full p-6 rounded-lg border-2 border-indigo-500 flex flex-col relative overflow-hidden">
                <span className="bg-indigo-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">
                  POPULAR
                </span>
                <h2 className="text-sm tracking-widest title-font mb-1 font-medium">
                  PRO
                </h2>
                <h1 className="text-2xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
                  <span>50₹</span>
                  <span className="text-lg ml-1 font-normal text-gray-500">
                    /mo
                  </span>
                </h1>
                <p className="flex items-center text-gray-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center  text-indigo-500 rounded-full flex-shrink-0">
                    <CheckCircleSharpIcon />
                  </span>{" "}
                  10 GB storage
                </p>
                <p className="flex items-center text-gray-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center  text-indigo-500 rounded-full flex-shrink-0">
                    <CheckCircleSharpIcon />
                  </span>{" "}
                  up to 50 files
                </p>
                <p className="flex items-center text-gray-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center  text-indigo-500 rounded-full flex-shrink-0">
                    <CheckCircleSharpIcon />
                  </span>{" "}
                  50 GB, advanced features
                </p>
                <p className="flex items-center text-gray-600 mb-6">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center  text-indigo-500 rounded-full flex-shrink-0">
                    <CheckCircleSharpIcon />
                  </span>{" "}
                  Multiple files sharing
                </p>
                <button
                  onClick={() => Enroll(1)}
                  className="flex items-center mt-auto text-white bg-indigo-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-indigo-600 rounded"
                >
                  Button
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-auto"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
        {!isMonthly && (
          <div className="flex flex-wrap items-center w-full justify-center">
            <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
              <div className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
                <h2 className="text-sm tracking-widest title-font mb-1 font-medium">
                  Business Plan
                </h2>
                <h1 className="text-2xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
                  <span>599₹</span>
                  <span className="text-lg ml-1 font-normal text-gray-500">
                    /yr
                  </span>
                </h1>
                <p className="flex items-center text-gray-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center text-indigo-500 rounded-full flex-shrink-0">
                    <CheckCircleSharpIcon />
                  </span>{" "}
                  50 GB storage
                </p>
                <p className="flex items-center text-gray-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center text-indigo-500 rounded-full flex-shrink-0">
                    <CheckCircleSharpIcon />
                  </span>{" "}
                  Free - up to 500 files
                </p>
                <p className="flex items-center text-gray-600 mb-6">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center text-indigo-500 rounded-full flex-shrink-0">
                    <CheckCircleSharpIcon />
                  </span>{" "}
                  50 GB, advanced 
                </p>
                <button
                  onClick={() => Enroll(2)}
                  className="flex items-center mt-auto text-white bg-gray-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded"
                >
                  Button
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-auto"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
              <div className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
                <h2 className="text-sm tracking-widest title-font mb-1 font-medium">
                  Enterprise Plan
                </h2>
                <h1 className="text-2xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
                  <span>999₹</span>
                  <span className="text-lg ml-1 font-normal text-gray-500">
                    /yr
                  </span>
                </h1>
                <p className="flex items-center text-gray-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center text-indigo-500 rounded-full flex-shrink-0">
                    <CheckCircleSharpIcon />
                  </span>{" "}
                  unlimited storage
                </p>
                <p className="flex items-center text-gray-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center text-indigo-500 rounded-full flex-shrink-0">
                    <CheckCircleSharpIcon />
                  </span>
                  advanced security
                </p>
                <p className="flex items-center text-gray-600 mb-6">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center text-indigo-500 rounded-full flex-shrink-0">
                    <CheckCircleSharpIcon />
                  </span>{" "}
                  tailored solutions
                </p>
                <button
                  onClick={() => Enroll(3)}
                  className="flex items-center mt-auto text-white bg-gray-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded"
                >
                  Button
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-auto"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Premium;
