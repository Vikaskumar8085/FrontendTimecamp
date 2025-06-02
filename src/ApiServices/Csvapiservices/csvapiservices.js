import apiInstance from "../../ApiInstance/apiInstance";

// client
export const downloadclientcsvformate = async () => {
  const response = await apiInstance.get("/v1/csv-upload/client-csv-download");
  return response.data;
};

// upload client csv
export const uploadclientcsvapicall = async (value) => {
  const response = await apiInstance.post(
    "/v1/csv-upload/upload-csv-client",
    value
  );
  return response.data;
};

// employee
export const downloadEmployeecsvformate = async () => {
  const response = await apiInstance.get(
    "/v1/csv-upload/employee-csv-download"
  );
  return response.data;
};

// upload employee csv
export const uploademployeecsvapicall = async (value) => {
  const response = await apiInstance.post(
    "/v1/csv-upload/employee-csv-upload",
    value
  );
  return response.data;
};

//   contractor
export const downloadcontractorcsvformate = async () => {
  const response = await apiInstance.get(
    "/v1/csv-upload/contractor-csv-download"
  );
  return response.data;
};

// upload contractor csv
export const uploadcontractorcsvapicall = async (value) => {
  const response = await apiInstance.post(
    "/v1/csv-upload/contractor-csv-upload",
    value
  );
  return response.data;
};

// upload timesheet
export const uploadtimesheetcsvapicall = async (value) => {
  const response = await apiInstance.post(
    "/v1/csv-upload/timesheet-csv-upload",
    value
  );
  return response.data;
};

// upload task

export const uploadprojecttaskcsvapicall = async (value) => {
  const response = await apiInstance.post(
    `/v1/csv-upload/task-csv-upload/${value.id}`,
    value.payload
  );
  return response?.data;
};

// upload project
export const uploadprojectcsvapicall = async (value) => {
  const response = await apiInstance.post(
    "/v1/csv-upload/project-csv-upload",
    value
  );
  return response?.data;
};
