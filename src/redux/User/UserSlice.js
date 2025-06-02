import { createSlice } from "@reduxjs/toolkit";
const UserSlice = createSlice({
  name: "UserSlice",
  initialState: {
    values: [],
  },
  reducers: {
    setUser: (state, action) => {
      state.values = action.payload; // ✅ Returning a new state object
    },
    setAddprofile: (state, action) => {
      state.values = action.payload;
    },
  },
});

export const { setUser, setAddprofile } = UserSlice.actions;
export default UserSlice.reducer;
