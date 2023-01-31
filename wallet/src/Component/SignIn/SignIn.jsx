import React, { useEffect } from "react";
import { FiPhoneCall } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { userLoginAction } from "../../redux/slices/userSlices";

//Form schema
const formSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  phone: Yup.string().required("Phone number is required"),
});

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, appErr, serverErr, registered } = useSelector(
    (store) => store?.user
  );
  console.log("login", appErr);

  //formik
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
    },
    onSubmit: (values) => {
      //dispath the action
      console.log("111");

      console.log(values);
      dispatch(userLoginAction(values));
    },
    validationSchema: formSchema,
  });

  useEffect(() => {
    if (appErr) {
      toast.error(appErr);
    }
    if (registered) {
      toast.success(registered.message);
      navigate("/otp");
    }
  }, [appErr, registered]);

  return (
    <>
      <section className="max-h-screen overflow-y-hidden">
        <div className="container px-4 mx-auto">
          <div class="flex h-screen overflow-y-hidden">
            <div class="m-auto w-full md:w-[50%] lg:w-[40%]">
              <div className="flex flex-col  mb-10 sm:position ">
                <div>
                  <h3 className=" text-2xl font-bold font-heading  text-black">
                    {/* Header */}
                    Sign In
                  </h3>
                </div>
                <div>
                  <h4>
                    Please enter your mobile number and name for registration.
                  </h4>
                </div>
              </div>
              <form onSubmit={formik.handleSubmit}>
                <div className="flex items-center pl-6 w-full mb-6 border border-slate-400 bg-white rounded-lg log-box">
                  <FaRegUser />
                  <input
                    value={formik.values.name}
                    onChange={formik.handleChange("name")}
                    onBlur={formik.handleBlur("name")}
                    className="w-full pr-6 pl-4 py-4 font-bold placeholder-gray-300 rounded-r-full focus:outline-none"
                    type="name"
                    placeholder=" User Name"
                  />
                </div>
                {/* Err message */}
                <div className="text-red-400 mb-2">
                  {formik.touched.name && formik.errors.name}
                </div>
                <div className="flex items-center pl-6 w-full mb-6 border border-slate-400 bg-white rounded-lg log-box">
                  <FiPhoneCall />
                  <input
                    value={formik.values.phone}
                    onChange={formik.handleChange("phone")}
                    onBlur={formik.handleBlur("phone")}
                    className="w-full pr-6 pl-4 py-4 font-bold placeholder-gray-300 rounded-r-full focus:outline-none"
                    type="phonenumber"
                    placeholder=" +91 45692 36562"
                  />
                </div>
                {/* Err message */}
                <div className="text-red-400 mb-2">
                  {formik.touched.phone && formik.errors.phone}
                </div>
                {/* <Link to="/otp"> */}
                <button
                  type="submit"
                  className="py-4 w-full bg-black hover:bg-gray-800 text-white font-bold rounded-lg transition duration-200"
                >
                  Sign in
                </button>
                {/* </Link> */}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignIn;
