import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { userOTPAction } from "../../redux/slices/userSlices";
import { useEffect } from "react";

//Form schema
const formSchema = Yup.object({
  otp: Yup.string().required("OTP is required"),
});
const OTPpage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, appErr, serverErr, registered, login } = useSelector(
    (store) => store?.user
  );

  const user = localStorage.getItem("users");
  console.log("usss", user);

  //formik
  const formik = useFormik({
    initialValues: {
      id: registered.user._id,
      phone: registered.user.phone,
      otp: "",
    },
    onSubmit: (values) => {
      //dispath the action
      console.log("111");

      console.log(values);
      dispatch(userOTPAction(values));
    },
    validationSchema: formSchema,
  });
  useEffect(() => {
    if (login) {
      toast.success("Successfully Logged");
      navigate("/wallet");
    }
  }, [login]);
  return (
    <>
      <section className="max-h-screen overflow-y-hidden">
        <div className="container px-4 mx-auto">
          <div className="max-w-5xl mx-auto">
            <div class="flex h-screen overflow-y-hidden">
              <div class="m-auto">
                <div className="flex flex-col items-center justify-center mb-10">
                  <div>
                    <h3 className=" text-2xl font-bold font-heading uppercase text-purple-700">
                      {/* Header */}
                      OTP Verification
                    </h3>
                  </div>
                  <div>
                    <h4>Please enter the OTP 1234.</h4>
                  </div>
                  {/* <div className="flex"> */}

                  {/* </div> */}
                </div>
                <form onSubmit={formik.handleSubmit}>
                  <div class="flex items-center pl-6 w-full mb-6 border border-slate-400 bg-white rounded-lg log-box ">
                    <input
                      className="w-full pr-6 pl-4 py-4 font-bold placeholder-gray-300 rounded-r-full focus:outline-none"
                      placeholder="OTP"
                      value={formik.values.otp}
                      onChange={formik.handleChange("otp")}
                      onBlur={formik.handleBlur("otp")}
                    />
                  </div>
                  {/* Err message */}
                  <div className="text-red-400 mb-2">
                    {formik.touched.otp && formik.errors.otp}
                  </div>

                  {/* <Link to="/wallet"> */}
                  <button
                    type="submit"
                    className="py-4 w-full bg-[#7e22ce] hover:bg-[#9333ea] text-white font-bold rounded-lg transition duration-200"
                  >
                    Login
                  </button>
                  {/* </Link> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OTPpage;
