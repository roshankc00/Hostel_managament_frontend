import { Button, Modal } from "@mui/material";
import {
  deleteData,
  postDataWithHeader,
} from "../../../services/axios.service";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RoomCard from "../../../components/RoomCard";
import { errorToast, successToast } from "../../../services/toastify.service";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import { MdOutlineCrisisAlert } from "react-icons/md";
const RoomCategory = () => {
  const { token, hostelId } = useSelector((state) => state.auth);
  const [allRooms, setallRooms] = useState([]);
  const [idToBeDeleted, setidToBeDeleted] = useState("");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getRooms = async () => {
    const response = await postDataWithHeader(
      "get-room-hostel",
      { hostelId },
      token
    );
    console.log(response);
    if (response.success) {
      setallRooms(response.rooms);
    }
  };

  useEffect(() => {
    getRooms();
  }, []);

  const handleSetDeleteId = (id) => {
    setidToBeDeleted(id);
    handleOpen();
  };

  const deleteRoomHandler = async () => {
    if (idToBeDeleted) {
      const response = await deleteData(`room-hostel/${idToBeDeleted}`, token);
      if (response.success) {
        const newData = allRooms.filter((item) => item._id !== idToBeDeleted);
        setallRooms(newData);
        successToast(
          response.message ? response.message : "Hostel deleted successfully"
        );
      } else {
        errorToast(
          response.message ? response.message : "unable to delete the room "
        );
      }
    }
    setidToBeDeleted("");
    handleClose();
  };

  return (
    <main className="mt-4 mb-[10rem] flex items-right justify-center sm:justify-end">
      <div className="max-w-[1080px] min-w-[350px] w-[50vw] relative sm:mr-[10vw] mr-0 flex flex-col gap-4 items-start">
        <Button
          variant="contained"
          onClick={() => navigate(`/admin/room-category-form/${hostelId}`)}
        >
          Add New
        </Button>
        <section className="flex flex-col gap-10">
          {allRooms &&
            allRooms.map((room) => {
              return (
                <div key={room._id} className="flex flex-col lg:flex-row gap-4">
                  <RoomCard
                    name={room?.name}
                    price={room?.price}
                    totalSeats={room?.totalSeats}
                    totalVacentSeats={room?.totalVacentSeats}
                    description={room?.description}
                    image={room?.image?.url}
                  />
                  <div className="flex gap-2 items-center justify-center">
                    <Button
                      variant="contained"
                      onClick={() => navigate(`/admin/edit-room/${room._id}`)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => handleSetDeleteId(room._id)}
                    >
                      Delete
                    </Button>
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
                              <p className="font-bold text-[18px]">
                                Are You sure
                              </p>
                              <p>to delete the item</p>
                            </div>
                          </div>
                          <div className="modal-footer flex flex-row-reverse gap-3 mt-3 mb-1">
                            <Button
                              variant="contained"
                              onClick={() => deleteRoomHandler()}
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
                </div>
              );
            })}
        </section>
      </div>
    </main>
  );
};

export default RoomCategory;
