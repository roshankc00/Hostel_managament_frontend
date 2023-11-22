import { ErrorMessage, Field, Form, Formik } from "formik";
import { object, string } from "yup";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./bookform.module.css";
import { errorToast, successToast } from "../../../services/toastify.service";
import { postDataWithHeader } from "../../../services/axios.service";

const BookForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);
  const initialValue = {
    phone: "",
  };

  // const { id } = useParams();
  const validationSchema = object().shape({
    phone: string().required("Phone Number is required"),
  });

  const handleRegisterForm = async (values) => {
    if (!token) {
      errorToast("Please Login First");
      navigate("/signin");
      return;
    } else {
      const data = { ...values, hostelId: id };
      const response = await postDataWithHeader("orders", data, token);
      console.log(response, "sknsjdnjsdnjsnd");
      if (response.success) {
        successToast("Order placed successfully");
        navigate("/");
      } else {
        errorToast(
          response.message ? response.message : "Unable to place order!"
        );
        navigate("/");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto my-2 shadow-lg flex flex-col items-center justify-center py-4 rounded-md w-full">
      <h1 className="text-center text-4xl font-semibold mb-10">Book Now</h1>
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
              name="phone"
              className={`w-full ${styles.input}`}
            ></Field>
            <label htmlFor="phone" className={`${styles.label}`}>
              Phone
            </label>
            <ErrorMessage
              component="div"
              name="phone"
              className="text-red-500 absolute text-xs bottom-[-5px]"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 px-3 py-2 text-lg text-white fw-fw-bolder w-full rounded-md text-cente my-4"
          >
            {"Book Now"}
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default BookForm;
