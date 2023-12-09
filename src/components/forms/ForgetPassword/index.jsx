import { ErrorMessage, Field, Form, Formik } from "formik";
import { useSelector } from "react-redux";
import { object, string } from "yup";
import { addData, updateDataWithHeader } from "../../../services/axios.service";
import { errorToast, successToast } from "../../../services/toastify.service";
import { useRef, useState } from "react";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [forgetToken, setforgetToken] = useState("");
  const [showForgetPassword, setshowForgetPassword] = useState(true);
  const initialValue = {
    email: "",
  };
  const validationSchema = object().shape({
    email: string()
      .email("Enter the valid email")
      .required("Email field is required"),
  });
  const handleSubmit = async (values) => {
    console.log(values);
    const response = await addData("forget-password", values);
    if (response.success) {
      setforgetToken(response.token);
      successToast(response.message ? response.message : "check you mail");
      setshowForgetPassword(false);
    } else {
      errorToast(
        response.message ? response.message : "unable to change the password"
      );
    }
  };

  const handleSubmitFogetPassword = async (values) => {
    if (values.password !== values.confirmPassword) {
      return errorToast("Password and confirm password doesnt match");
    }
    if (values.forgetCode.length !== 4) {
      return errorToast("Enter the valid token");
    }
    const response = await addData("reset-forget-password", {
      newPassword: values.password,
      forgetCode: values.forgetCode,
      forgetToken,
    });
    if (response.success) {
      successToast(
        response.message ? response.message : "Password changed successfully"
      );
      navigate("/signin");
    } else {
      errorToast(
        response.message ? response.message : "unable to change the password"
      );
    }
  };

  const validationSchemaForgetPassword = object().shape({
    Password: string().min(6, "Password must be of atleast 6 charecter"),
    confirmPassword: string().min(6, "Password must be of atleast 6 charecter"),
    forgetCode: string().min(4, "mailed token  must be of atleast 4 charecter"),
  });
  return (
    <>
      {showForgetPassword && (
        <div className="max-w-md mx-auto mb-2  p-5">
          <Formik
            initialValues={initialValue}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => {
              return (
                <Form>
                  <div className="mb-4">
                    <label htmlFor="email">Email:</label>
                    <Field
                      type="text"
                      name="email"
                      className="mb-4 p-2 w-full border"
                    ></Field>
                    <ErrorMessage
                      component="div"
                      name="email"
                      className="text-red-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white rounded-md p-2 w-full"
                  >
                    {isSubmitting ? "creating.." : "submit"}
                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>
      )}

      {!showForgetPassword && (
        <>
          <div className="max-w-md mx-auto mb-2  p-5">
            <Formik
              initialValues={{
                password: "",
                confirmPassword: "",
                forgetCode: "",
              }}
              validationSchema={validationSchemaForgetPassword}
              onSubmit={handleSubmitFogetPassword}
            >
              {({ isSubmitting }) => {
                return (
                  <Form>
                    <div className="mb-4">
                      <label htmlFor="email">Mail token:</label>
                      <Field
                        type="text"
                        name="forgetCode"
                        className="mb-4 p-2 w-full border"
                      ></Field>
                      <ErrorMessage
                        component="div"
                        name="forgetCode"
                        className="text-red-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="email">Password:</label>
                      <Field
                        type="password"
                        name="password"
                        className="mb-4 p-2 w-full border"
                      ></Field>
                      <ErrorMessage
                        component="div"
                        name="password"
                        className="text-red-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="email">Confirm Password:</label>
                      <Field
                        type="password"
                        name="confirmPassword"
                        className="mb-4 p-2 w-full border"
                      ></Field>
                      <ErrorMessage
                        component="div"
                        name="confirmPassword"
                        className="text-red-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white rounded-md p-2 w-full"
                    >
                      {isSubmitting ? "creating.." : "submit"}
                    </button>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </>
      )}
    </>
  );
};

export default ForgetPassword;
