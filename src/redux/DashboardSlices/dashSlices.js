import {createSlice} from "@reduxjs/toolkit";

const dashSlice = createSlice({
  name: "dashSlice",
  initialState: {
    countervalues: [],
  },
  reducers: {
    setadminNumberofdashboarddata: (state, action) => {
      state.countervalues = action.payload;
    },
  },
});

export const {setadminNumberofdashboarddata} = dashSlice.actions;
export default dashSlice.reducer;
