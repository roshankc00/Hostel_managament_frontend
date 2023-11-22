import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { object, string } from "yup";
import { logedOut } from "../../../pages/signin/auth.slice";
import { updateDataWithHeader } from "../../../services/axios.service";
import { errorToast, successToast } from "../../../services/toastify.service";

const ChangePassword = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const initialValue = {
    oldPassword: "",
    newPassword: "",
  };
  const validationSchema = object().shape({
    oldPassword: string().required("old Password field is required"),
    newPassword: string()
      .required("new Password field is required")
      .min(6, "Password must be of atleast 6 Charecter"),
  });
  const handleContactSubmit = async (values) => {
    const response = await updateDataWithHeader(
      "reset-password",
      values,
      token
    );

    if (response.success) {
      dispatch(logedOut());
      successToast(
        response.message
          ? response.message
          : "User password updated successfully"
      );
    } else {
      errorToast(
        response.message
          ? response.message
          : "Unable to update the user password"
      );
    }
  };
  return (
    <div className="max-w-md mx-auto mb-2 mt-10">
      <Formik
        initialValues={initialValue}
        validationSchema={validationSchema}
        onSubmit={handleContactSubmit}
      >
        {({ isSubmitting }) => {
          return (
            <Form>
              <div className="mb-4">
                <label htmlFor="oldPassword">Old Password:</label>
                <Field
                  type="text"
                  name="oldPassword"
                  className="mb-2 p-2 w-full border"
                ></Field>
                <ErrorMessage
                  component="div"
                  name="oldPassword"
                  className="text-red-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="newPassword">New Password:</label>
                <Field
                  type="text"
                  name="newPassword"
                  className="mb-4 p-2 w-full border"
                ></Field>
                <ErrorMessage
                  component="div"
                  name="newPassword"
                  className="text-red-500"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-md p-2"
              >
                {isSubmitting ? "creating.." : "submit"}
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ChangePassword;
