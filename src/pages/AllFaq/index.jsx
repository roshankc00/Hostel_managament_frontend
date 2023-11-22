import { Button } from "@mui/material";
import SuperAdminBreadcrumb from "../../components/SuperAdminHeader";
import { FaqsTable } from "./Table";
import { useNavigate } from "react-router-dom";

const AllFaqs = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <SuperAdminBreadcrumb title="Faqs" />
        <div className="add-new-rule mt-6 ms-20">
          <Button
            variant="contained"
            className="mt-3"
            onClick={() => navigate("/superadmin/createFaq")}
          >
            Add New
          </Button>
        </div>
        <div className="contained mt-10">
          <FaqsTable />
        </div>
      </div>
    </div>
  );
};

export default AllFaqs;
