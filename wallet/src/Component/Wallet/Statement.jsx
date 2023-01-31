import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersAction } from "../../redux/slices/userSlices";
import Payment from "./Payment";

const Statement = () => {
  const [activeTab, setActiveTab] = useState(1);
  const dispatch = useDispatch();
  const [showMyModal, setShowMyModal] = useState(false);
  const [userId, setUserId] = useState(null);
  console.log("id", userId);
  const { loading, appErr, serverErr, allUsers,login } = useSelector(
    (store) => store?.user
  );

  const handleOnClose = () => setShowMyModal(false);

  const handleChange = (id) => {
    setShowMyModal(true);
    setUserId(id);
  };
  useEffect(() => {
    dispatch(getAllUsersAction(""));
  }, [dispatch]);
  return (
    <div className="items-center justify-between w-full flex flex-col ">
      {/* filtering section */}
      <div className="items-start self-center justify-start lg:space-x-2  cursor-pointer w-full space-y-4 lg:space-y-0 lg:flex py-2 px-3">
        {Array.from({ length: 2 }, (_, i) => (
          <div
            onClick={() => setActiveTab(i)}
            className={` ${
              activeTab === i
                ? "bg-black text-gray-100"
                : "bg-gray-100 text-black"
            }  self-center  py-2 px-8 rounded-md  text-lg`}
          >
            {i === 0 ? "Statements" : "Users"}
          </div>
        ))}
      </div>
      {/* items */}
      {activeTab === 0 ? (
        <div>no statements</div>
      ) : (
        <div className="h-auto  overflow-y-scroll scrollbar-hide w-full py-3 px-4 ">
          {allUsers &&
            allUsers.users.map((item) => (
              <div className="flex w-full items-start justify-start py-6 px-3">
                <h1 className="text-left items-center justify-center flex w-[35%]">
                  {item.name}
                </h1>

                <button
                  onClick={() => handleChange(item._id)}
                  className="bg-black smooth hover:bg-gray-100 hover:text-gray-900 hover:border-gray-900 text-gray-100 py-3 px-8 border border-transparent rounded-md"
                >
                  Pay
                </button>
              </div>
            ))}
        </div>
      )}
      <Payment onClose={handleOnClose} visible={showMyModal} id={userId} />
    </div>
  );
};

export default Statement;
