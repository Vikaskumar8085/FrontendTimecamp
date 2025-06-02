import apiInstance from "../../ApiInstance/apiInstance";

export const createemployeeprojectapicall = async (values) => {
  const response = await apiInstance.post(
    "/v2/employee/create-employee-project",
    values
  );
  return response.data;
};

export const fetchemployeeprojectsapicall = async (value) => {
  const response = await apiInstance.get(
    "/v2/employee/employee-project",
    value
  );
  return response.data;
};

export const fetchemployeeactiveprojectapicall = async (value) => {
  const response = await apiInstance.get(
    "/v2/employee/employee-active-project",
    value
  );
  return response.data;
};

export const fetchemployeeinactiveprojectapicall = async (value) => {
  const response = await apiInstance.get(
    "/v2/employee/employee-inactive-project",
    value
  );
  return response.data;
};

// fetch project timesheet

export const fetchemployeeprojecttimesheetapicall = async (value) => {
  const response = await apiInstance.get(
    `/v2/employee/fetch-employee-project-timesheet/${value}`
  );
  return response.data;
};

// fetch project information
export const fetchemployeeprojectinformationapicall = async (value) => {
  const response = await apiInstance.get(
    `/v2/employee/fetch-employee-project-information/${value}`
  );
  return response.data;
};

export const fetchemployeeprojecttaskapicall = async (value) => {
  const response = await apiInstance.get(
    `/v2/employee/fetch-employee-project-tasks/${value}`
  );
  return response.data;
};

// fetch employee timesheet api call

export const fetchemployeetimesheetapicall = async (value) => {
  const response = await apiInstance.get(
    "/v2/employee/fetch-employee-timesheet",
    value
  );
  return response.data;
};

// fetch employee task api call

export const fetchemployeetaskapicall = async (values) => {
  const response = await apiInstance.get(
    "/v2/employee/fetch-employee-tasks",
    values
  );
  return response.data;
};

// fill employee timesheet apicall
export const fillemployeetimesheetapicall = async (value) => {
  const response = await apiInstance.post(
    "/v2/employee/fill-project-timesheet",
    value
  );
  return response.data;
};

export const fetchemployeerolesapicall = async () => {
  const response = await apiInstance.get("/v2/employee/fetch-employee-roles");

  return response?.data;
};

export const fetchemployeeclientsapicall = async () => {
  const response = await apiInstance.get("/v2/employee/fetch-employee-client");
  return response?.data;
};

export const fetchemployeestaffapicall = async () => {
  const response = await apiInstance.get("/v2/employee/fetch-employee-staff");
  return response?.data;
};

export const fillmultiemployeetimesheetapicall = async (value) => {
  const response = await apiInstance.post(
    "/v2/employee/fill-multi-employee-timesheet",
    value
  );
  return response?.data;
};
