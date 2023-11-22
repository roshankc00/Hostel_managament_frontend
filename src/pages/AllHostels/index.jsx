import SuperAdminBreadcrumb from "../../components/SuperAdminHeader";
import { HostelsTable } from "./Table";

const AllHostels = () => {
  return (
    <div>
      <SuperAdminBreadcrumb title="All-Hostels" />
      <div className="add-new-rule mt-6 ms-20"></div>
      <div className="contained mt-10">
        <HostelsTable />
      </div>
    </div>
  );
};
export default AllHostels;
