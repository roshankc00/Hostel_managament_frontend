import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const SecureRoute = () => {
  const user = useSelector((state) => {
    return state.auth;
  });
  return (
    <div>{user.isLogedInStatus ? <Outlet /> : <Navigate to={"/signin"} />}</div>
  );
};

export default SecureRoute;
