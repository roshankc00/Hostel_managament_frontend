import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const SuperAdminRoute = () => {
  const role = useSelector((state) => {
    return state.auth.role;
  });
  console.log(role);
  return (
    <div>{role === "superAdmin" ? <Outlet /> : <Navigate to={"/"} />}</div>
  );
};

export default SuperAdminRoute;
