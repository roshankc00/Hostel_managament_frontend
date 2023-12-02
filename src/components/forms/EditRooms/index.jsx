import { ErrorMessage, Field, Form, Formik } from "formik";
import { number, object, string } from "yup";
import "./edit-room.css";
import { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getDataWithoutHeader,
  postDataWithHeader,
  updateDataWithHeader,
} from "../../../services/axios.service";
import { errorToast, successToast } from "../../../services/toastify.service";
import { Button } from "@mui/material";

const EditRoomForm = () => {
  const navigate = useNavigate();
  const [hostelDetail, sethostelDetail] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setimage] = useState({});
  const [showUploadImage, setshowUploadImage] = useState(false);
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);

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

  const getData = async () => {
    const response = await getDataWithoutHeader(`room-hostel/${id}`);
    console.log(response);
    sethostelDetail(response);
  };

  useEffect(() => {
    getData();
  }, []);
  const initialValue = {
    name: "",
    price: "",
    description: "",
    totalRooms: "",
    totalVacentRooms: "",
  };

  const validationSchema = object().shape({
    name: string().required("Name is required"),
    price: string().required("Price is required"),
    description: string().required("Description is required"),
    totalVacentRooms: number().required("Total vacent room field is requried"),
    totalRooms: number().required("Total  rooms field is requried"),
  });

  const handleSubmit = async (values) => {
    if (showUploadImage) {
      if (image) {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("price", values.price);
        formData.append("description", values.description);
        formData.append("totalRooms", values.totalRooms);
        formData.append("totalVacentRooms", values.totalVacentRooms);
        formData.append("uploadImage", true);
        formData.append("image", image);
        const response = await updateDataWithHeader(
          `room-hostel/${id}`,
          formData,
          token
        );
        if (response.success) {
          successToast(
            response.message
              ? response.message
              : "Hostel Room updated successfully"
          );
          navigate("/admin/room-category");
        } else {
          navigate("/admin/room-category");
          errorToast(
            response.message
              ? response.message
              : "Hostel room updated successfully"
          );
        }
      } else {
        errorToast("image field is required");
      }
    }

    console.log(showUploadImage);

    if (!showUploadImage) {
      const data = { ...values, uploadImage: false };
      const response = await updateDataWithHeader(
        `room-hostel/${id}`,
        data,
        token
      );

      if (response.success) {
        response.message
          ? response.message
          : "Hostel room updated successfully";
        navigate("/admin/room-category");
      } else {
        navigate("/admin/room-category");
        errorToast(
          response.message
            ? response.message
            : "Hostel room updated successfully"
        );
      }
    }
  };

  return (
    <div className="max-w-md mx-auto my-2 shadow-lg flex flex-col items-center justify-center py-4 rounded-md w-full">
      <h1 className="text-center text-4xl font-semibold mb-10">Hostel Rooms</h1>
      {hostelDetail?.success && (
        <Formik
          initialValues={{
            name: hostelDetail.room.name,
            price: hostelDetail.room.price,
            description: hostelDetail.room.description,
            totalRooms: hostelDetail.room.totalRooms,
            totalVacentRooms: hostelDetail.room.totalVacentRooms,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values }) => {
            return (
              <Form className="w-[80%]">
                <div className="mb-4 relative w-full">
                  <Field
                    placeholder=""
                    type="text"
                    name="name"
                    value={values.name}
                    className={`w-full input`}
                  ></Field>
                  <label className={`label`} htmlFor="name">
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
                    value={values.price}
                    className={`w-full input`}
                  ></Field>
                  <label className={`label`} htmlFor="price">
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
                    value={values.description}
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

                {!showUploadImage && (
                  <div className="flex justify-center">
                    <Button
                      variant="contained"
                      onClick={() => setshowUploadImage(true)}
                    >
                      click here to change the picture
                    </Button>
                  </div>
                )}

                {showUploadImage && (
                  <div>
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
                        <h2 className="text-xl font-semibold mb-2">
                          Selected Image
                        </h2>
                        <img
                          src={URL.createObjectURL(selectedImage)}
                          alt="Selected"
                          className="max-w-[70%] mx-auto"
                        />
                      </div>
                    )}
                  </div>
                )}
                <div className="mb-4 relative w-full mt-10">
                  <Field
                    placeholder=""
                    type="number"
                    name="totalRooms"
                    value={values.totalRooms}
                    className={`w-full input`}
                  ></Field>
                  <label className={`label`} htmlFor="totalRooms">
                    TotalRooms
                  </label>
                  <ErrorMessage
                    component="div"
                    name="totalRooms"
                    className="text-red-500 absolute text-xs bottom-[-5px]"
                  />
                </div>

                <div className="mb-4 relative w-full">
                  <Field
                    placeholder=""
                    type="number"
                    name="totalVacentRooms"
                    value={values.totalVacentRooms}
                    className={`w-full input`}
                  ></Field>
                  <label className={`label`} htmlFor="totalVacentRooms">
                    Total Vacent Rooms
                  </label>
                  <ErrorMessage
                    component="div"
                    name="totalVacentRooms"
                    className="text-red-500 absolute text-xs bottom-[-5px]"
                  />
                </div>

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
      )}
    </div>
  );
};

export default EditRoomForm;
