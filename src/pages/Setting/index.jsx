import { useSelector } from "react-redux";
import "./setting.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import ChangeName from "../../components/forms/ChangeName";
import ChangePassword from "../../components/forms/ChangePassword";
import { Button } from "@mui/material";
import { getDataWithoutHeader } from "../../services/axios.service";

const Setting = () => {
  const { userId } = useSelector((state) => state.auth);
  const [current_user_info, setcurrent_user_info] = useState({});
  const [openName, setopenName] = useState(false);
  const handleOpenName = () => setopenName(true);
  const handleCloseName = () => setopenName(false);

  const [openPassword, setopenPassword] = useState(false);
  const handleopenPassword = () => setopenPassword(true);
  const handleClosePassword = () => setopenPassword(false);
  const getUserInfo = async () => {
    const response = await getDataWithoutHeader(`users/${userId}`);
    if (response.success) {
      setcurrent_user_info(response.user);
    }
  };
  useEffect(() => {
    getUserInfo();
  });

  return (
    <div className="flex justify-center">
      {current_user_info && (
        <div className="mb-2 ">
          <div className="setting-change-name shadow-lg mt-3 p-10 w-[60vw] bg-white">
            <h1 className="setting-change-name-title text-xl font-bold mb-3">
              Change Name
            </h1>
            <h1 className="setting-change-old-email">
              {current_user_info.name}
            </h1>
            <div className="mt-3">
              <Button variant="contained" onClick={() => handleOpenName()}>
                Edit
              </Button>
            </div>
            <div>
              <Modal
                open={openName}
                onClose={handleCloseName}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box className="name-model">
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Change Name
                  </Typography>
                  <ChangeName handleCloseName={handleCloseName} />
                </Box>
              </Modal>
            </div>
          </div>
          <div className="setting-change-email shadow-lg mt-3 p-10 w-[60vw] bg-white">
            <h1 className="setting-change-email-title text-xl font-bold">
              Change Email
            </h1>
            <h1 className="setting-change-old-email">
              {current_user_info.email}
            </h1>
          </div>
          <div className="setting-change-password bg-white shadow-lg p-10 w-[60vw] mt-3">
            <h1 className="setting-change-password-title text-xl font-bold">
              Change Password
            </h1>
            <input
              type="password"
              value="default me"
              className="change-old-password"
              disabled
            />
            <div className="mt-4">
              <Button variant="contained" onClick={() => handleopenPassword()}>
                Edit
              </Button>
            </div>
            <div>
              <Modal
                open={openPassword}
                onClose={handleClosePassword}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box className="name-model">
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Change Password
                  </Typography>
                  <ChangePassword />
                </Box>
              </Modal>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Setting;
