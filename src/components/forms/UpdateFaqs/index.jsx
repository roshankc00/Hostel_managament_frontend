import { ErrorMessage, Field, Formik, Form } from "formik";
import { string, object } from "yup";
import { useSelector } from "react-redux";
import {
  getDataWithoutHeader,
  updateDataWithHeader,
} from "../../../services/axios.service";
import { errorToast, successToast } from "../../../services/toastify.service";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const UpdateFaq = () => {
  const navigate = useNavigate();
  const [data, setdata] = useState({});
  const { token } = useSelector((state) => state.auth);
  const { id } = useParams();
  const validationSchema = object().shape({
    question: string().required("Title is required field"),
    answer: string().required("url is required field"),
  });

  const getUpdatedFaqData = async () => {
    const response = await getDataWithoutHeader(`faqs/${id}`);
    console.log(response, "wowowo");

    if (response.success) {
      setdata(response);
    }
  };

  useEffect(() => {
    getUpdatedFaqData();
  }, []);

  const handleSubmit = async (values) => {
    console.log(values, token);
    const response = await updateDataWithHeader(`faqs/${id}`, values, token);
    console.log(response);

    if (response.success) {
      successToast(
        response.message ? response.message : "Faq updated successfully"
      );
      navigate("/superadmin/faqs");
    } else {
      errorToast(
        response.message ? response.message : "unable to update the faq"
      );
    }
  };
  return (
    <div className="max-w-md mx-auto mb-2  shadow-lg p-10 mt-[200px] ">
      <h1 className="text-center mt-2 mb-2 text-2xl">Update Faq Form</h1>
      {data.success && (
        <Formik
          initialValues={{
            question: data.faq.question,
            answer: data.faq.answer,
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ isSubmitting, values }) => {
            return (
              <Form className="">
                <div className="mb-4">
                  <label htmlFor="question">Question:</label>
                  <Field
                    type="text"
                    name="question"
                    value={values.question}
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
                    value={values.answer}
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
      )}
    </div>
  );
};

export default UpdateFaq;
