import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
const initialState = {
  token: "",
  role: "",
  userId: "",
  isLogedInStatus: false,
  hostelId: "",
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logedin: (state, data) => {
      state.token = data.payload.token;
      (state.role = data.payload.role), (state.isLogedInStatus = true);
      state.userId = data.payload.userId;
      state.hostelId = data.payload.hostelId;
    },
    logedOut: (state) => {
      (state.token = ""),
        (state.role = ""),
        (state.userId = ""),
        (state.isLogedInStatus = false);
      state.hostelId = "";
      localStorage.removeItem("persist:root");
      Cookies.remove("role");
      Cookies.remove("jwtToken");
      Cookies.remove("UserId");
      Cookies.remove("isLoggedIn");
    },
  },
});

export default authSlice.reducer;
export const { logedOut, logedin } = authSlice.actions;
