import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const HostelOwnerRoute = () => {
  const role = useSelector((state) => {
    return state.auth.role;
  });
  console.log(role);
  return <div>{role === "owner" ? <Outlet /> : <Navigate to={"/"} />}</div>;
};

export default HostelOwnerRoute;
