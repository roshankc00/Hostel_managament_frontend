import React, { useEffect, useState } from "react";
import { getData, postDataWithHeader } from "../../../services/axios.service";
import { useSelector } from "react-redux";
import { Button, Modal } from "@mui/material";
import { errorToast, successToast } from "../../../services/toastify.service";
import { MdOutlineCrisisAlert } from "react-icons/md";
import { AiFillCheckCircle } from "react-icons/ai";

const AdminOrders = () => {
  const [allOrders, setallOrders] = useState([]);
  const { token, hostelId } = useSelector((state) => state.auth);
  const [AcceptDeclinedId, setAcceptDeclinedId] = useState("");
  const [roomId, setroomId] = useState("");

  // modal for the declin order starts
  const [openDeclineModal, setopenDeclineModal] = useState(false);
  const handleOpenDeclineModal = () => setopenDeclineModal(true);
  const handleCloseDeclineModal = () => setopenDeclineModal(false);
  // modal for the declin order ends

  // modal for accepting the order starts
  const [openAcceptModal, setopenAcceptModal] = useState(false);
  const handleopenAcceptModal = () => setopenAcceptModal(true);
  const handleCloseAcceptModal = () => setopenAcceptModal(false);

  // modal for accepting the order ends

  const getAllOrders = async () => {
    const response = await postDataWithHeader(
      "orders-of-hostels",
      { hostelId },
      token
    );
    setallOrders(response.allOrders);
  };
  useEffect(() => {
    getAllOrders();
  }, []);

  const handleAcceptOrderHandler = async () => {
    if (AcceptDeclinedId && roomId) {
      const response = await postDataWithHeader(
        "orders-accept",
        {
          orderId: AcceptDeclinedId,
          roomId: roomId,
        },
        token
      );
      if (response.success) {
        const newOrders = allOrders.filter(
          (order) => order._id !== AcceptDeclinedId
        );
        console.log(newOrders);
        setallOrders(newOrders);
        successToast(
          response.message ? response.message : "Order accepted succesfully"
        );
      } else {
        errorToast(
          response.message ? response.message : "Order is not Accepted"
        );
      }
    }
    handleCloseAcceptModal();
  };

  const handlerRejectOrderHandler = async () => {
    if (AcceptDeclinedId && roomId) {
      const response = await postDataWithHeader(
        "orders-decline",
        {
          orderId: AcceptDeclinedId,
          roomId: roomId,
        },
        token
      );
      if (response.success) {
        const newOrders = allOrders.filter(
          (order) => order._id !== AcceptDeclinedId
        );
        setallOrders(newOrders);
        successToast(
          response.message ? response.message : "Order decline succesfully"
        );
      } else {
        errorToast(
          response.message ? response.message : "unable to decline the order"
        );
      }
      handleCloseDeclineModal();
    }
  };

  return (
    <main className="mt-4 mb-[10rem] flex items-right justify-center sm:justify-end px-10">
      <div className="max-w-[1080px] min-w-[350px] w-[50vw] relative sm:mr-[10vw] mr-0">
        <h1 className="text-center font-bold text-2xl mb-10">All Orders</h1>
        <div className="container flex gap-3   justify-center items-center g flex-wrap">
          {allOrders &&
            allOrders.map((order) => {
              return (
                <div
                  key={order?._id}
                  className="bg-slate-300 rounded-md p-3 w-[300px]"
                >
                  <h1>Name : {order?.user?.name}</h1>
                  <h1>Email : {order?.user?.email}</h1>
                  <h1>Phone : {order?.phone}</h1>
                  <h1>Room : {order?.room?.name}</h1>
                  <div className="mt-4 flex justify-between gap-4">
                    <button
                      className="bg-blue-600 text-white p-1 px-3 rounded-md w-[50%]"
                      onClick={() => {
                        setAcceptDeclinedId(order._id);
                        setroomId(order.room._id);
                        handleopenAcceptModal();
                      }}
                    >
                      Accept
                    </button>

                    <div>
                      <Modal
                        open={openAcceptModal}
                        onClose={handleCloseAcceptModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <div className=" relative top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white w-[400px] rounded-xl p-2">
                          <div className="flex gap-[10%] items-center ms-3">
                            <AiFillCheckCircle color="green" size={40} />
                            <div className="content">
                              <p className="font-bold text-[18px]">
                                Are You sure
                              </p>
                              <p>to accept the order</p>
                            </div>
                          </div>
                          <div className="modal-footer flex flex-row-reverse gap-3 mt-3 mb-1">
                            <Button
                              variant="contained"
                              onClick={() => handleAcceptOrderHandler()}
                            >
                              Accept
                            </Button>
                            <Button
                              variant="contained"
                              onClick={() => {
                                setAcceptDeclinedId("");
                                setroomId("");
                                handleCloseAcceptModal();
                              }}
                            >
                              {" "}
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </Modal>
                    </div>
                    <button
                      className="bg-red-600 text-white p-1 px-3 rounded-md w-[50%]"
                      onClick={() => {
                        setAcceptDeclinedId(order._id);
                        setroomId(order.room._id);
                        handleOpenDeclineModal();
                      }}
                    >
                      Decline
                    </button>
                    <div>
                      <Modal
                        open={openDeclineModal}
                        onClose={handleCloseDeclineModal}
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
                              <p>to decline the order</p>
                            </div>
                          </div>
                          <div className="modal-footer flex flex-row-reverse gap-3 mt-3 mb-1">
                            <Button
                              variant="contained"
                              onClick={() => handlerRejectOrderHandler()}
                            >
                              Decline
                            </Button>
                            <Button
                              variant="contained"
                              onClick={() => {
                                handleCloseDeclineModal();
                                setAcceptDeclinedId("");
                                setroomId("");
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
        </div>
      </div>
    </main>
  );
};

export default AdminOrders;
