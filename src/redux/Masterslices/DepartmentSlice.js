import {createSlice} from "@reduxjs/toolkit";

const DepartmentSlice = createSlice({
  name: "Department",
  initialState: {
    departmentvalues: [],
  },
  reducers: {
    setDepartment: (state, action) => {
      state.departmentvalues = action.payload;
    },
  },
});

export const {setDepartment} = DepartmentSlice.actions;

export default DepartmentSlice.reducer;
