import { ErrorMessage, Field, Formik, Form } from "formik";
import { string, object } from "yup";
import { useSelector } from "react-redux";
import { postDataWithHeader } from "../../../services/axios.service";
import { successToast } from "../../../services/toastify.service";
import { useNavigate } from "react-router-dom";

const CreateFaq = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const initialState = {
    question: "",
    answer: "",
  };

  const validationSchema = object().shape({
    question: string().required("Title is required field"),
    answer: string().required("url is required field"),
  });
  const handleSubmit = async (values) => {
    console.log(values, token);
    const response = await postDataWithHeader("faqs", values, token);

    if (response.success) {
      successToast(
        response.message ? response.message : "Faq created successfully"
      );
      navigate("/superadmin/faqs");
    }
  };
  return (
    <div className="max-w-md mx-auto mb-2  shadow-lg p-10 mt-[200px] ">
      <h1 className="text-center mt-2 mb-2 text-2xl">Create Link Form</h1>
      <Formik
        initialValues={initialState}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => {
          return (
            <Form className="">
              <div className="mb-4">
                <label htmlFor="question">Question:</label>
                <Field
                  type="text"
                  name="question"
                  className="mb-2 p-2 w-full border"
                ></Field>
                <ErrorMessage
                  component="div"
                  name="question"
                  className="text-red-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="answer">Answer:</label>
                <Field
                  type="text"
                  name="answer"
                  className="mb-4 p-2 w-full border"
                ></Field>
                <ErrorMessage
                  component="div"
                  name="answer"
                  className="text-red-500"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 p-3 text-white rounded-md shadow-lg  "
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

export default CreateFaq;
