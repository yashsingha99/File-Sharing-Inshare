import React, { useState } from "react";
import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";
import SearchIcon from "@mui/icons-material/Search";
import AutofpsSelectIcon from '@mui/icons-material/AutofpsSelect';
import TuneIcon from "@mui/icons-material/Tune";
import { pricing } from "../files/pricing";
import { updatePlan } from "../../api/api";
import { useUser } from "@clerk/clerk-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

function Premium() {
  const [isMonthly, setIsMonthly] = useState(true);
  const { user } = useUser();

  const handleBuy = (idx) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "Do you really want to buy this plan?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Proceed",
      cancelButtonText: "Cancle",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = { plan: pricing[idx], user };
        const res = await updatePlan(data);
        MySwal.fire("Success", "payment succesfull.", "success");
        fetch();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        MySwal.fire("Cancelled", "Your transaction cancled", "error");
      }
    });
  };

  const prev = [
    {
      rupee: "155",
      data: "2GB",
      data: "03-may-2024",
      days: "24",
    },
    {
      rupee: "155",
      data: "2GB",
      data: "03-may-2024",
      days: "24",
    },
  ];

  // const allPacksTitle = [
  //   {
  //     "Recommended Packes"
  //   }
  // ]
  return (
    // <section className="flex mt-32 ml-32 md:mt-12 md:ml-28 flex flex-col justify-center h-full items-center w-5/6 text-gray-600 body-font ">
    //   <div className="md:w-full flex flex-col items-center px-5">
    //     <div className="flex flex-col text-center md:w-1/2 mb-20">
    //       <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
    //         Pricing
    //       </h1>
    //       <div className="flex w-full  mx-auto border-2 border-indigo-500 rounded overflow-hidden">
    //         <button
    //           onClick={() => setIsMonthly((p) => true)}
    //           className={`py-1 px-4 focus:outline-none ${
    //             isMonthly && " bg-indigo-500 text-white "
    //           }`}
    //         >
    //           Monthly
    //         </button>
    //         <button
    //           onClick={() => setIsMonthly((p) => false)}
    //           className={`py-1 px-4 focus:outline-none ${
    //             !isMonthly && " bg-indigo-500 text-white "
    //           } `}
    //         >
    //           Annually
    //         </button>
    //       </div>
    //     </div>
    //     {isMonthly && (
    //       <div className="flex flex-wrap  w-full justify-center">
    //         <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
    //           <div className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
    //             <h2 className="text-sm tracking-widest title-font mb-1 font-medium">
    //               START
    //             </h2>
    //             <h1 className="text-2xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">
    //               Free
    //             </h1>
    //             <p className="flex items-center text-gray-600 mb-2">
    //               <span className="w-4 h-4 mr-2 inline-flex items-center justify-center  text-indigo-500 rounded-full flex-shrink-0">
    //                 <CheckCircleSharpIcon />
    //               </span>{" "}
    //               5 GB storage, basic features
    //             </p>
    //             <p className="flex items-center text-gray-600 mb-2">
    //               <span className="w-4 h-4 mr-2 inline-flex items-center justify-center  text-indigo-500 rounded-full flex-shrink-0">
    //                 <CheckCircleSharpIcon />
    //               </span>{" "}
    //               Free - Limited to 10 files, 5 GB max
    //             </p>
    //             <p className="flex items-center text-gray-600 mb-6">
    //               <span className="w-4 h-4 mr-2 inline-flex items-center justify-center  text-indigo-500 rounded-full flex-shrink-0">
    //                 <CheckCircleSharpIcon />
    //               </span>{" "}
    //               Free - 5 GB, essential tools
    //             </p>
    //             <button
    //               onClick={() => handleBuy(0)}
    //               className="flex items-center mt-auto text-white bg-gray-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded"
    //             >
    //               Buy
    //               <svg
    //                 fill="none"
    //                 stroke="currentColor"
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 strokeWidth="2"
    //                 className="w-4 h-4 ml-auto"
    //                 viewBox="0 0 24 24"
    //               >
    //                 <path d="M5 12h14M12 5l7 7-7 7"></path>
    //               </svg>
    //             </button>
    //           </div>
    //         </div>
    //         <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
    //           <div className="h-full p-6 rounded-lg border-2 border-indigo-500 flex flex-col relative overflow-hidden">
    //             <span className="bg-indigo-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">
    //               POPULAR
    //             </span>
    //             <h2 className="text-sm tracking-widest title-font mb-1 font-medium">
    //               PRO
    //             </h2>
    //             <h1 className="text-2xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
    //               <span>50₹</span>
    //               <span className="text-lg ml-1 font-normal text-gray-500">
    //                 /mo
    //               </span>
    //             </h1>
    //             <p className="flex items-center text-gray-600 mb-2">
    //               <span className="w-4 h-4 mr-2 inline-flex items-center justify-center  text-indigo-500 rounded-full flex-shrink-0">
    //                 <CheckCircleSharpIcon />
    //               </span>{" "}
    //               10 GB storage
    //             </p>
    //             <p className="flex items-center text-gray-600 mb-2">
    //               <span className="w-4 h-4 mr-2 inline-flex items-center justify-center  text-indigo-500 rounded-full flex-shrink-0">
    //                 <CheckCircleSharpIcon />
    //               </span>{" "}
    //               up to 50 files
    //             </p>
    //             <p className="flex items-center text-gray-600 mb-2">
    //               <span className="w-4 h-4 mr-2 inline-flex items-center justify-center  text-indigo-500 rounded-full flex-shrink-0">
    //                 <CheckCircleSharpIcon />
    //               </span>{" "}
    //               50 GB, advanced features
    //             </p>
    //             <p className="flex items-center text-gray-600 mb-6">
    //               <span className="w-4 h-4 mr-2 inline-flex items-center justify-center  text-indigo-500 rounded-full flex-shrink-0">
    //                 <CheckCircleSharpIcon />
    //               </span>{" "}
    //               Multiple files sharing
    //             </p>
    //             <button
    //               onClick={() => Enroll(1)}
    //               className="flex items-center mt-auto text-white bg-indigo-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-indigo-600 rounded"
    //             >
    //               Button
    //               <svg
    //                 fill="none"
    //                 stroke="currentColor"
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 strokeWidth="2"
    //                 className="w-4 h-4 ml-auto"
    //                 viewBox="0 0 24 24"
    //               >
    //                 <path d="M5 12h14M12 5l7 7-7 7"></path>
    //               </svg>
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     )}
    //     {!isMonthly && (
    //       <div className="flex flex-wrap items-center w-full justify-center">
    //         <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
    //           <div className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
    //             <h2 className="text-sm tracking-widest title-font mb-1 font-medium">
    //               Business Plan
    //             </h2>
    //             <h1 className="text-2xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
    //               <span>599₹</span>
    //               <span className="text-lg ml-1 font-normal text-gray-500">
    //                 /yr
    //               </span>
    //             </h1>
    //             <p className="flex items-center text-gray-600 mb-2">
    //               <span className="w-4 h-4 mr-2 inline-flex items-center justify-center text-indigo-500 rounded-full flex-shrink-0">
    //                 <CheckCircleSharpIcon />
    //               </span>{" "}
    //               50 GB storage
    //             </p>
    //             <p className="flex items-center text-gray-600 mb-2">
    //               <span className="w-4 h-4 mr-2 inline-flex items-center justify-center text-indigo-500 rounded-full flex-shrink-0">
    //                 <CheckCircleSharpIcon />
    //               </span>{" "}
    //               Free - up to 500 files
    //             </p>
    //             <p className="flex items-center text-gray-600 mb-6">
    //               <span className="w-4 h-4 mr-2 inline-flex items-center justify-center text-indigo-500 rounded-full flex-shrink-0">
    //                 <CheckCircleSharpIcon />
    //               </span>{" "}
    //               50 GB, advanced
    //             </p>
    //             <button
    //               onClick={() => Enroll(2)}
    //               className="flex items-center mt-auto text-white bg-gray-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded"
    //             >
    //               Button
    //               <svg
    //                 fill="none"
    //                 stroke="currentColor"
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 strokeWidth="2"
    //                 className="w-4 h-4 ml-auto"
    //                 viewBox="0 0 24 24"
    //               >
    //                 <path d="M5 12h14M12 5l7 7-7 7"></path>
    //               </svg>
    //             </button>
    //           </div>
    //         </div>
    //         <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
    //           <div className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
    //             <h2 className="text-sm tracking-widest title-font mb-1 font-medium">
    //               Enterprise Plan
    //             </h2>
    //             <h1 className="text-2xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
    //               <span>999₹</span>
    //               <span className="text-lg ml-1 font-normal text-gray-500">
    //                 /yr
    //               </span>
    //             </h1>
    //             <p className="flex items-center text-gray-600 mb-2">
    //               <span className="w-4 h-4 mr-2 inline-flex items-center justify-center text-indigo-500 rounded-full flex-shrink-0">
    //                 <CheckCircleSharpIcon />
    //               </span>{" "}
    //               unlimited storage
    //             </p>
    //             <p className="flex items-center text-gray-600 mb-2">
    //               <span className="w-4 h-4 mr-2 inline-flex items-center justify-center text-indigo-500 rounded-full flex-shrink-0">
    //                 <CheckCircleSharpIcon />
    //               </span>
    //               advanced security
    //             </p>
    //             <p className="flex items-center text-gray-600 mb-6">
    //               <span className="w-4 h-4 mr-2 inline-flex items-center justify-center text-indigo-500 rounded-full flex-shrink-0">
    //                 <CheckCircleSharpIcon />
    //               </span>{" "}
    //               tailored solutions
    //             </p>
    //             <button
    //               onClick={() => Enroll(3)}
    //               className="flex items-center mt-auto text-white bg-gray-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded"
    //             >
    //               Button
    //               <svg
    //                 fill="none"
    //                 stroke="currentColor"
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 strokeWidth="2"
    //                 className="w-4 h-4 ml-auto"
    //                 viewBox="0 0 24 24"
    //               >
    //                 <path d="M5 12h14M12 5l7 7-7 7"></path>
    //               </svg>
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </section>
    <>
      <section className="flex ml-8  gap-4 flex flex-col  h-full items-center w-full mx-auto bg-gray-100 body-font ">
        <div className=" w-5/6 mt-28">
          <div className="flex justify-between mb-4">
            <h2 className="font-medium md:text-xl text-lg">
              Previous Recharges
            </h2>
            <div className=" cursor-pointer text-cyan-500 font-medium">
              View All
            </div>
          </div>
          <div className="w-full">
            {prev.map((prevPlan) => (
              <div className="flex bg-white mb-4 p-4 rounded-xl  border justify-between w-full">
                <div className="">
                  <h2 className="font-medium">
                    ₹{prevPlan.rupee} - {prevPlan.data} - {prevPlan.days} day
                  </h2>
                  <h4 className="text-gray-400 text-xs md:text-sm ">
                    ₹{prevPlan.rupee} - {prevPlan.data}
                  </h4>
                </div>
                <button className="px-4 py-1 rounded-full text-white bg-cyan-500">
                  Repeat
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full h-full flex justify-center  bg-white p-4">
          <div className="w-4/5" >
            <div
              style={{ border: "1px solid rgb(6 182 212)" }}
              className=" w-full bg-white flex  justify-end items-center rounded-xl"
            >
              <SearchIcon className="ml-4" />
              <input
                type="text"
                placeholder="Search a Plan, e.g. 245 or 20 files"
                className=" md:text-xl text-sm  p-4 outline-none rounded-3xl w-full"
              />
              {/* <div className="text-2xl text-cyan-500">
                <AutofpsSelectIcon  />
              </div> */}
            </div>
            <div className="text-cyan-500 text-2xl">
              <TuneIcon className="" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Premium;
