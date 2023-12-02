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
    console.log(response);
    setallOrders(response.allOrders);
  };
  useEffect(() => {
    getAllOrders();
  }, []);
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
                  <h1>Phone : {order.phone}</h1>
                </div>
              );
            })}
        </div>
      </div>
    </main>
  );
};

export default AdminOrders;
