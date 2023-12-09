import { ErrorMessage, Field, Form, Formik } from "formik";
import { object, string } from "yup";
import styles from "./register.module.css";
import { addData } from "../../services/axios.service";

import { errorToast, successToast } from "../../services/toastify.service";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { VscWorkspaceTrusted } from "react-icons/vsc";

const RegisterHotel = () => {
  const navigate = useNavigate();
  const [activationToken, setactivationToken] = useState("");
  const [showRegisterPage, setshowRegisterPage] = useState(true);
  const initialValue = {
    name: "",
    hostelName: "",
    city: "",
    phone: "",
    email: "",
    password: "",
  };

  const validationSchema = object().shape({
    name: string().required("Name is required"),
    hostelName: string().required("Hostel Name is required"),
    city: string().required("City is required"),
    phone: string().required("Phone is required"),
    email: string().required("Email is required"),
    password: string()
      .min(6, "Password must be atleast 6 digits")
      .required("Password is required"),
  });

  const handleRegisterForm = async (values) => {
    console.log(values);
    const response = await addData("hostels", values);
    if (response.success) {
      successToast(
        response.message ? response.message : "Hostel regsitered successfully"
      );
      setactivationToken(response.token);
      setshowRegisterPage(false);
    } else {
      errorToast(
        response.message ? response.message : "Unable to registeer the hostel"
      );
    }
  };

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

    const response = await addData("hostels/activate-hostel", {
      activationToken,
      activationCode: verificationNumber,
    });
    if (response.success) {
      successToast(
        response.message
          ? response.message
          : "hostel and user  registered successfully"
      );
      navigate("/signin");
    } else {
      errorToast(
        response.message
          ? response.message
          : "unable to  register user and hostel"
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

  return (
    <>
      {showRegisterPage && (
        <div className="max-w-md mx-auto mb-2 shadow-lg flex flex-col items-center justify-center py-4 rounded-md w-full relative  h-full top-[40vh] translate-y-[-50%] ">
          <h1 className="text-center text-4xl font-bold mb-10">
            Register Hostel
          </h1>

          <Formik
            initialValues={initialValue}
            validationSchema={validationSchema}
            onSubmit={handleRegisterForm}
          >
            {({ isSubmitting }) => {
              return (
                <Form className="w-[80%]">
                  <div className="mb-4 relative w-full">
                    <Field
                      placeholder=""
                      type="text"
                      name="name"
                      className={`w-full ${styles.input}`}
                    ></Field>
                    <label htmlFor="name" className={`${styles.label}`}>
                      Name
                    </label>
                    <ErrorMessage
                      component="div"
                      name="name"
                      className="text-red-500 absolute text-xs bottom-[-5px]"
                    />
                  </div>
                  <div className="mb-4 relative">
                    <Field
                      placeholder=""
                      type="text"
                      name="hostelName"
                      className={`w-full ${styles.input}`}
                    ></Field>
                    <label htmlFor="hostelName" className={`${styles.label}`}>
                      Hostel Name
                    </label>
                    <ErrorMessage
                      component="div"
                      name="hostelName"
                      className="text-red-500 absolute text-xs bottom-[-5px]"
                    />
                  </div>
                  <div className="mb-4 relative">
                    <Field
                      placeholder=""
                      type="text"
                      name="city"
                      className={`w-full ${styles.input}`}
                    ></Field>
                    <label htmlFor="city" className={`${styles.label}`}>
                      City
                    </label>
                    <ErrorMessage
                      component="div"
                      name="city"
                      className="text-red-500 absolute text-xs bottom-[-5px]"
                    />
                  </div>
                  <div className="mb-4 relative">
                    <Field
                      placeholder=""
                      type="text"
                      id="phone"
                      name="phone"
                      className={`w-full ${styles.input}`}
                    ></Field>
                    <label htmlFor="phone" className={`${styles.label}`}>
                      Phone
                    </label>
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-red-500 absolute text-xs bottom-[-5px]"
                    />
                  </div>
                  <div className="mb-4 relative">
                    <Field
                      placeholder=""
                      type="email"
                      id="email"
                      name="email"
                      className={`w-full ${styles.input}`}
                    ></Field>
                    <label htmlFor="email" className={`${styles.label}`}>
                      Email
                    </label>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 absolute text-xs bottom-[-5px]"
                    />
                  </div>
                  <div className="mb-4 relative">
                    <Field
                      placeholder=""
                      type="password"
                      id="password"
                      name="password"
                      className={`w-full ${styles.input}`}
                    ></Field>
                    <label htmlFor="password" className={`${styles.label}`}>
                      Password
                    </label>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 absolute text-xs bottom-[-5px]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 px-3 py-2 text-xl text-white fw-fw-bolder w-full rounded-md text-cente my-3"
                  >
                    {isSubmitting ? "creating.." : "submit"}
                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>
      )}
      {!showRegisterPage && (
        <>
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
        </>
      )}
    </>
  );
};

export default RegisterHotel;
