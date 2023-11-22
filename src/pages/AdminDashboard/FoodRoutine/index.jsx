import { FaTrash, FaEdit, FaArrowLeft } from "react-icons/fa";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { object, string } from "yup";
import { useEffect, useState } from "react";
import "./food.module.css";
import {
  addData,
  deleteData,
  postDataWithHeader,
  updateDataWithHeader,
} from "../../../services/axios.service";
import { useSelector } from "react-redux";
import { successToast } from "../../../services/toastify.service";
import { Button } from "@mui/material";

const FoodRoutine = () => {
  // State Management
  const [showForm, setShowForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [allFood, setallFood] = useState([]);
  const [category, setCategory] = useState("");
  const [updateId, setUpdateId] = useState("");
  const { token } = useSelector((state) => state.auth);

  // get hostel details
  const getAllFoodItems = async () => {
    const response = await addData(`time-hostel`, {
      hostelId: "65350ac7d1df3a00f85edea2",
    });
    if (response.success) {
      setallFood(response.times);
    }
  };

  useEffect(() => {
    getAllFoodItems();
  }, []);

  // Formik Validation
  const initialValue = {
    title: "",
    time: "",
  };

  const validationSchema = object().shape({
    title: string().required("Food Name is required"),
    time: string().required("Time is required"),
  });

  // handle create time function
  const handleCreateTime = async (values) => {
    const data = {
      ...values,
      category: category,
      hostelId: "65350ac7d1df3a00f85edea2",
    };
    const response = await postDataWithHeader("time", data, token);
    if (response.success) {
      allFood.push(data);
      setShowForm(false);
      successToast(response.message);
    }
  };

  // handle delete time function
  const handleDeleteTime = async (id) => {
    const response = await deleteData(`time/${id}`, token);
    if (response.success) {
      const updatedFood = allFood.filter((item) => item._id !== id);
      setallFood(updatedFood);
      successToast(response.message);
    }
  };

  // handle Edit
  const handleEdit = async (id) => {
    setUpdateId(id);
    setShowUpdateForm(true);
  };

  // handle update time function
  const handleUpdateTime = async (data) => {
    const response = await updateDataWithHeader(
      `time/${updateId}`,
      {
        title: data?.title,
        time: data?.time,
        category: category,
      },
      token
    );
    if (response.success) {
      allFood.map((food) => {
        if (food._id === updateId) {
          food.title = data?.title;
          food.time = data?.time;
        }
        return food;
      });
      setShowUpdateForm(false);
      successToast("Food Updated Successfully!");
    }
  };

  return (
    <main className="max-w-[1080px] mx-auto mt-4 mb-[10rem]">
      <div className="relative">
        <h1 className="text-center font-semibold text-2xl mb-2">
          Food Routine
        </h1>
        <div className="flex flex-col max-w-[768px] mx-auto mt-2">
          {/* Sunday Food Items */}
          <h1 className="text-xl mt-5">Category: Sunday</h1>
          <Button
            variant="contained"
            sx={{ width: "10rem", margin: "20px 0" }}
            onClick={() => {
              setShowForm(true);
              setCategory("sunday");
            }}
          >
            Add New Item
          </Button>
          <div className="grid grid-cols-3 font-semibold">
            <div className="text-center">Time</div>
            <div className="text-center">Food Name</div>
            <div className="text-center">Actions</div>
          </div>
          {allFood &&
            allFood.map((food) => {
              if (food.category === "sunday") {
                return (
                  <div key={food._id} className="relative">
                    <hr className="m-2" />
                    <div className="grid grid-cols-3">
                      <div className="text-center">{food?.time}</div>
                      <div className="text-center">{food?.title}</div>
                      <div className="flex items-center justify-center gap-4">
                        <FaTrash
                          className="cursor-pointer w-[1.4rem] h-[1.4rem]"
                          onClick={() => handleDeleteTime(food._id)}
                        />
                        <FaEdit
                          className="cursor-pointer w-[1.4rem] h-[1.4rem]"
                          onClick={() => {
                            setCategory("sunday");
                            handleEdit(food._id);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              }
            })}

          {/* Monday food Items */}
          <h1 className="text-xl mt-5">Category: Monday</h1>
          <Button
            variant="contained"
            sx={{ width: "10rem", margin: "20px 0" }}
            onClick={() => {
              setShowForm(true);
              setCategory("monday");
            }}
          >
            Add New Item
          </Button>
          <div className="grid grid-cols-3 font-semibold">
            <div className="text-center">Time</div>
            <div className="text-center">Food Name</div>
            <div className="text-center">Actions</div>
          </div>
          {allFood &&
            allFood.map((food) => {
              if (food.category === "monday") {
                return (
                  <div key={food._id} className="relative">
                    <hr className="m-2" />
                    <div className="grid grid-cols-3">
                      <div className="text-center">{food?.time}</div>
                      <div className="text-center">{food?.title}</div>
                      <div className="flex items-center justify-center gap-4">
                        <FaTrash
                          className="cursor-pointer w-[1.4rem] h-[1.4rem]"
                          onClick={() => handleDeleteTime(food._id)}
                        />
                        <FaEdit
                          className="cursor-pointer w-[1.4rem] h-[1.4rem]"
                          onClick={() => {
                            setCategory("monday");
                            handleEdit(food._id);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              }
            })}

          {/* Tuesday Food Items */}
          <h1 className="text-xl mt-5">Category: Tuesday</h1>
          <Button
            variant="contained"
            sx={{ width: "10rem", margin: "20px 0" }}
            onClick={() => {
              setShowForm(true);
              setCategory("tuesday");
            }}
          >
            Add New Item
          </Button>
          <div className="grid grid-cols-3 font-semibold">
            <div className="text-center">Time</div>
            <div className="text-center">Food Name</div>
            <div className="text-center">Actions</div>
          </div>
          {allFood &&
            allFood.map((food) => {
              if (food.category === "tuesday") {
                return (
                  <div key={food._id} className="relative">
                    <hr className="m-2" />
                    <div className="grid grid-cols-3">
                      <div className="text-center">{food?.time}</div>
                      <div className="text-center">{food?.title}</div>
                      <div className="flex items-center justify-center gap-4">
                        <FaTrash
                          className="cursor-pointer w-[1.4rem] h-[1.4rem]"
                          onClick={() => handleDeleteTime(food._id)}
                        />
                        <FaEdit
                          className="cursor-pointer w-[1.4rem] h-[1.4rem]"
                          onClick={() => {
                            setCategory("tuesday");
                            handleEdit(food._id);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              }
            })}

          {/* Wednesday Food Items */}
          <h1 className="text-xl mt-5">Category: Wednesday</h1>
          <Button
            variant="contained"
            sx={{ width: "10rem", margin: "20px 0" }}
            onClick={() => {
              setShowForm(true);
              setCategory("wednesday");
            }}
          >
            Add New Item
          </Button>
          <div className="grid grid-cols-3 font-semibold">
            <div className="text-center">Time</div>
            <div className="text-center">Food Name</div>
            <div className="text-center">Actions</div>
          </div>
          {allFood &&
            allFood.map((food) => {
              if (food.category === "wednesday") {
                return (
                  <div key={food._id} className="relative">
                    <hr className="m-2" />
                    <div className="grid grid-cols-3">
                      <div className="text-center">{food?.time}</div>
                      <div className="text-center">{food?.title}</div>
                      <div className="flex items-center justify-center gap-4">
                        <FaTrash
                          className="cursor-pointer w-[1.4rem] h-[1.4rem]"
                          onClick={() => handleDeleteTime(food._id)}
                        />
                        <FaEdit
                          className="cursor-pointer w-[1.4rem] h-[1.4rem]"
                          onClick={() => {
                            setCategory("wednesday");
                            handleEdit(food._id);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              }
            })}

          {/* Thursday Food Items */}
          <h1 className="text-xl mt-5">Category: Thursday</h1>
          <Button
            variant="contained"
            sx={{ width: "10rem", margin: "20px 0" }}
            onClick={() => {
              setShowForm(true);
              setCategory("thursday");
            }}
          >
            Add New Item
          </Button>
          <div className="grid grid-cols-3 font-semibold">
            <div className="text-center">Time</div>
            <div className="text-center">Food Name</div>
            <div className="text-center">Actions</div>
          </div>
          {allFood &&
            allFood.map((food) => {
              if (food.category === "thursday") {
                return (
                  <div key={food._id} className="relative">
                    <hr className="m-2" />
                    <div className="grid grid-cols-3">
                      <div className="text-center">{food?.time}</div>
                      <div className="text-center">{food?.title}</div>
                      <div className="flex items-center justify-center gap-4">
                        <FaTrash
                          className="cursor-pointer w-[1.4rem] h-[1.4rem]"
                          onClick={() => handleDeleteTime(food._id)}
                        />
                        <FaEdit
                          className="cursor-pointer w-[1.4rem] h-[1.4rem]"
                          onClick={() => {
                            setCategory("thursday");
                            handleEdit(food._id);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              }
            })}

          {/* Friday Food Items */}
          <h1 className="text-xl mt-5">Category: Friday</h1>
          <Button
            variant="contained"
            sx={{ width: "10rem", margin: "20px 0" }}
            onClick={() => {
              setShowForm(true);
              setCategory("friday");
            }}
          >
            Add New Item
          </Button>
          <div className="grid grid-cols-3 font-semibold">
            <div className="text-center">Time</div>
            <div className="text-center">Food Name</div>
            <div className="text-center">Actions</div>
          </div>
          {allFood &&
            allFood.map((food) => {
              if (food.category === "friday") {
                return (
                  <div key={food._id} className="relative">
                    <hr className="m-2" />
                    <div className="grid grid-cols-3">
                      <div className="text-center">{food?.time}</div>
                      <div className="text-center">{food?.title}</div>
                      <div className="flex items-center justify-center gap-4">
                        <FaTrash
                          className="cursor-pointer w-[1.4rem] h-[1.4rem]"
                          onClick={() => handleDeleteTime(food._id)}
                        />
                        <FaEdit
                          className="cursor-pointer w-[1.4rem] h-[1.4rem]"
                          onClick={() => {
                            setCategory("friday");
                            handleEdit(food._id);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              }
            })}

          {/* Saturday Food Items */}
          <h1 className="text-xl mt-5">Category: Saturday</h1>
          <Button
            variant="contained"
            sx={{ width: "10rem", margin: "20px 0" }}
            onClick={() => {
              setShowForm(true);
              setCategory("saturday");
            }}
          >
            Add New Item
          </Button>
          <div className="grid grid-cols-3 font-semibold">
            <div className="text-center">Time</div>
            <div className="text-center">Food Name</div>
            <div className="text-center">Actions</div>
          </div>
          {allFood &&
            allFood.map((food) => {
              if (food.category === "saturday") {
                return (
                  <div key={food._id} className="relative">
                    <hr className="m-2" />
                    <div className="grid grid-cols-3">
                      <div className="text-center">{food?.time}</div>
                      <div className="text-center">{food?.title}</div>
                      <div className="flex items-center justify-center gap-4">
                        <FaTrash
                          className="cursor-pointer w-[1.4rem] h-[1.4rem]"
                          onClick={() => handleDeleteTime(food._id)}
                        />
                        <FaEdit
                          className="cursor-pointer w-[1.4rem] h-[1.4rem]"
                          onClick={() => {
                            setCategory("saturday");
                            handleEdit(food._id);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          <hr />
        </div>
      </div>
      {showForm && (
        <div className="fixed bg-black/[0.85] z-10 h-[100vh] top-0 left-0 w-[100vw]">
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
              <h1 className="text-center text-2xl font-bold mb-10">
                Food Schedule
              </h1>

              <Formik
                initialValues={initialValue}
                validationSchema={validationSchema}
                onSubmit={handleCreateTime}
              >
                {({ isSubmitting }) => {
                  return (
                    <Form className="w-[80%]">
                      <div className="mb-6 relative">
                        <Field placeholder="" type="text" name="time"></Field>
                        <label htmlFor="time">Time</label>
                        <ErrorMessage
                          component="div"
                          name="time"
                          className="text-red-500 absolute text-xs bottom-[-5px]"
                        />
                      </div>
                      <div className="mb-6 relative w-full">
                        <Field
                          placeholder=""
                          type="text"
                          name="title"
                          className="w-full"
                        ></Field>
                        <label htmlFor="title">Food Name</label>
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
                        {isSubmitting ? "Adding..." : "Add to Routine"}
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
        <div className="fixed bg-black/[0.85] z-10 h-[100vh] top-0 left-0 w-[100vw]">
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
                Update Food Schedule
              </h1>

              <Formik
                initialValues={allFood.find((food) => food._id === updateId)}
                validationSchema={validationSchema}
                onSubmit={handleUpdateTime}
              >
                {({ values, isSubmitting }) => {
                  return (
                    <Form className="w-[80%]">
                      <div className="mb-6 relative">
                        <p className="mb-2">Time</p>
                        <Field
                          type="text"
                          name="time"
                          value={values?.time}
                        ></Field>
                        <ErrorMessage
                          component="div"
                          name="time"
                          className="text-red-500 absolute text-xs bottom-[-5px]"
                        />
                      </div>
                      <div className="mb-6 relative w-full">
                        <p className="mb-2">Food Name</p>
                        <Field
                          type="text"
                          name="title"
                          value={values?.title}
                          className="w-full"
                        ></Field>
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
                        {isSubmitting ? "Updating..." : "Update Routine"}
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

export default FoodRoutine;
