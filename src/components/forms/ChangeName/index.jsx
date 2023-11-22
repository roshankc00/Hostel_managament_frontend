import { ErrorMessage, Field, Form, Formik } from "formik";
import { useSelector } from "react-redux";
import { object, string } from "yup";
import { updateDataWithHeader } from "../../../services/axios.service";
import { errorToast, successToast } from "../../../services/toastify.service";

const ChangeName = (prop) => {
  const { token } = useSelector((state) => state.auth);

  const initialValue = {
    newName: "",
  };
  const validationSchema = object().shape({
    newName: string().required("new Name field is required"),
  });
  const handleChangeNameSubmit = async (values) => {
    const response = await updateDataWithHeader("reset-name", values, token);
    console.log(response);
    if (response.success) {
      prop.handleCloseName();
      successToast(
        response.message ? response.message : "Username changed successfully"
      );
    } else {
      errorToast("Unable to change the User name");
    }
  };
  return (
    <div className="max-w-md mx-auto mb-2  p-5">
      <Formik
        initialValues={initialValue}
        validationSchema={validationSchema}
        onSubmit={handleChangeNameSubmit}
      >
        {({ isSubmitting }) => {
          return (
            <Form>
              <div className="mb-4">
                <label htmlFor="newName">New Name:</label>
                <Field
                  type="text"
                  name="newName"
                  className="mb-4 p-2 w-full border"
                ></Field>
                <ErrorMessage
                  component="div"
                  name="newName"
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

export default ChangeName;
