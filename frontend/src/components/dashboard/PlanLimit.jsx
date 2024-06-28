import React, { useEffect, useState } from "react";
import { fetchPlan } from "../../api/api";
import { useUser } from "@clerk/clerk-react";
import { useLocation } from "react-router-dom";
import { fetchPurchashedPlans } from "../../api/user.api";

function PlanLimit() {
  const { user } = useUser();
  const [allBoughtPlan, setAllBoughtPlan] = useState();
  const location = useLocation();
  console.log(allBoughtPlan);
  useEffect(() => {
    const fetch = async () => {
      const resPlan = await fetchPurchashedPlans(user);
      console.log(resPlan);
      setAllBoughtPlan(resPlan.data.result.BuyPlan);
    };
    user && fetch();
  }, [user, location]);

  const changeActivity = async(plan) => {
    const res = await 
  }

  return (
    <div className="w-full mt-24 font-sans bg-gray-100 justify-center flex flex-wrap h-full">
      <div className="w-full flex flex-wrap">
        {allBoughtPlan &&
          allBoughtPlan.map((planData, i) => {
            return (
              <div
                key={i}
                className={`${
                  !planData.isActivate && 'opacity-25'
                } relative drop-shadow-xl mr-8 mx-auto text-center w-3/4 md:w-2/5 bg-white rounded-lg p-4 m-4`}
              >
                <button className="bg-blue-500 absolute button-full-opacity text-white px-4 py-2 rounded top-3 right-3">
                  Activate Plan
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
                            width: `${planData.leftFiles * (100 / planData.Plan.files)}%`,
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
                            width: `${planData.leftData * (100 / planData.Plan.data)}%`,
                          }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500 ease-in-out"
                        ></div>
                      </div>
                    </div>
                  </>
                )}
                {planData.Plan.days !== 0 && (
                  <>
                    <h1 className="text-start text-gray-500 font-semibold text-sm">
                      Validity
                    </h1>
                    <div className="w-full text-start">
                      <span className="font-bold">
                        {planData.leftValidity.toFixed(2)} Days
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
                            width: `${planData.leftValidity * (100 / planData.Plan.days)}%`,
                          }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500 ease-in-out"
                        ></div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default PlanLimit;
