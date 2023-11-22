import { ErrorMessage, Field, Form, Formik } from "formik";
import { object, string } from "yup";
import Footer from "../../components/Footer";
import styles from "./contact.module.css";
import { addData } from "../../services/axios.service";
import { errorToast, successToast } from "../../services/toastify.service";

const ContactUs = () => {
  const initialValue = {
    name: "",
    email: "",
    comment: "",
  };

  const validationSchema = object().shape({
    name: string().required("Name is required"),
    email: string().required("Email is required"),
    comment: string().required("Comment is required"),
  });

  const handleRegisterForm = async (values) => {
    const response = await addData("contactForm", values);
    if (response.success) {
      successToast(
        response.message
          ? response.message
          : "Your message recorded successfully!"
      );
    } else {
      errorToast("Unable to record your message!");
    }
  };

  return (
    <>
      <main className="my-10">
        <div className="mb-5 max-w-[1080px] relative w-full flex mx-auto">
          <iframe
            title="Google Map"
            className="w-[90vw] h-[360px] md:h-[480px] max-w-[1080px] rounded-lg shadow-lg"
            style={{ border: 0 }}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14133.107615515763!2d85.3063157486948!3d27.677835319187974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19cbbeac9357%3A0x8f35a679609cb5b9!2sPulchowk%2C%20Lalitpur%2044600!5e0!3m2!1sen!2snp!4v1699358220052!5m2!1sen!2snp"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
        <div className="max-w-md mx-auto my-2 shadow-lg flex flex-col items-center justify-center py-4 rounded-md w-full">
          <h1 className="text-center text-4xl font-semibold mb-10">
            Contact Us
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
                <label className={`${styles.label}`} htmlFor="name">
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
                  type="email"
                  id="email"
                  name="email"
                  className={`w-full ${styles.input}`}
                ></Field>
                <label className={`${styles.label}`} htmlFor="email">
                  Email
                </label>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 absolute text-xs bottom-[-5px]"
                />
              </div>

              <div className="mb-4 relative w-full">
                <Field
                  as="textarea"
                  rows="5"
                  placeholder="Your Message"
                  type="text"
                  name="comment"
                  id="comment"
                  className="w-full border-[#ccc] border-2 rounded-md p-3 mt-2"
                ></Field>
                <ErrorMessage
                  component="div"
                  name="comment"
                  className="text-red-500 absolute text-xs bottom-[-20px]"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 px-3 py-2 text-lg text-white fw-fw-bolder w-full rounded-md text-center my-4"
              >
                {"Send Message"}
              </button>
            </Form>
          </Formik>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ContactUs;
