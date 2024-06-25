import React, { useEffect, useState } from "react";
import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";
import SearchIcon from "@mui/icons-material/Search";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AutofpsSelectIcon from "@mui/icons-material/AutofpsSelect";
import TuneIcon from "@mui/icons-material/Tune";
import { pricing } from "../files/pricing";
import { addPlan } from "../../api/api";
import { useUser } from "@clerk/clerk-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
import {fetchAllPlans} from "../../api/planApi"
import {useLocation} from "react-router-dom"
import pay from "../../images/pay.jpeg"
import html2pdf from "html2pdf.js"
function Premium() {
  const [isMonthly, setIsMonthly] = useState(true);
  const [allPlan, setAllPlan] = useState();
  const location = useLocation()
  const { user } = useUser();
  console.log(user);
  useEffect(() => {
      const fetch = async() => {
          const res = await fetchAllPlans()
          setAllPlan(res.data.allPlans)
      }
      fetch()
  }, [])


  const handleBuy = (plan) => {
    MySwal.fire({
        title: "Are you sure?",
        text: "Do you really want to buy this plan?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Pay",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
    }).then(async (result) => {
        if (result.isConfirmed) {
            const data = { plan, user };
            const res = await addPlan(data);
            console.log(res);
            if (res.status == 200) {
                MySwal.fire("Success", "Payment successful.", "success");

                generateBill(data);

                fetch();
            } else {
                MySwal.fire("Error", "Payment failed. Please try again.", "error");
            }
        } else if (result.dismiss === MySwal.DismissReason.cancel) {
            MySwal.fire("Cancelled", "Your transaction was cancelled", "error");
        }
    });
};

const generateBill = (data) => {
    const { plan } = data;
    const billDetails = `
        <h3>Recharge Bill</h3>
        <p><strong>User:</strong> ${user.fullName}</p>
        <p><strong>Email:</strong> ${user.emailAddresses[0].emailAddress}</p>
        <p><strong>Plan:</strong> ${plan.name}</p>
        <p><strong>Price:</strong> ${plan.rupees}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
    `;

    MySwal.fire({
        title: 'Bill Details',
        html: `
            ${billDetails}
            <div style="margin-top: 20px;">
                <button id="printBill" style="margin-right: 10px;">Print</button>
                <button id="saveBill">Save as PDF</button>
            </div>
        `,
        icon: 'info',
        showConfirmButton: false,
    });

    document.getElementById('printBill').addEventListener('click', () => {
        printBill(billDetails);
    });

    document.getElementById('saveBill').addEventListener('click', () => {
        saveBillAsPDF(billDetails);
    });
};

const printBill = (billDetails) => {
    const printWindow = window.open('', '', 'height=400,width=600');
    printWindow.document.write('<html><head><title>Bill</title></head><body>');
    printWindow.document.write(billDetails);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
};

const saveBillAsPDF = (billDetails) => {
    const element = document.createElement('div');
    element.innerHTML = billDetails;
    html2pdf(element, {
        margin: 1,
        filename: 'recharge_bill.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    });
};

  const prev = [
    {
      rupee: "155",
      data: "2GB",
      // data: "03-may-2024",
      days: "24",
    },
    {
      rupee: "155",
      data: "2GB",
      // data: "03-may-2024",
      days: "24",
    },
  ];

  return (

    <>
      <section className="flex ml-8 gap-4 App-scroll flex flex-col  h-full items-center w-full mx-auto bg-gray-100 body-font ">
        <div className=" w-5/6 mt-24">
          <div className="flex justify-between mb-4">
            <h2 className="font-medium md:text-xl text-lg">
              Previous Recharges
            </h2>
            <div className=" cursor-pointer text-cyan-500 font-medium">
              View All
            </div>
          </div>
          <div className="w-full">
            {prev.map((prevPlan, i) => (
              <div key={i} className=" bg-white mb-4  pb-4 rounded-xl  border   w-full">
                <span className=" bg-cyan-500 text-white px-3 py-1 tracking-widest text-xs rounded-l">
                  CURRENT PLAN
                </span>
                <div className="flex px-4 justify-between w-full">
                  <div>
                    <h2 className="font-medium">
                      ₹{prevPlan.rupee} - {prevPlan.data} - {prevPlan.days} day
                    </h2>
                    <h4 className="text-gray-400 text-xs md:text-sm ">
                      ₹{prevPlan.rupee} - {prevPlan.data}
                    </h4>
                  </div>
                  <button className="px-4 py-1 rounded-full text-white bg-cyan-500 active:bg-cyan-400 hover:bg-cyan-700  bg-cyan-500">
                    Repeat
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full App-scroll h-full  flex justify-center  bg-white p-4">
          <div className="w-4/5 h-full">
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
            <div className="text-cyan-500  mb-2 pb-4 text-2xl">
              <TuneIcon className="" />
            </div>
            <div className="w-full flex flex-col items-end" >
            {allPlan && allPlan.map((plan, i) => {
             if(plan.rupees !== 0)
            return (
                <div key={i} className="mb-4 primBorder h-20 border-b w-1/2 flex ">
                 <div className="w-8" >
                   <h1 className="font-medium text-xl" >₹{plan.rupees}</h1>
                  </div>
                  <div className="flex w-5/6 justify-around">
                  {plan.days !== 0 && <div className="text-center">
                   <div className="text-sm text-gray-600" >Validity</div>
                   <div className="text-sm " >{plan.days} day</div>
                  </div>}
                 {plan.data !== 0 && <div>
                    <div className="text-sm text-gray-600"  >Data</div>
                   <div className="text-sm ">{plan.data} MB/Pack</div>
                  </div>}
                 {plan.files !== 0 && <div>
                    <div className="text-sm text-gray-600"  >File</div>
                   <div className="text-sm ">{plan.files} Files/pack</div>
                  </div>}
                  <div className="text-xl font" >
                    {/* <button className=" p-3 rounded-full text-white bg-cyan-500" >Recharge</button> */}
                    <ChevronRightIcon className="cursor-pointer text-xl"  onClick={() => handleBuy(plan)}/>
                  </div>
                </div>
                </div>
          )})}
            </div>
          
          
          </div>
        </div>
      </section>
    </>
  );
}

export default Premium;











//<section className="flex mt-32 ml-32 md:mt-12 md:ml-28 flex flex-col justify-center h-full items-center w-5/6 text-gray-600 body-font ">
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