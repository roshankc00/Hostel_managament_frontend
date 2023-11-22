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
import { successToast } from "../../../services/toastify.service";
export const UserResponseTable = () => {
  const [tableData, settableData] = useState([]);
  const [idToBeDeleted, setidToBeDeleted] = useState("");
  const { token } = useSelector((state) => state.auth);

  const getAllContactFormsData = async () => {
    const response = await getData("contactForm", token);
    console.log(response);
    if (response.success) {
      settableData(response.contactForms);
    }
  };

  useEffect(() => {
    getAllContactFormsData();
  }, []);

  const deleteUserResponseHandler = async (id) => {
    const response = await deleteData(`contactForm/${idToBeDeleted}`, token);
    if (response.success) {
      const newData = tableData.filter((data) => data._id != idToBeDeleted);
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
                  <span className="text-xl font-semibold">Name</span>
                </TableCell>
                <TableCell>
                  <span className="text-xl font-semibold">Email</span>
                </TableCell>
                <TableCell>
                  <span className="text-xl font-semibold">Message</span>
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
                        {row.name}
                      </span>
                    </TableCell>
                    <TableCell className="">
                      <span className="text-[18px] font-semibold">
                        {row.email}
                      </span>
                    </TableCell>
                    <TableCell className="">
                      <span className="text-[18px] font-semibold">
                        {row.comment}
                      </span>
                    </TableCell>
                    <TableCell className="text-center ">
                      <div className="flex gap-2 items-center">
                        <button
                          className="text-2xl p-2 rounded-md border"
                          onClick={() => setidToBeDeleted(row._id)}
                        >
                          <DeleteIcon />
                        </button>
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
