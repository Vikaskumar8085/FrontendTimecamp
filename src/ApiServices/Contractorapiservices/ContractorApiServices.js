import apiInstance from "../../ApiInstance/apiInstance";

// conractor projects
export const fetchContractorprojectsapicall = async () => {
  const response = await apiInstance.get("/v2/contractor/contractor-project");
  return response.data;
};
// contractor active project
export const fetchcontractoractiveprojectapicall = async () => {
  const response = await apiInstance.get(
    "/v2/contractor/contractor-active-project"
  );
  return response.data;
};
// contractor inactive project
export const fetchcontractorinactiveprojectapicall = async () => {
  const response = await apiInstance.get(
    "/v2/contractor/contractor-inactive-project"
  );
  return response.data;
};

// fetch contractor project information
export const fetchcontractorprojectinformationapicall = async (value) => {
  const response = await apiInstance.get(
    `/v2/contractor/fetch-contractor-single-project/${value}`
  );
  return response.data;
};

// fetch contractor project timesheet
export const fetchcontractorprojecttimesheetapicall = async (value) => {
  const response = await apiInstance.get(
    `/v2/contractor/contract-project-timesheet/${value}`
  );
  return response.data;
};

// fetch contractor project task api call
export const fetchcontractorprojecttasksapicall = async (value) => {
  const response = await apiInstance.get(
    `/v2/contractor/contractor-project-task/${value}`
  );
  return response.data;
};

// fetch contractor timesheet api call
export const fetchcontractortimesheetapicall = async (value) => {
  const response = await apiInstance.get(
    "/v2/contractor/fetch-contractor-timesheet",
    value
  );
  return response.data;
};
// fill contractor project timesheet api call
export const fillcontractorprojecttimesheetapicall = async (value) => {
  const response = await apiInstance.post(
    "/v2/contractor/fill-contractor-project-timesheet",
    value
  );
  return response.data;
};

export const fetchcontractortaskapicall = async (value) => {
  const response = await apiInstance.get(
    "/v2/contractor/fetch-contractor-tasks",
    value
  );
  return response.data;
};

// create contractor project api call
export const createcontractorprojectapicall = async (value) => {
  const repsonse = await apiInstance.post(
    "/v2/contractor/create-contractor-project",
    value
  );
  return repsonse.data;
};
