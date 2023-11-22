import { ErrorMessage, Field, Form, Formik } from "formik";
import { object, string } from "yup";
import { addData } from "../../services/axios.service";
import { Link, useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../../services/toastify.service";
import { useDispatch } from "react-redux";
import { logedin } from "./auth.slice";
import SignInWithGoogle from "../../components/SignInWithGoogle";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // step 1
  const initialValue = {
    email: "",
    password: "",
  };

  const validationSchema = object().shape({
    email: string().required("Email field is required"),
    password: string()
      .min(6, "password must be of 6 digit")
      .required("Password field is required"),
  });

  const handleSubmit = async (values) => {
    console.log(values);
    const response = await addData("users/login", values);

    if (response.success) {
      const data = {
        token: response.token,
        role: response.role,
        userId: response.userId,
      };
      dispatch(logedin(data));
      successToast(
        response.message ? response.message : "User logged in sucessfully"
      );
      navigate("/");
    } else {
      errorToast(
        response.message ? response.message : "Unable to logged in the user"
      );
    }
  };

  return (
    <div
      className="max-w-md mx-auto mb-2 bg-white shadow-lg  flex flex-col items-center justify-center mt-[5%] py-6
    6"
    >
      <h1 className="text-center text-4xl font-bold mb-10">Login User</h1>
      <Formik
        initialValues={initialValue}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => {
          return (
            <Form>
              <div className="mb-4">
                <label htmlFor="email" className="text-[20px] font-semibold">
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
                <label htmlFor="password" className="text-[20px] font-semibold">
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
                className="bg-blue-500 hover:bg-blue-600 p-3 text-xl text-white fw-fw-bolder w-full rounded-md text-center "
              >
                {isSubmitting ? "creating...." : "Login"}
              </button>
              <div className="my-3">
                <SignInWithGoogle />
              </div>
            </Form>
          );
        }}
      </Formik>
      <div>
        <Link to="/signup" className="text-xl mt-20">
          Dont have an account? Signup
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
