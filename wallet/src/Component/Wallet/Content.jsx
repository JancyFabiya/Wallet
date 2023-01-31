import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { walletCreditAction } from "../../redux/slices/userSlices";
import Statement from "./Statement";

const Content = () => {
  const dispatch = useDispatch();

    const [amount,setAmount] = useState(0)
    const {loading,appErr,serverErr,registered,credit} = useSelector((store) => store?.user)

    console.log("amount",amount)
    

    const handlePayment = async () => {
      try {
        dispatch(walletCreditAction({id:registered.user._id,credit:amount}))
      } catch (error) {
        console.log(error);
        
      }
    }
    useEffect(() => {
      if(credit){
        toast.success(credit.message)
      }
     
    }, [credit]);
  return (
    <>
      <div className=" pb-1 pt-12 px-3 w-full h-full space-y-8">
        <div className="pb-2 pt-4 px-3 items-center justify-center grid grid-cols-2 xl:grid-cols-4 w-full">
          <div className="xl:col-span-1 col-span-2 px-3 py-2 bg-[#ddd8d8] rounded-lg flex items-center w-full justify-between">
            {/* <div className="flex flex-col items-center justify-center w-full px-4 py-2">
                <h1 className="text-start items-start justify-start flex w-full font-bold text-black text-xl">
                  {" "}
                  ... 4060{" "}
                </h1>
                <div className="flex w-full items-center justify-between space-x-4">
                  <p> 01 / 22 </p>
                  <p className="text-[#3C45A0]"> CVV code </p>
                </div>
              </div> */}
            <div className="flex flex-col items-center w-full">
              <span className="font-semibold">Available Funds</span>
              {credit?.wallet? (
              <span className="font-bold text-lg">{credit?.wallet?.amount} ₹</span>
              ):(
              <span className="font-bold text-lg">0.00 ₹</span>

              )}
              <span>Low funds, please top up</span>
            </div>
            {/* <div className="px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div> */}
          </div>

          <div className=" py-3 px-3  w-full xl:col-span-3 col-span-2 xl:flex items-center justify-between  xl:space-y-0 space-y-4 xl:space-x-4">
            <div className="w-full items-start justify-start xl:items-center xl:justify-center flex flex-col">
              {/* <h1 className="font-medium text-gray-500"> Cash available</h1>
                <h1 className="text-2xl font-bold"> $ 60,450 </h1> */}
              <div class="relative">
                <h1 className="font-medium text-gray-500">Amount</h1>
                <input
                                            className="block appearance-none w-[13rem]  border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            id="grid-state"
                                            placeholder="Amount"
                                            type="number"
                                            value={amount}
                                            onChange={e => setAmount(e.target.value)}
                                        />
              </div>
            </div>
            {/* <div className="w-full items-start justify-start xl:items-center xl:justify-center flex flex-col">
                <h1 className="font-medium text-gray-500"> Credit Limit</h1>
                <h1 className="text-2xl font-bold"> $ 80,000 </h1>
              </div> */}
            <div className="w-full items-start justify-start xl:items-center xl:justify-center flex flex-col">
              {/* <h1 className="font-medium text-gray-500">Debt</h1>
                <h1 className="text-2xl font-bold"> $ 24,300 </h1> */}
              <button onClick={handlePayment} className="uppercase text-white bg-black rounded-md h-[3rem] w-[12rem] p-3 flex justify-center mt-7">
                top up wallet
              </button>
            </div>
            {/* <div className="flex flex-row gap-6">
                            <div class="relative">
                                <label
                                    class="block text-gray-700 text-sm font-bold mb-2"
                                    for="password"
                                >
                                    Amount
                                </label>
                                <select
                                    class="block appearance-none w-[13rem]  border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-state"
                                >
                                    <option>Select Amount</option>
                                    <option>2</option>
                                    <option>3</option>
                                </select>
                                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 pt-6 text-gray-700">
                                    <svg
                                        class="fill-current h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="uppercase bg-blue-600 rounded-md h-[3rem] w-[12rem] p-3 flex justify-center mt-7">
                                top up wallet
                            </div>
                        </div> */}
          </div>
          
        </div>
        {/* <div className="px-3 w-full items-center justify-center flex"> */}
            <h1 className="pt-6 font-semibold text-sm">Top Up With</h1>
            {/* <div className="xl:grid-cols-4 w-full"></div> */}
            <div className="xl:col-span-1 flex flex-row gap-4 mt-4">
                                <button className="bg-white border rounded-md border-gray-400 text-blue-500 font-bold flex justify-center p-2 w-[5rem]"
                                value="50" onClick={(e)=>setAmount(e.target.value)}>
                                    ₹ 50
                                </button>
                                <button className="bg-white border rounded-md border-gray-400 text-blue-500 font-bold flex justify-center p-2 w-[5rem]"
                                 value="100" onClick={(e)=>setAmount(e.target.value)}>
                                    ₹ 100
                                </button>
                                <button className="bg-white border rounded-md border-gray-400 text-blue-500 font-bold flex justify-center p-2 w-[5rem]"
                                 value="200" onClick={(e)=>setAmount(e.target.value)}>
                                    ₹ 200
                                </button>
                                <button className="bg-white border rounded-md border-gray-400 text-blue-500 font-bold flex justify-center p-2 w-[5rem]"
                                 value="500" onClick={(e)=>setAmount(e.target.value)}>
                                    ₹ 500
                                </button>
                                <button className="bg-white border rounded-md border-gray-400 text-blue-500 font-bold flex justify-center p-2 w-[5rem]"
                                 value="1000" onClick={(e)=>setAmount(e.target.value)}>
                                    ₹ 1000
                                </button>
                                <button className="bg-white border rounded-md border-gray-400 text-blue-500 font-bold flex justify-center p-2 w-[5rem]" 
                                 value="2000" onClick={(e)=>setAmount(e.target.value)}>
                                    ₹ 2000
                                </button>
                                <button className="bg-white border rounded-md border-gray-400 text-blue-500 font-bold flex justify-center p-2 w-[5rem]" 
                                 value="5000" onClick={(e)=>setAmount(e.target.value)}>
                                    ₹ 5000
                                </button>
                            </div>
          {/* </div> */}
          <div className=" py-1 px-3 w-full h-full ">
         
          <Statement />
         
        </div>
      </div>
    </>
  );
};

export default Content;
