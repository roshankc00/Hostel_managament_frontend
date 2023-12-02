import { ErrorMessage, Field, Form, Formik } from "formik";
import { object, string } from "yup";
import styles from "./rules.module.css";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import {
  deleteData,
  postDataWithHeader,
  updateDataWithHeader,
} from "../../../services/axios.service";
import { Button } from "@mui/material";
import { errorToast, successToast } from "../../../services/toastify.service";

const Rules = () => {
  const [showForm, setShowForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [allRules, setAllRules] = useState([]);
  const { token, hostelId } = useSelector((state) => state.auth);

  // Formik Validation
  const initialValue = {
    title: "",
  };

  const validationSchema = object().shape({
    title: string().required("This field is required"),
  });
  //getrules
  const getRules = async () => {
    const response = await postDataWithHeader(
      "rules-hostel",
      { hostelId },
      token
    );
    if (response.success) {
      setAllRules(response.rules);
    }
  };
  useEffect(() => {
    getRules();
  }, []);

  const handleSubmit = async (values) => {
    console.log(values);
    const response = await postDataWithHeader(
      "rules",
      { title: values.title, hostelId },
      token
    );
    if (response.success) {
      allRules.push(response.rule);
      setShowForm(false);
      successToast(
        response.message ? response.message : "Rule added successfully!"
      );
    } else {
      setShowForm(false);
      errorToast(
        response.message ? response.message : "Unable to add the Rule !"
      );
    }
  };

  const handleDeleteTime = async (id) => {
    const response = await deleteData(`rules/${id}`, token);
    if (response.success) {
      const updatedRules = allRules.filter((rule) => rule._id !== id);
      setAllRules(updatedRules);
      successToast(
        response.message ? response.message : "Rules Deleted Successfully"
      );
    }
  };

  const handleEdit = async (id) => {
    setUpdateId(id);
    setShowUpdateForm(true);
  };

  const handleUpdateRule = async (values) => {
    const response = await updateDataWithHeader(
      `rules/${updateId}`,
      {
        title: values?.title,
        hostelId,
      },
      token
    );
    if (response.success) {
      allRules.map((rule) => {
        if (rule._id === updateId) {
          rule.title = values?.title;
        }
        return rule;
      });
      setShowUpdateForm(false);
      successToast(
        response.message ? response.message : "Rules Updated Successfully!"
      );
    }
  };

  return (
    <main className="mt-4 mb-[10rem] flex items-right justify-center sm:justify-end">
      <div className="max-w-[1080px] min-w-[360px] w-[50vw] relative sm:mr-[10vw] mr-0">
        <h1 className="text-center font-semibold text-2xl mb-2">
          Hostel Rules
        </h1>
        <Button
          variant="contained"
          sx={{ width: "10rem", margin: "20px 0" }}
          onClick={() => {
            setShowForm(true);
          }}
        >
          Add New Rule
        </Button>
        <div className="flex flex-col gap-4">
          {allRules &&
            allRules.map((rule) => {
              return (
                <div
                  key={rule?._id}
                  className="border-2 shadow-xl flex items-center justify-between px-8 py-4 rounded-lg gap-2"
                >
                  <p>{rule?.title}</p>
                  <div className="flex items-center justify-center gap-4">
                    <FaTrash
                      className="cursor-pointer w-[1.4rem] h-[1.4rem]"
                      color="red"
                      onClick={() => handleDeleteTime(rule._id)}
                    />
                    <MdEdit
                      className="cursor-pointer w-[1.4rem] h-[1.4rem]"
                      onClick={() => {
                        handleEdit(rule._id);
                      }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {showForm && (
        <div className="fixed bg-black/[0.85] top-form h-[100vh] top-0 left-0 w-[100vw]">
          <div className="flex items-center flex-col gap-8 justify-center h-full max-w-[768px] mx-auto">
            <button
              onClick={() => {
                setShowForm(false);
              }}
              className="text-white mr-auto px-4 flex gap-2 items-center justify-center"
            >
              <FaArrowLeft />
              Back
            </button>

            <div className="max-w-md mx-auto bg-white mb-2 shadow-lg flex flex-col items-center justify-center py-4 rounded-md w-[100vw]">
              <h1 className="text-center text-2xl font-bold mb-10">Rules</h1>

              <Formik
                initialValues={initialValue}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => {
                  return (
                    <Form className="w-[80%]">
                      <div className="mb-6 relative">
                        <Field
                          placeholder=""
                          as="textarea"
                          rows="3"
                          type="text"
                          name="title"
                          className={`w-full ${styles.input}`}
                        ></Field>
                        <label htmlFor="title" className={`${styles.label}`}>
                          Rule
                        </label>
                        <ErrorMessage
                          component="div"
                          name="title"
                          className="text-red-500 absolute text-xs bottom-[-5px]"
                        />
                      </div>

                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 px-3 py-2 text-lg text-white fw-fw-bolder w-full rounded-md text-cente my-3"
                      >
                        {isSubmitting ? "Adding..." : "Add to Rules"}
                      </button>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      )}
      {showUpdateForm && (
        <div className="fixed bg-black/[0.85] top-form h-[100vh] top-0 left-0 w-[100vw]">
          <div className="flex items-center flex-col gap-8 justify-center h-full max-w-[768px] mx-auto">
            <button
              onClick={() => {
                setShowUpdateForm(false);
              }}
              className="text-white mr-auto px-4 flex gap-2 items-center justify-center"
            >
              <FaArrowLeft />
              Back
            </button>

            <div className="max-w-md mx-auto bg-white mb-2 shadow-lg flex flex-col items-center justify-center py-4 rounded-md w-[100vw]">
              <h1 className="text-center text-2xl font-bold mb-10">
                Update Rules
              </h1>

              <Formik
                initialValues={allRules.find((rule) => rule._id === updateId)}
                validationSchema={validationSchema}
                onSubmit={handleUpdateRule}
              >
                {({ values, isSubmitting }) => {
                  return (
                    <Form className="w-[80%]">
                      <div className="mb-6 relative">
                        <Field
                          placeholder=""
                          as="textarea"
                          rows="3"
                          type="text"
                          name="title"
                          value={values?.title}
                          className={`w-full ${styles.input}`}
                        ></Field>
                        <label htmlFor="title" className={`${styles.label}`}>
                          Rule
                        </label>
                        <ErrorMessage
                          component="div"
                          name="title"
                          className="text-red-500 absolute text-xs bottom-[-5px]"
                        />
                      </div>

                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 px-3 py-2 text-lg text-white fw-fw-bolder w-full rounded-md text-cente my-3"
                      >
                        {isSubmitting ? "Updating..." : "Update Rule"}
                      </button>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Rules;
