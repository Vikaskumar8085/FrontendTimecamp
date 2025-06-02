import apiInstance from "../../../ApiInstance/apiInstance";

// add employee api call
export const addemployeeapicall = async (value) => {
  const response = await apiInstance.post("/v1/admin/create-employee", value);
  return response.data;
};

// update employee api call
export const updateEmployeeapicall = async (value) => {
  const response = await apiInstance.put(
    `/v1/admin/edit-employee/${value.id}`,
    value.payload
  );
  return response?.data;
};

// fetch employee api call

export const fetchemployeeapicall = async (value) => {
  const repsonse = await apiInstance.get("/v1/admin/fetch-employee", value);
  return repsonse.data;
};

// fetch active employee api call

export const fetchactiveemployeeapicall = async (value) => {
  const repsonse = await apiInstance.get(
    "/v1/admin/fetch-active-employee",
    value
  );
  return repsonse.data;
};

// fetch inactive api call

export const fetchinactiveemployeeapicall = async () => {
  const response = await apiInstance.get("/v1/admin/fetch-inactive-employee");
  return response.data;
};

export const fetchsingleemployeeapicall = async (value) => {
  const response = await apiInstance.get(
    `/v1/admin/fetch-single-employee/${value}`
  );
  return response.data;
};

export const fetchemployeeprojectapicall = async (value) => {
  const response = await apiInstance.get(
    `/v1/admin/fetch-employee-project/${value}`
  );
  return response.data;
};

export const fetchemployeeprojecttimesheetapicall = async (value) => {
  const response = await apiInstance.get(
    `/v1/admin/fetch-employee-timesheet/${value}`
  );
  return response.data;
};
