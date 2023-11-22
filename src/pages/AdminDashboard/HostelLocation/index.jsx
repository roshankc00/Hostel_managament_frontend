import { FaArrowLeft } from "react-icons/fa";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { object, string } from "yup";
import { useState } from "react";
import "./location.module.css";
import { useSelector } from "react-redux";
import { getData, updateDataWithHeader } from "../../../services/axios.service";
import { successToast } from "../../../services/toastify.service";

const HostelLocation = () => {
  const [editForm, setEditForm] = useState(false);
  const [details, setDetails] = useState({});
  const { token } = useSelector((state) => state.auth);

  // Get hostel Details
  const getHostelDetails = async (id) => {
    const response = await getData(`hostels/${id}`, token);
    console.log(response);

    setDetails(response);
  };
  useState(() => {
    getHostelDetails("65350ac7d1df3a00f85edea2");
  }, []);

  // Edit hostel details
  const editHostelDetails = async (values) => {
    const updateData = {
      description: values.description,
      longitude: values.longitude,
      latitude: values.latitude,
      location: {
        city: values.city,
        localLocation: values.localLocation,
      },
    };
    const response = await updateDataWithHeader(
      `hostels/65350ac7d1df3a00f85edea2`,
      updateData,
      token
    );
    if (response.success) {
      console.log(response);
      setDetails({ success: response.success, hostel: response.updHostel });
      successToast("Details Updated Successfully!");
      setEditForm(false);
    }
  };

  // Formik Validation

  const validationSchema = object().shape({
    description: string().required("Description is required"),
    longitude: string().required("Longitude is required"),
    latitude: string().required("Latitude is required"),
    city: string().required("City is required"),
    localLocation: string().required("Local Location is required"),
  });

  return (
    <div className="flex flex-col gap-[3rem] max-w-[768px]">
      <div className="sm:mx-[3rem] mx-2">
        <h1 className="text-center text-2xl font-semibold">Hostel Details</h1>
        {!details && (
          <p className="mx-[3rem]">Enter your hostel&apos;s details here:</p>
        )}
      </div>

      {/* Location Details */}
      {details.success && (
        <div className="sm:mx-[3rem] mx-2">
          <div>
            <div>Description:</div>
            <div>{details?.hostel?.description}</div>
            <hr className="my-2" />
          </div>
          <div>
            <div>Longitude:</div>
            <div>{details?.hostel?.longitude}</div>
            <hr className="my-2" />
          </div>
          <div>
            <div>Latitude:</div>
            <div>{details?.hostel?.latitude}</div>
            <hr className="my-2" />
          </div>
          <div>
            <div>City:</div>
            <div>{details?.hostel?.location?.city}</div>
            <hr className="my-2" />
          </div>
          <div>
            <div>Street Address:</div>
            <div>{details?.hostel?.location?.localLocation}</div>
            <hr className="my-2" />
          </div>
          <div className="m-4 flex">
            <button
              className="text-white mx-auto px-8 py-2 bg-[#2563eb] rounded-[5rem] hover:bg-[#2a55b3]"
              onClick={() => {
                setEditForm(true);
              }}
            >
              Edit your details
            </button>
          </div>
        </div>
      )}

      {editForm && details.success && (
        <div className="fixed bg-black/[0.85] z-[1000] h-[100vh] top-0 left-0 w-[100vw]">
          <div className="flex items-center flex-col gap-4 justify-center h-full max-w-[768px] mx-auto">
            <button
              onClick={() => {
                setEditForm(false);
              }}
              className="text-white mr-auto px-4 flex gap-2 items-center justify-center"
            >
              <FaArrowLeft />
              Back
            </button>

            <div className="max-w-md mx-auto bg-white mb-2 shadow-lg flex flex-col items-center justify-center py-4 rounded-md w-[100vw]">
              <h1 className="text-center mb-2 text-2xl font-bold">
                Edit Hostel Details
              </h1>

              <Formik
                initialValues={{
                  description: details?.hostel?.description,
                  longitude: details?.hostel?.longitude,
                  latitude: details?.hostel?.latitude,
                  city: details?.hostel?.location?.city,
                  localLocation: details?.hostel?.location?.localLocation,
                }}
                validationSchema={validationSchema}
                onSubmit={editHostelDetails}
              >
                {({ values, isSubmitting }) => {
                  return (
                    <Form className="w-[80%]">
                      <div className="mb-2 relative w-full">
                        <label className="block" htmlFor="description">
                          Description:
                        </label>
                        <Field
                          as="textarea"
                          rows="2"
                          type="text"
                          name="description"
                          value={values?.description}
                          id="description"
                          className="w-full border-[#ccc] border-2 rounded-md p-2 mt-2"
                        ></Field>

                        <ErrorMessage
                          component="div"
                          name="description"
                          className="text-red-500 absolute text-xs bottom-[-15px]"
                        />
                      </div>
                      <div className="mb-2 relative w-full">
                        <label className="block  mb-2" htmlFor="longitude">
                          Longitude:
                        </label>
                        <Field
                          type="text"
                          name="longitude"
                          value={values?.longitude}
                          className="w-full"
                        ></Field>
                        <ErrorMessage
                          component="div"
                          name="longitude"
                          className="text-red-500 absolute text-xs bottom-[-5px]"
                        />
                      </div>
                      <div className="mb-2 relative">
                        <label className="block  mb-2" htmlFor="latitude">
                          Latitude:
                        </label>
                        <Field
                          type="text"
                          name="latitude"
                          value={values?.latitude}
                          className="w-full"
                        ></Field>
                        <ErrorMessage
                          component="div"
                          name="latitude"
                          className="text-red-500 absolute text-xs bottom-[-5px]"
                        />
                      </div>
                      <div className="mb-2 relative">
                        <label className="block mb-2" htmlFor="city">
                          Lity:
                        </label>
                        <Field
                          type="text"
                          name="city"
                          value={values?.city}
                          className="w-full"
                        ></Field>
                        <ErrorMessage
                          component="div"
                          name="city"
                          className="text-red-500 absolute text-xs bottom-[-5px]"
                        />
                      </div>
                      <div className="mb-2 relative">
                        <label className="block mb-2" htmlFor="localLocation">
                          Local Location:
                        </label>
                        <Field
                          type="text"
                          value={values?.localLocation}
                          name="localLocation"
                          className="w-full"
                        ></Field>
                        <ErrorMessage
                          component="div"
                          name="localLocation"
                          className="text-red-500 absolute text-xs bottom-[-5px]"
                        />
                      </div>

                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 px-3 py-2 text-lg text-white fw-fw-bolder w-full rounded-md text-cente"
                      >
                        {isSubmitting ? "Updating..." : "Edit Details"}
                      </button>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HostelLocation;
