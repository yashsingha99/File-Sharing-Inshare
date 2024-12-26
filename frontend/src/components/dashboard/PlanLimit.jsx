import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useLocation } from "react-router-dom";
import { changeIsActivate, fetchPurchashedPlans } from "../../api/user.api";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Cookies from "js-cookie";
const MySwal = withReactContent(Swal);

function PlanLimit() {
  const { user } = useUser();
  const [allBoughtPlan, setAllBoughtPlan] = useState(0);
  const [isActivate, setIsActivate] = useState(-1);
  const location = useLocation();
  const activateId = Cookies.get("$plan_activate")
  useEffect(() => {
    const fetchPlans = async () => {
      if (user) {
        const resPlan = await fetchPurchashedPlans(user);
        console.log(resPlan);
        setAllBoughtPlan(resPlan.data.arrOfBuyPlan || []);
      }
    };
    fetchPlans();
  }, [user, location]);
  
  const getDays = (data) => {
    const utcDate = new Date("2024-08-07T10:21:00.995Z");

    const currentUtcDate = new Date();
    
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istGivenDate = new Date(utcDate.getTime() + istOffset);
    const istCurrentDate = new Date(currentUtcDate.getTime() + istOffset);
    const timeDifference = istCurrentDate - istGivenDate;
    const dayDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return dayDifference;
  };

  const changeActivity = async (buyPlan, i) => {
    const activateId = localStorage.getItem("$plan_activate");
    if (activateId) {
      if (activateId !== buyPlan._id) {
        MySwal.fire({
          title: "You can't activate your plan more than once",
          icon: "info",
          confirmButtonText: "OK",
          confirmButtonColor: "#d33",
          timer: 3000,
          timerProgressBar: true,
        });
        return;
      }
    }

    const action = buyPlan.isActivate ? "Deactivate" : "Activate";

    const result = await MySwal.fire({
      title: "Are you sure?",
      text: `Do you really want to ${action} this plan?`,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: action,
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });
    console.log(result.isConfirmed);

    if (result.isConfirmed) {
      const res = await changeIsActivate(buyPlan);
      console.log("res", res);

      if (res.status === 200) {
        if (action === "Deactivate") {
           Cookies.remove("$plan_activate");
           console.log("removed");
             
        }
        else  {
           localStorage.setItem("$plan_activate", buyPlan._id);
           console.log("new");
        }
        MySwal.fire("Success", `${action}d successfully`, "success");
        setIsActivate(i);
        setAllBoughtPlan((prev) =>
          prev.map((plan, index) =>
            index === i ? { ...plan, isActivate: !plan.isActivate } : plan
          )
        );
      } else {
        MySwal.fire("Error", "Internal Issue. Please try again.", "error");
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      MySwal.fire("Cancelled", `${action} process cancelled`, "error");
    }
  };

  if (allBoughtPlan == 0)
    return (
      <section className="flex ml-8 justify-center flex-col h-full items-center w-full mx-auto bg-gray-100 body-font">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/inshare-49986.appspot.com/o/files%2FWait.GIF?alt=media&token=df841df7-16bb-45e1-b9af-5fe9ca094945"
          alt="Loading"
        />
      </section>
    );

  return (
    <div className="App-scroll w-full mt-24 font-sans bg-gray-100 justify-center flex flex-wrap h-full">
      <div className="w-full flex flex-wrap">
        {allBoughtPlan.map((planData, i) => {
          const totaldays = getDays(planData.createdAt)
          // if(i == 5)
          // console.log(totaldays+"days");
          
          if(activateId === planData._id && planData.Plan.days >= totaldays){
             localStorage.removeItem("$plan_activate")
          }
          if(planData.Plan.days >= totaldays)
        return (
          <div
            key={i}
            className={`${
              !planData.isActivate && "opacity-25"
            } relative drop-shadow-xl mr-8 mx-auto text-center w-3/4 md:w-2/5 bg-white rounded-lg p-4 m-4`}
          >
            <button
              onClick={() => changeActivity(planData, i)}
              className="bg-blue-500 absolute button-full-opacity text-white px-4 py-2 rounded top-3 right-3"
            >
              {planData.isActivate ? "Deactivate" : "Activate"}
            </button>

            {planData.Plan.files !== 0 && (
              <>
                <h1 className="text-start text-gray-500 font-semibold text-sm">
                  FILE
                </h1>
                <div className="w-full text-start">
                  <span className="font-bold">{planData.leftFiles} files</span>
                  <span className="text-gray-600 text-sm"> left</span>
                </div>
                <div className="w-full pt-1 mx-auto mt-4">
                  <p className="text-start text-gray-500 font-semibold text-xs">
                    {planData.Plan.files} files
                  </p>
                  <div className="flex mx-auto w-1/6 mb-2 items-center justify-between"></div>
                  <div className="overflow-hidden w-full h-2 mb-4 text-xs flex rounded bg-blue-200">
                    <div
                      style={{
                        width: `${
                          (planData.Plan.files - planData.leftFiles) *
                          (100 / planData.Plan.files)
                        }%`,
                      }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500 ease-in-out"
                    ></div>
                  </div>
                </div>
              </>
            )}
            {planData.Plan.data !== 0 && (
              <>
                <h1 className="text-start text-gray-500 font-semibold text-sm">
                  STORAGE
                </h1>
                <div className="w-full text-start">
                  <span className="font-bold">
                    {planData.leftData.toFixed(2)} MB
                  </span>
                  <span className="text-gray-600 text-sm"> left</span>
                </div>
                <div className="w-full pt-1 mx-auto mt-4">
                  <p className="text-start text-gray-500 font-semibold text-xs">
                    {planData.Plan.data} MB pack storage
                  </p>
                  <div className="flex mx-auto w-1/6 mb-2 items-center justify-between"></div>
                  <div className="overflow-hidden w-full h-2 mb-4 text-xs flex rounded bg-blue-200">
                    <div
                      style={{
                        width: `${
                          (planData.Plan.data - planData.leftData) *
                          (100 / planData.Plan.data)
                        }%`,
                      }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500 ease-in-out"
                    ></div>
                  </div>
                </div>
              </>
            )}
                <h1 className="text-start text-gray-500 font-semibold text-sm">
                  Validity
                </h1>
                <div className="w-full text-start">
                  <span className="font-bold">
                    {planData.Plan.days - totaldays} Days
                  </span>
                  <span className="text-gray-600 text-sm"> left</span>
                </div>
                <div className="w-full pt-1 mx-auto mt-4">
                  <p className="text-start text-gray-500 font-semibold text-xs">
                    {planData.Plan.days} days
                  </p>
                  <div className="flex mx-auto w-1/6 mb-2 items-center justify-between"></div>
                  <div className="overflow-hidden w-full h-2 mb-4 text-xs flex rounded bg-blue-200">
                    <div
                      style={{
                        width: `${
                          (totaldays) *
                          (100 / planData.Plan.days)
                        }%`,
                      }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500 ease-in-out"
                    ></div>
                  </div>
                </div>
          </div>
        )})}
      </div>
    </div>
  );
}

export default PlanLimit;
