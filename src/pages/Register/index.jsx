import { ErrorMessage, Field, Form, Formik } from "formik";
import { object, string } from "yup";
import styles from "./register.module.css";
import { addData } from "../../services/axios.service";

import { errorToast, successToast } from "../../services/toastify.service";
import { useNavigate } from "react-router-dom";

const RegisterHotel = () => {
  const navigate = useNavigate();
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
      navigate("/signin");
    } else {
      errorToast(
        response.message ? response.message : "Unable to registeer the hostel"
      );
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto mb-2 shadow-lg flex flex-col items-center justify-center py-4 rounded-md w-full relative  h-full top-[50vh] translate-y-[-50%] ">
        <h1 className="text-center text-4xl font-bold mb-10">
          Register Hostel
        </h1>

        <Formik
          initialValues={initialValue}
          validationSchema={validationSchema}
          onSubmit={handleRegisterForm}
        >
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
              {"Register "}
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default RegisterHotel;
