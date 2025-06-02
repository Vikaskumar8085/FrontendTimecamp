import {configureStore} from "@reduxjs/toolkit";
import LoaderSlices from "./LoaderSlices/LoaderSlices";
import UserSlice from "./User/UserSlice";
import dashSlice from "./DashboardSlices/dashSlices";
import projectSlice from "./ProjectSlices/projectSlice";
import TaskSlice from "./taskSlice/TaskSlice";
import TimesheetSlice from "./TimesheetSlice/TimesheetSlice";
const store = configureStore({
  reducer: {
    loader: LoaderSlices,
    user: UserSlice,
    dash: dashSlice,
    project: projectSlice,
    task: TaskSlice,
    timesheet: TimesheetSlice,
  },
});
export default store;
