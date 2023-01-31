import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { walletCreditAction } from "../../redux/slices/userSlices";

const Content = () => {
  const dispatch = useDispatch();

  const [amount, setAmount] = useState(0);
  const { loading, appErr, serverErr, registered, credit } = useSelector(
    (store) => store?.user
  );

  console.log("amount", credit.wallet.amount);

  const handlePayment = async () => {
    try {
      dispatch(walletCreditAction({ id: registered.user._id, credit: amount }));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (credit) {
      toast.success(credit.message);
    }
  }, [credit]);
  return (
    <>
      <div className=" pb-1 pt-12 px-3 w-full h-full space-y-8">
        <div className="pb-2 pt-4 px-3 items-center justify-center grid grid-cols-2 xl:grid-cols-4 w-full">
          <div className="xl:col-span-1 col-span-2 px-3 py-2 bg-[#ddd8d8] rounded-lg flex items-center w-full justify-between">
            <div className="flex flex-col items-center w-full">
              <span className="font-semibold">Available Funds</span>
              <span className="font-bold text-lg">
                {credit.wallet.amount} ₹
              </span>
              <span>Low funds, please top up</span>
            </div>
          </div>

          <div className=" py-3 px-3  w-full xl:col-span-3 col-span-2 xl:flex items-center justify-between  xl:space-y-0 space-y-4 xl:space-x-4">
            <div className="w-full items-start justify-start xl:items-center xl:justify-center flex flex-col">
              <div class="relative">
                <h1 className="font-medium text-gray-500">Amount</h1>
                <input
                  className="block appearance-none w-[13rem]  border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  placeholder="Amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>

            <div className="w-full items-start justify-start xl:items-center xl:justify-center flex flex-col">
              <button
                onClick={handlePayment}
                className="uppercase text-white bg-black rounded-md h-[3rem] w-[12rem] p-3 flex justify-center mt-7"
              >
                top up wallet
              </button>
            </div>
          </div>
        </div>
        <h1 className="pt-6 font-semibold text-sm">Top Up With</h1>
        <div className="xl:col-span-1 flex flex-row gap-4 mt-4">
          <button
            className="bg-white border rounded-md border-gray-400 text-blue-500 font-bold flex justify-center p-2 w-[5rem]"
            value="50"
            onClick={(e) => setAmount(e.target.value)}
          >
            ₹ 50
          </button>
          <button
            className="bg-white border rounded-md border-gray-400 text-blue-500 font-bold flex justify-center p-2 w-[5rem]"
            value="100"
            onClick={(e) => setAmount(e.target.value)}
          >
            ₹ 100
          </button>
          <button
            className="bg-white border rounded-md border-gray-400 text-blue-500 font-bold flex justify-center p-2 w-[5rem]"
            value="200"
            onClick={(e) => setAmount(e.target.value)}
          >
            ₹ 200
          </button>
          <button
            className="bg-white border rounded-md border-gray-400 text-blue-500 font-bold flex justify-center p-2 w-[5rem]"
            value="500"
            onClick={(e) => setAmount(e.target.value)}
          >
            ₹ 500
          </button>
          <button
            className="bg-white border rounded-md border-gray-400 text-blue-500 font-bold flex justify-center p-2 w-[5rem]"
            value="1000"
            onClick={(e) => setAmount(e.target.value)}
          >
            ₹ 1000
          </button>
          <button
            className="bg-white border rounded-md border-gray-400 text-blue-500 font-bold flex justify-center p-2 w-[5rem]"
            value="2000"
            onClick={(e) => setAmount(e.target.value)}
          >
            ₹ 2000
          </button>
          <button
            className="bg-white border rounded-md border-gray-400 text-blue-500 font-bold flex justify-center p-2 w-[5rem]"
            value="5000"
            onClick={(e) => setAmount(e.target.value)}
          >
            ₹ 5000
          </button>
        </div>
      </div>
    </>
  );
};

export default Content;
