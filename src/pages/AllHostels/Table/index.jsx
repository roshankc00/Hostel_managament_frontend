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
import { getData } from "../../../services/axios.service";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
export const HostelsTable = () => {
  const [tableData, settableData] = useState([]);
  const { token } = useSelector((state) => state.auth);

  const getAllHostels = async () => {
    const response = await getData("hostels", token);
    console.log(response);
    if (response.success) {
      settableData(response.hostels);
    }
  };

  useEffect(() => {
    getAllHostels();
  }, []);

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
                  <span className="text-xl font-semibold">Phone</span>
                </TableCell>
                <TableCell>
                  <span className="text-xl font-semibold">No of Ratings</span>
                </TableCell>
                <TableCell>
                  <span className="text-xl font-semibold">Status</span>
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
                        {row.phone}
                      </span>
                    </TableCell>
                    <TableCell className="">
                      <span className="text-[18px] font-semibold">
                        {row.averageRating.toFixed(2)}
                      </span>
                    </TableCell>
                    <TableCell className="">
                      <span className="text-[18px] font-semibold">
                        {row.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-center ">
                      <div className="flex gap-2 items-center">
                        <span className="text-2xl p-2 rounded-md border">
                          <DeleteIcon />
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
