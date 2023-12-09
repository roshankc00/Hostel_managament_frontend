import { useSelector } from "react-redux";
import {
  deleteData,
  getDataWithoutHeader,
  postDataWithHeader,
} from "../../../services/axios.service";
import { MdDelete } from "react-icons/md";
import { useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { errorToast, successToast } from "../../../services/toastify.service";
import { Button, Modal } from "@mui/material";
import { MdOutlineCrisisAlert } from "react-icons/md";
const HostelImages = () => {
  const [hostelInfo, sethostelInfo] = useState({});
  const { hostelId, token } = useSelector((state) => state.auth);
  const [idToBeDeleted, setidToBeDeleted] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const getHostelData = async () => {
    const response = await getDataWithoutHeader(`hostels/${hostelId}`);
    sethostelInfo(response.hostel);
  };

  // image related stups starts
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    handleImageChange(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const handleImageChange = async (image) => {
    console.log(image);
    setSelectedImage(image);

    if (image) {
      const formData = new FormData();
      formData.append("hostelId", hostelId);
      formData.append("image", image);
      const respose = await postDataWithHeader(
        "hostels/add-images",
        formData,
        token
      );
      if (respose.success) {
        sethostelInfo(respose.hostel);
        successToast(
          respose.message ? respose.message : "Image added successfully"
        );
      } else {
        errorToast(
          respose.message ? respose.message : "Unable to add the image "
        );
      }
    }
  };

  // image related stups ends
  // modal for delete stups starts
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // modal for delete stups ends

  useEffect(() => {
    getHostelData();
  }, []);
  const handleSetIdToBeDeleted = (id) => {
    setidToBeDeleted(id);
    handleOpen();
    console.log(idToBeDeleted);
  };
  const deleteImageHandler = async () => {
    const response = await postDataWithHeader(
      "delete-hostel-image",
      {
        bulbName: idToBeDeleted,
        hostelId: hostelId,
      },
      token
    );
    if (response.success) {
      sethostelInfo(response.hostel);
      successToast(
        response.message ? response.message : "Image deleted successfully"
      );
      handleClose();
    } else {
      errorToast(
        response.message ? response.message : "unable to delete the image"
      );
      handleClose();
    }
  };
  return (
    <div className="flex  justify-center  md:ms-[300px]  ms-10  mt-10">
      <div className="flex justify-center items-center gap-2 flex-wrap flex-col md:flex-row">
        {hostelInfo && (
          <div className="flex justify-center items-center flex-wrap gap-3">
            {hostelInfo?.images?.map((image) => {
              return (
                <div className="relative">
                  <img
                    src={image.url}
                    key={image?.bulbName}
                    className="w-[400px] height-[400px] "
                  />
                  <MdDelete
                    className="absolute right-2 top-2 bg-slate-300 p-2 rounded-lg"
                    color="red"
                    size={40}
                    onClick={() => {
                      handleSetIdToBeDeleted(image.bulbName);
                    }}
                  />
                </div>
              );
            })}
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
                      <p>to delete the item</p>
                    </div>
                  </div>
                  <div className="modal-footer flex flex-row-reverse gap-3 mt-3 mb-1">
                    <Button
                      variant="contained"
                      onClick={() => deleteImageHandler()}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleClose();
                        setidToBeDeleted("");
                      }}
                    >
                      {" "}
                      Cancel
                    </Button>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        )}

        <div>
          <div
            {...getRootProps()}
            className="border-dashed border-2 px-4 py-8 rounded-md text-center cursor-pointer w-[400px] h-[300px] flex justify-center items-center"
          >
            <input {...getInputProps()} />
            <p className="text-gray-500">
              Drag and drop <br />
              or select image
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostelImages;
