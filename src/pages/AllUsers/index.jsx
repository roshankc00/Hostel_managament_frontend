import { AddHostelRUlesTable } from "./Table";
import SuperAdminBreadcrumb from "../../components/SuperAdminHeader";

const AllUsers = () => {
  return (
    <div>
      <SuperAdminBreadcrumb title="allusers" />
      <div className="add-new-rule mt-6 ms-20"></div>
      <div className="contained mt-10">
        <AddHostelRUlesTable />
      </div>
    </div>
  );
};
export default AllUsers;
