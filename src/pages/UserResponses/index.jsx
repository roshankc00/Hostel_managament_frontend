import { UserResponseTable } from "./Table";
import SuperAdminBreadcrumb from "../../components/SuperAdminHeader";

const AllUsersResponses = () => {
  return (
    <div>
      <SuperAdminBreadcrumb title="All-User-Response" />
      <div className="add-new-rule mt-6 ms-20"></div>
      <div className="contained mt-10">
        <UserResponseTable />
      </div>
    </div>
  );
};
export default AllUsersResponses;
