import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  token: "",
  role: "",
  userId: "",
  isLogedInStatus: false,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logedin: (state, data) => {
      state.token = data.payload.token;
      (state.role = data.payload.role), (state.isLogedInStatus = true);
      state.userId = data.payload.userId;
    },
    logedOut: (state) => {
      (state.token = ""),
        (state.role = ""),
        (state.userId = ""),
        (state.isLogedInStatus = false);
    },
  },
});

export default authSlice.reducer;
export const { logedOut, logedin } = authSlice.actions;
