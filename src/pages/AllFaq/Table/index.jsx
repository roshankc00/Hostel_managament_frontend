import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteData, getData } from "../../../services/axios.service";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../../../services/toastify.service";
export const FaqsTable = () => {
  const navigate = useNavigate();
  const [tableData, settableData] = useState([]);
  const { token } = useSelector((state) => state.auth);

  const getAllFaqs = async () => {
    const response = await getData("faqs");
    console.log(response.users);
    if (response.success) {
      settableData(response.faqs);
    }
  };

  useEffect(() => {
    getAllFaqs();
  }, []);

  const deleteFaqHandler = async (id) => {
    const response = await deleteData(`faqs/${id}`, token);
    if (response.success) {
      const newData = tableData.filter((data) => data._id != id);
      settableData(newData);
      successToast(
        response.message ? response.message : "Data deleted successfully"
      );
    } else {
      errorToast(
        response.message ? response.message : "Unable to delete the faqs"
      );
    }
  };

  return (
    <div className="px-20 all-content-faq mt-[-12px]">
      {tableData != [] && (
        <TableContainer
          sx={{
            maxHeight: "100vh",
            minWidth: "80vw",
            fontFamily: "Montserrat",
          }}
          component={Paper}
        >
          <Table stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <span className="text-xl font-semibold">Question</span>
                </TableCell>
                <TableCell>
                  <span className="text-xl font-semibold">Answers</span>
                </TableCell>
                <TableCell>
                  <span className="text-xl font-semibold">Action</span>
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData &&
                tableData.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell className="">
                      <span className="text-[18px] font-semibold">
                        {row.question}
                      </span>
                    </TableCell>
                    <TableCell className="">
                      <span className="text-[18px] font-semibold">
                        {row.answer}
                      </span>
                    </TableCell>
                    <TableCell className="text-center ">
                      <div className="flex gap-2 items-center">
                        <button
                          className="text-2xl p-2 rounded-md border"
                          onClick={() => deleteFaqHandler(row._id)}
                        >
                          <DeleteIcon />
                        </button>
                        <span className="text-2xl p-2 rounded-md border">
                          <button
                            onClick={() =>
                              navigate(`/superadmin/upd-faq/${row._id}`)
                            }
                          >
                            <EditIcon />
                          </button>
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};
