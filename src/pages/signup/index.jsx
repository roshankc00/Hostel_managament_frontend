import { ErrorMessage, Field, Form, Formik } from "formik";
import { object, string } from "yup";
import { addData } from "../../services/axios.service";
import { errorToast, successToast } from "../../services/toastify.service";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
const SignUp = () => {
  const navigate = useNavigate();
  const [activation_token, setactivation_token] = useState("");
  const [showSigninPage, setshowSigninPage] = useState(true);

  const initialValue = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = object().shape({
    name: string().required("Name field is required"),
    email: string().required("email field is required"),
    password: string()
      .min(6, "password must be of 6 digit")
      .required("Password field is required"),
  });
  const [invalidError, setinvalidError] = useState(false);
  const [verifyNumber, setverifyNumber] = useState({
    0: "",
    1: "",
    2: "",
    3: "",
  });
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const verificationHandler = async () => {
    const verificationNumber = Object.values(verifyNumber).join("");

    if (verificationNumber.length != 4) {
      setinvalidError(true);
      return;
    }

    const response = await addData("activate-user", {
      activation_token,
      activation_code: verificationNumber,
    });
    if (response.success) {
      successToast(
        response.message ? response.message : "User registered successfully"
      );
      navigate("/signin");
    } else {
      errorToast(
        response.message ? response.message : "user registered successfully"
      );
    }
  };

  const handleInputChange = (index, value) => {
    setinvalidError(false);
    const newVerifyNumber = { ...verifyNumber, [index]: value };
    setverifyNumber(newVerifyNumber);
    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleSignupForm = async (values) => {
    console.log(values);
    const response = await addData("users", values);
    if (response.success) {
      setactivation_token(response?.activationToken);
      setshowSigninPage(false);
      successToast(
        response.message
          ? response.message
          : "please check your email to activate your account"
      );
    } else {
      errorToast(
        response.message ? response.message : "Unable to register the user"
      );
    }
  };

  return (
    <>
      {showSigninPage && (
        <div className="max-w-md mx-auto mb-2 bg-white shadow-lg  flex flex-col items-center justify-center mt-[5%] py-4">
          <h1 className="text-center text-4xl font-bold mb-10">
            Register User
          </h1>

          <Formik
            initialValues={initialValue}
            validationSchema={validationSchema}
            onSubmit={handleSignupForm}
          >
            {({ isSubmitting }) => {
              return (
                <Form>
                  <div className="mb-4">
                    <label className="text-[20px] font-semibold">Name:</label>
                    <Field
                      type="text"
                      name="name"
                      className="mb-2 p-2 w-full border"
                    ></Field>
                    <ErrorMessage
                      component="div"
                      name="name"
                      className="text-red-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="text-[20px] font-semibold"
                    >
                      Email:
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className="w-full border px-4 py-2"
                    ></Field>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 mt-1"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className="text-[20px] font-semibold"
                    >
                      Password:
                    </label>
                    <Field
                      type="password"
                      id="password"
                      name="password"
                      className="w-full border px-4 py-2"
                    ></Field>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 mt-1"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 p-3 text-xl text-white fw-fw-bolder w-full rounded-md text-cente my-3 "
                  >
                    {isSubmitting ? "creating...." : "Register "}
                  </button>
                </Form>
              );
            }}
          </Formik>

          <div>
            <Link to="/signin" className="text-xl mt-2">
              Already have an account? Signin
            </Link>
          </div>
          <div className="mt-3 relative left-[20%]">
            <Button
              variant="contained"
              onClick={() => navigate("/hostel-register")}
            >
              {" "}
              Register a hostel
            </Button>
          </div>
        </div>
      )}

      {!showSigninPage && (
        <div className="max-w-[100vw] flex justify-center items-center h-[100vh]">
          <div className="shadow-md px-10 py-3">
            <div className="">
              <h1 className="text-[25px] text-black dark:text-white font-[500] font-Poppins text-center py-2 ">
                {" "}
                Verify Your Account
              </h1>
              <br />
              <div className="w-full flex items-center justify-center mt-2">
                <div className="w-[80px] h-[80px] rounded-full bg-[#497DF2] flex justify-center items-center">
                  <VscWorkspaceTrusted size={40} />
                </div>
              </div>
              <br />
              <br />
              <div className="1000px:w-[70%] m-auto flex items-center justify-around">
                {Object.keys(verifyNumber).map((key, index) => (
                  <input
                    type="number"
                    key={key}
                    ref={inputRefs[index]}
                    maxLength={1}
                    value={verifyNumber[key]}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    className={`w-[65px] h-[65px] bg-transparent border-[3px] rounded-[10px] flex items-center text-black dark:text-white justify-center  text-[18px] font-Poppins outline-none text-center  ms-2 ${
                      invalidError
                        ? "shake border-red-500"
                        : "dark:border-white border-[#0000004a]"
                    }`}
                  />
                ))}
              </div>
              <br />
              <br />
              <div>
                <button
                  className={`flex flex-row justify-center items-center py-3 px-6 rounded-full cursor-pointer bg-[#2190ff] min-h-[45px] w-full text-[16px] font-Poppins font-semibold mt-5 mb-5`}
                  onClick={() => verificationHandler()}
                >
                  {" "}
                  Verify Number
                </button>
              </div>
              <br />
              <h5 className="text-center pt-4 font-Poppins text-[16px] dark:text-white">
                Go back to Sign in ?
                <span
                  className="text-center text-[#2190ff] pl-1 cursor-pointer"
                  onClick={() => navigate("/signup")}
                >
                  Sign up
                </span>
              </h5>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;
