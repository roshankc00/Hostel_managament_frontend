import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { getData, postDataWithHeader } from "../../../services/axios.service";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  errorToast,
  loadingToast,
  successToast,
} from "../../../services/toastify.service";
export const HostelsTable = () => {
  const [tableData, settableData] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const [showCertificate, setshowCertificate] = useState(false);
  const [url, setUrl] = useState("");

  const getAllHostels = async () => {
    const response = await getData("hostels-superadmin", token);
    console.log(response);
    if (response.success) {
      settableData(response.hostels);
    }
  };

  useEffect(() => {
    getAllHostels();
  }, []);

  const handleChangeStatus = async (id) => {
    loadingToast();
    const response = await postDataWithHeader(
      "verify-hostel-status",
      { hostelId: id },
      token
    );

    console.log(response);
    if (response?.success) {
      successToast(
        response.message ? response.message : "Status changed successfully"
      );
      let newData = [];
      tableData.map((data) => {
        if (data._id === id) {
          newData.push(response.hostel);
        } else {
          newData.push(data);
        }
      });
      settableData(newData);
    } else {
      errorToast(
        response.message ? response.message : "Unable to change the status"
      );
    }
  };

  return (
    <>
      {!showCertificate && (
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
                      <span className="text-xl font-semibold">phone</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-xl font-semibold">Status</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-xl font-semibold">
                        Registeration certificate
                      </span>
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
                            {row.phone}
                          </span>
                        </TableCell>
                        <TableCell className="">
                          <span className="text-[18px] font-semibold">
                            {row.status}
                          </span>
                        </TableCell>
                        <TableCell className="">
                          <span className="text-[18px] font-semibold">
                            <img
                              src={row?.hostelRegisterDocument?.url}
                              alt=""
                              className="h-[40px] w-40px"
                            />
                          </span>
                        </TableCell>

                        <TableCell className="text-center ">
                          <div className="flex gap-2 items-center">
                            <Button
                              variant="contained"
                              onClick={() => handleChangeStatus(row._id)}
                            >
                              {" "}
                              change status
                            </Button>
                            {row?.hostelRegisterDocument?.url && (
                              <Button
                                variant="contained"
                                onClick={() => {
                                  setshowCertificate(true);
                                  setUrl(row?.hostelRegisterDocument?.url);
                                }}
                              >
                                {" "}
                                view the certificate
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      )}
      {showCertificate && (
        <>
          <Button
            variant="contained"
            onClick={() => {
              setUrl("");
              setshowCertificate(false);
            }}
          >
            {" "}
            Back to DashBoard
          </Button>
          <img src={url} alt="" className=" w-[80vw] mt-5" />
        </>
      )}
    </>
  );
};
