import React, { useEffect, useRef, useState } from "react";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

const Verification = () => {
  const navigate = useNavigate();
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
    }
    console.log(verificationNumber);
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
  );
};

export default Verification;
