import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
import { errorToast, successToast } from "../../../services/toastify.service";
import {
  getDataWithoutHeader,
  postDataWithHeader,
} from "../../../services/axios.service";
import { Button, Modal } from "@mui/material";
import { MdOutlineCrisisAlert } from "react-icons/md";
const AddVerificationCertificate = () => {
  const { hostelId, token } = useSelector((state) => state.auth);
  const [hostelInfo, sethostelInfo] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = async (image) => {
    console.log(image);
    setSelectedImage(image);

    if (image) {
      const formData = new FormData();
      formData.append("hostelId", hostelId);
      formData.append("image", image);
      const respose = await postDataWithHeader(
        "verify-hostel-image",
        formData,
        token
      );
      if (respose.success) {
        successToast(
          respose.message ? respose.message : "Certifate added successfully"
        );
        sethostelInfo(respose.hostel);
      } else {
        errorToast(
          respose.message ? respose.message : "Unable to add the image "
        );
      }
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    handleImageChange(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const getHostelData = async () => {
    const response = await getDataWithoutHeader(`hostels/${hostelId}`);
    if (response.success) {
      sethostelInfo(response.hostel);
    }
  };

  useEffect(() => {
    getHostelData();
  }, []);

  // modal for delete stups starts
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // modal for delete stups ends
  const deleteImageHandler = async () => {
    const response = await postDataWithHeader(
      "delete-hostel-certificate-image",
      {
        hostelId: hostelId,
      },
      token
    );
    if (response?.success) {
      successToast(
        response.message
          ? response.message
          : "Hostel image certificate deleted successfully"
      );
      sethostelInfo(response.hostel);
    } else {
      errorToast(
        response.message
          ? response.message
          : "Unable to delete the hostel certificate "
      );
    }
  };

  return (
    <div>
      <div className=" w-full flex justify-center items-center flex-col mt-3">
        {hostelInfo && hostelInfo?.hostelRegisterDocument?.url ? (
          <>
            <img
              src={hostelInfo?.hostelRegisterDocument?.url}
              alt="Loading.."
              className="w-[60%]"
            />

            <h1 className="mt-10  text-2xl text-red-700 text-center font-bold">
              {" "}
              Danger Area
            </h1>

            <button
              className="bg-black text-white py-2  flex justify-center items-center rounded-md shadow-md my-10 w-[300px]"
              onClick={() => {
                handleOpen();
              }}
            >
              Delete Certificate
            </button>
            <div>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <div className=" relative top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white w-[400px] rounded-xl p-2">
                  <div className="flex gap-[10%] items-center ms-3">
                    <MdOutlineCrisisAlert color="red" size={40} />
                    <div className="content">
                      <p className="font-bold text-[18px]">Are You sure</p>
                      <p>to delete the certificate</p>
                    </div>
                  </div>
                  <div className="modal-footer flex flex-row-reverse gap-3 mt-3 mb-1">
                    <Button
                      variant="contained"
                      onClick={() => {
                        deleteImageHandler();
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      {" "}
                      Cancel
                    </Button>
                  </div>
                </div>
              </Modal>
            </div>
          </>
        ) : (
          <>
            {!selectedImage && (
              <div
                {...getRootProps()}
                className="border-dashed border-2 px-4 py-8 rounded-md text-center cursor-pointer w-[30%] h-[30vh] flex justify-center items-center"
              >
                <input {...getInputProps()} />
                <p className="text-gray-500">
                  Drag and drop <br />
                  or select image
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AddVerificationCertificate;
