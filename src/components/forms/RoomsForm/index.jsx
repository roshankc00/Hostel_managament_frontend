import { ErrorMessage, Field, Form, Formik } from "formik";
import { object, string } from "yup";
import styles from "./rooms.module.css";
import ImageInput from "../../components/ImageInput";
import { useState } from "react";

const RoomsForm = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (image) => {
    setSelectedImage(image);
  };

  const initialValue = {
    name: "",
    price: "",
    description: "",
  };

  const validationSchema = object().shape({
    name: string().required("Name is required"),
    price: string().required("Price is required"),
    description: string().required("Description is required"),
  });

  const handleSubmit = (values) => {
    console.log(values);
    console.log(URL.createObjectURL(selectedImage));
  };

  return (
    <div className="max-w-md mx-auto my-2 shadow-lg flex flex-col items-center justify-center py-4 rounded-md w-full">
      <h1 className="text-center text-4xl font-semibold mb-10">Hostel Rooms</h1>
      <Formik
        initialValues={initialValue}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
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
              type="text"
              id="price"
              name="price"
              className={`w-full ${styles.input}`}
            ></Field>
            <label className={`${styles.label}`} htmlFor="price">
              Price
            </label>
            <ErrorMessage
              name="price"
              component="div"
              className="text-red-500 absolute text-xs bottom-[-5px]"
            />
          </div>

          <div className="mb-8 relative w-full">
            <Field
              as="textarea"
              rows="5"
              placeholder="Hostel Description"
              type="text"
              name="description"
              id="description"
              className="w-full border-[#ccc] border-2 rounded-md p-3 mt-2"
            ></Field>
            <ErrorMessage
              component="div"
              name="description"
              className="text-red-500 absolute text-xs bottom-[-20px]"
            />
          </div>
          {/* Image input */}
          <ImageInput onImageChange={handleImageChange} />
          {selectedImage && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Selected Image</h2>
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected"
                className="max-w-[70%] mx-auto"
              />
            </div>
          )}

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 px-3 py-2 text-lg text-white fw-fw-bolder w-full rounded-md text-center my-4"
          >
            {"Add Room"}
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default RoomsForm;
