import React, { useEffect, useState } from "react";
import { getData, postDataWithHeader } from "../../../services/axios.service";
import { useSelector } from "react-redux";

const AdminOrders = () => {
  const [allOrders, setallOrders] = useState([]);
  const { token, hostelId } = useSelector((state) => state.auth);

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
  return <main className="mt-4 mb-[10rem] flex justify-center"></main>;
};

export default AdminOrders;
