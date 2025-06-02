import {createSlice} from "@reduxjs/toolkit";

const RoleSlice = createSlice({
  name: "Role",
  initialState: {
    roleValues: [],
  },
  reducers: {
    setRoles: (state, action) => {
      state.roleValues = action.payload;
    },
  },
});

export const {setRoles} = RoleSlice.actions;
export default RoleSlice.reducer;
