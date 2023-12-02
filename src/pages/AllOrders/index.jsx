import { useEffect, useState } from "react";
import SuperAdminBreadcrumb from "../../components/SuperAdminHeader";
import { getData } from "../../services/axios.service";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AllOrders = () => {
  const { token } = useSelector((state) => state.auth);
  const [allOrders, setallOrders] = useState([]);
  const navigate = useNavigate();

  const getAllOrders = async () => {
    const response = await getData("orders", token);
    console.log(response);
    if (response.success) {
      setallOrders(response.allOrders);
    }
  };
  useEffect(() => {
    getAllOrders();
  }, []);
  return (
    <div>
      <SuperAdminBreadcrumb title="All-Orders" />
      <div className="allorders-contents">
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
                  <h1>HostelId : {order?.hostel}</h1>
                  <div className="mt-5  flex flex-row-reverse mr-2 w-full">
                    <Button
                      variant="outlined"
                      sx={{ width: "100%" }}
                      onClick={() => navigate(`/hostels/${order?.hostel}`)}
                    >
                      View Hostel
                    </Button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default AllOrders;
