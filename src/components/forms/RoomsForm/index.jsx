import { ErrorMessage, Field, Form, Formik } from "formik";
import { object, string } from "yup";
import styles from "./rooms.module.css";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { postDataWithHeader } from "../../../services/axios.service";
import { errorToast, successToast } from "../../../services/toastify.service";

const RoomsForm = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setimage] = useState({});
  const { hostelId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleImageChange = (image) => {
    setSelectedImage(image);
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    handleImageChange(file);
    setimage(file);
    console.log(image);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

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

  const handleSubmit = async (values) => {
    if (!image) {
      errorToast("Image field is required");
      return;
    }
    console.log(values);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("description", values.description);
    formData.append("hostelId", hostelId);
    formData.append("image", image);
    const response = await postDataWithHeader("room-hostel", formData, token);
    console.log(response);
    if (response.success) {
      navigate("/admin/room-category");
      successToast(
        response.message ? response.message : "Room Added Successfully"
      );
    } else {
      navigate("/admin/room-category");
      errorToast(response.message ? response.message : "Unable to add room");
    }
  };

  return (
    <div className="max-w-md mx-auto my-2 shadow-lg flex flex-col items-center justify-center py-4 rounded-md w-full">
      <h1 className="text-center text-4xl font-semibold mb-10">Hostel Rooms</h1>
      <Formik
        initialValues={initialValue}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => {
          console.log(isSubmitting);
          return (
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
              {/* <ImageInput onImageChange={handleImageChange} /> */}
              <div
                {...getRootProps()}
                className="border-dashed border-2 px-4 py-8 rounded-md text-center cursor-pointer"
              >
                <input {...getInputProps()} />
                <p className="text-gray-500">
                  Drag and drop <br />
                  or select image
                </p>
              </div>
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
                {isSubmitting ? "Submitting..." : "Add Room"}
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default RoomsForm;
