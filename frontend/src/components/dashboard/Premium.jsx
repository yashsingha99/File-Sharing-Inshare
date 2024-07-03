import React, { useEffect, useState } from "react";
import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";
import SearchIcon from "@mui/icons-material/Search";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AutofpsSelectIcon from "@mui/icons-material/AutofpsSelect";
import TuneIcon from "@mui/icons-material/Tune";
import { pricing } from "../files/pricing";
import { addPlan } from "../../api/api";
import { useUser } from "@clerk/clerk-react";
import { fetchAllPlans } from "../../api/planApi";
import { useLocation } from "react-router-dom";
import pay from "../../images/pay.jpeg";
import html2pdf from "html2pdf.js";
import { fetchPurchashedPlans } from "../../api/user.api";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import BigShadowedWord from "./BigShadowedWord";
const MySwal = withReactContent(Swal);

function Premium() {
  const [isbuy, setIsBuy] = useState(true);
  const [allPlan, setAllPlan] = useState();
  const [allBoughtPlan, setAllBoughtPlan] = useState();
  const [planSearch, setPlanSearch] = useState();
  const location = useLocation();
  const { user } = useUser();

  console.log(allBoughtPlan);

  useEffect(() => {
    const fetch = async () => {
      const res = await fetchAllPlans();
      setAllPlan(res.data.allPlans);
    };
    user && fetch();
  }, [location, user]);

  useEffect(() => {
    const fetch = async () => {
      const resPlan = await fetchPurchashedPlans(user);
      setAllBoughtPlan(resPlan.data.result.BuyPlan);
    };
    user && fetch();
  }, [location, user, isbuy]);

  const convertTimeAndDate = (utcTime) => {
    return new Date(
      new Date(utcTime).toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    ).toLocaleString("en-IN");
  };

  const viewAllPreRecharge = () => {
    MySwal.fire({
      html: (
        <div>
          {allBoughtPlan &&
            allBoughtPlan.map((prevPlan, i) => {
              const time = convertTimeAndDate(prevPlan.createdAt).split(",")[0];

              return (
                <div
                  key={i}
                  className=" relative bg-white mb-4  pb-4 rounded-xl  border w-5/6  md:w-full"
                >
                  {prevPlan.isCurrent && (
                    <span className="absolute top-0 left-0 bg-cyan-500  text-white px-3 py-1 tracking-widest text-xs rounded-l">
                      CURRENT PLAN
                    </span>
                  )}
                  <div className="flex px-4 mt-8 justify-between w-full">
                    <div>
                      <h4 className="md:text-lg text-sm">
                        ₹{prevPlan.Plan.rupees}
                        {prevPlan.Plan.data != 0 &&
                          ` - ${prevPlan.Plan.data}MB/pack`}{" "}
                        -{prevPlan.Plan.days} day
                      </h4>
                      <h4 className="text-gray-500 md:text-sm text-xs">
                        Recharged ₹{prevPlan.Plan.rupees} on {time}
                      </h4>
                    </div>
                    <button
                      onClick={() => handleBuy(prevPlan)}
                      className="px-4 py-1 md:text-lg text-sm rounded-full text-white bg-cyan-500 active:bg-cyan-400 hover:bg-cyan-700  bg-cyan-500"
                    >
                      Repeat
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      ),
      width: "30rem",
      padding: "20px",
      showCloseButton: true,
      showConfirmButton: false,
    });
  };

  const handleBuy = (plan) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "Do you really want to buy this plan?",
      icon: "info",
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
        setIsBuy((p) => !p);
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
      title: "Bill Details",
      html: `
            ${billDetails}
            <div style="margin-top: 20px;">
                <button id="printBill" style="margin-right: 10px;">Print</button>
                <button id="saveBill">Save as PDF</button>
            </div>
        `,
      icon: "info",
      showConfirmButton: false,
    });

    document.getElementById("printBill").addEventListener("click", () => {
      printBill(billDetails);
    });

    document.getElementById("saveBill").addEventListener("click", () => {
      saveBillAsPDF(billDetails);
    });
  };

  const printBill = (billDetails) => {
    const printWindow = window.open("", "", "height=400,width=600");
    printWindow.document.write("<html><head><title>Bill</title></head><body>");
    printWindow.document.write(billDetails);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  const saveBillAsPDF = (billDetails) => {
    const element = document.createElement("div");
    element.innerHTML = billDetails;
    html2pdf(element, {
      margin: 1,
      filename: "recharge_bill.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    });
  };
  if (allBoughtPlan)
    return (
      <>
        <section className="flex ml-8 gap-4 App-scroll flex flex-col  h-full items-center w-full mx-auto bg-gray-100 body-font ">
          <div className=" w-5/6 mt-24">
            <div className="flex justify-between mb-4">
              <h2 className="font-medium md:text-xl text-lg">
                Previous Recharges
              </h2>
              {allBoughtPlan && (
                <div
                  onClick={viewAllPreRecharge}
                  className=" cursor-pointer text-cyan-500 font-medium"
                >
                  View All
                </div>
              )}
            </div>
            <div className="md:w-3/4  w-full mx-auto">
              {allBoughtPlan ? (
                allBoughtPlan.slice(0, 2).map((prevPlan, i) => {
                  console.log(prevPlan);
                  const time = convertTimeAndDate(prevPlan.createdAt).split(
                   ","
                  )[0];
                  return (
                    <div
                      key={i}
                      className=" bg-white mb-4  pb-4 rounded-xl  border   w-full"
                    >
                      {prevPlan.isCurrent && (
                        <span className=" bg-cyan-500 text-white px-3 py-1 tracking-widest text-xs rounded-l">
                          CURRENT PLAN
                        </span>
                      )}
                      <div className="flex px-4 justify-between w-full">
                        <div>
                          <h2 className="font-medium">
                            ₹{prevPlan.Plan.rupees} - {prevPlan.Plan.data}
                            MB/pack - {prevPlan.Plan.days} day
                          </h2>
                          <h4 className="text-gray-500 text-xs text-medium md:text-sm ">
                            Recharged ₹{prevPlan.Plan.rupees} on {time}
                          </h4>
                        </div>
                        <button
                          onClick={() => handleBuy(prevPlan)}
                          className="px-4 py-1 rounded-full text-white bg-cyan-500 active:bg-cyan-400 hover:bg-cyan-700  bg-cyan-500"
                        >
                          Repeat
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <BigShadowedWord child={"No Previous Plan"} />
              )}
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
                  value={planSearch}
                  onChange={(e) => setPlanSearch(e.target.value)}
                  placeholder="Search a Plan, e.g. 245 or 20 files"
                  className=" md:text-xl text-sm  p-4 outline-none rounded-3xl w-full"
                />
              </div>
              <div className="text-cyan-500  mb-2 pb-4 text-2xl">
                <TuneIcon className="" />
              </div>
              <div className="md:w-full mx-auto w-5/6 flex flex-col md:items-end">
                {allPlan &&
                  allPlan.map((plan, i) => {
                    if (plan.rupees !== 0 || plan.rupees === planSearch || plan.days)
                      return (
                        <div
                          key={i}
                          className="mb-4 primBorder justify-between h-20 border-b w-full flex "
                        >
                          <div className="md:w-8 w-4">
                            <h1 className="font-medium text-lg md:text-xl">
                              ₹{plan.rupees}
                            </h1>
                          </div>
                          <div className="flex w-5/6 justify-around">
                            {plan.days !== 0 && (
                              <div className="text-center">
                                <div className="text-sm text-gray-600">
                                  Validity
                                </div>
                                <div className="text-sm ">{plan.days} day</div>
                              </div>
                            )}
                            {plan.data !== 0 && (
                              <div>
                                <div className="text-sm text-gray-600">
                                  Data
                                </div>
                                <div className="text-sm">
                                  {plan.data} MB/Pack
                                </div>
                              </div>
                            )}
                            {plan.files !== 0 && (
                              <div>
                                <div className="text-sm text-gray-600">
                                  File
                                </div>
                                <div className="text-sm ">
                                  {plan.files} Files/pack
                                </div>
                              </div>
                            )}
                            <div className="text-xl font">
                              {/* <button className=" p-3 rounded-full text-white bg-cyan-500" >Recharge</button> */}
                              <ChevronRightIcon
                                className="cursor-pointer text-xl"
                                onClick={() => handleBuy(plan)}
                              />
                            </div>
                          </div>
                        </div>
                      );
                  })}
              </div>
            </div>
          </div>
        </section>
      </>
    );
  else
    return (
      <section className="flex ml-8 justify-center flex-col  h-full items-center w-full mx-auto bg-gray-100 body-font ">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/inshare-49986.appspot.com/o/files%2FWait.GIF?alt=media&token=df841df7-16bb-45e1-b9af-5fe9ca094945"
          alt=""
        />
      </section>
    );
}

export default Premium;
