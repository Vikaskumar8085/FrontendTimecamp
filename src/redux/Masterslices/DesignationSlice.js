import {createSlice} from "@reduxjs/toolkit";
import AddDesignation from "../../Component/MasterComponent/Designation/AddDesignation";

const DesignationSlice = createSlice({
  name: "Designation",
  initialState: {
    designationvalues: [],
  },
  reducers: {
    setDesignation: (state, action) => {
      state.designationvalues = action.payload;
    },
    addDesignationitem: (state, action) => {
      state.designationvalues.push(action.payload);
    },
  },
});

export const {setDesignation, addDesignationitem} = DesignationSlice.actions;
export default DesignationSlice.reducer;
