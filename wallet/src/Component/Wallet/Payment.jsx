import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { walletCreditAction } from "../../redux/slices/userSlices";

const Payment = ({ visible, onClose, id }) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);

  console.log("amount", amount);
  const handleOnClose = (e) => {
    if (e.target.id === "container") onClose();
  };

  if (!visible) return null;

  const handlePayment = async () => {
    try {
      dispatch(walletCreditAction({ id: id, credit: amount }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      id="container"
      onClick={handleOnClose}
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="bg-white p-2 rounded relative w-full h-full max-w-md md:h-auto px-6 py-6 lg:px-8">
        <div className="flex justify-between items-start  p-4 border-b rounded-t dark:border-gray-600">
          <div className="font-bold">Pay</div>
          <div className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
            <AiOutlineClose onClick={onClose} />
          </div>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Amount
          </label>
          <input
            placeholder="Amount"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="flex justify-end items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
          <button
            onClick={handlePayment}
            className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
