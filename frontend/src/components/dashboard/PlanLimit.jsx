import React, { useEffect, useState } from 'react'
import { fetchPlan } from '../../api/api'
import { useUser } from "@clerk/clerk-react";

function PlanLimit() {
  const { user } = useUser()
  const [planData, setPlanData] = useState()
  useEffect(() => {
    const fetch = async () => {
      const res = await fetchPlan(user)
      setPlanData(res.data.planData)
    }
    user && fetch()
  }, [user])
  if(planData)
  return (
    <div className='w-full mt-20 font-sans bg-gray-100 justify-around flex flex-wrap h-full'>
      <div className='drop-shadow-xl text-center w-2/5 bg-white rounded-lg p-4 m-4' >
        <h1 className='text-start text-gray-500 font-semibold text-sm' >FILE</h1>
        <div className='w-full text-start' >
        <span className='  font-bold' >
          {( planData.premium.numberOfFiles ) - ( planData.spent.fileCount ) }  files
        </span>
        <span className='text-gray-600 text-sm' > left</span>
        </div>

        <div className="w-full pt-1 mx-auto mt-4">
        <p className='text-start text-gray-500 font-semibold text-xs' >{ planData.premium.numberOfFiles } files</p>
            <div className="flex mx-auto w-1/6 mb-2 items-center justify-between">
              
            </div>
            <div className="overflow-hidden w-full   h-2 mb-4 text-xs flex rounded bg-blue-200">
              <div
                style={{ width: `${(( planData.spent.fileCount )) * (100 / planData.premium.numberOfFiles)}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500 ease-in-out"
              ></div>
            </div>
          </div>
      </div>
      <div className='drop-shadow-xl text-center w-2/5 bg-white rounded-lg p-4 m-4' >
        <h1 className='text-start text-gray-500 font-semibold text-sm' >STORAGE</h1>
        <div className='w-full text-start' >
        <span className='  font-bold' >
          {(( planData.premium.storage ) - ( planData.spent.totalStorage )).toFixed(2) } MB
        </span>
        <span className='text-gray-600 text-sm' > left</span>
        </div>

        <div className="w-full pt-1 mx-auto mt-4">
        <p className='text-start text-gray-500 font-semibold text-xs' >{ planData.premium.storage } MB pack storage</p>
            <div className="flex mx-auto w-1/6 mb-2 items-center justify-between">
              
            </div>
            <div className="overflow-hidden w-full   h-2 mb-4 text-xs flex rounded bg-blue-200">
              <div
                style={{ width: `${(( planData.spent.totalStorage )) * (100/planData.premium.storage)}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500 ease-in-out"
              ></div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default PlanLimit