import apiInstance from "../../ApiInstance/apiInstance";

export const fetchmanagerclientsapicall = async () => {
  const response = await apiInstance.get("/v2/manager/fetch-manager-client");
  return response.data;
};

export const fetchmanagerstaffapicall = async () => {
  const response = await apiInstance.get("/v2/manager/fetch-manager-staff");
  return response.data;
};

export const fetchmanagerrolesapicall = async () => {
  const response = await apiInstance.get("/v2/manager/fetch-manager-roles");
  return response.data;
};

export const fetchmanagerprojectwithmilestoneapicall = async () => {
  const response = await apiInstance.get(
    "/v2/manager/fetch-manager-projectwithmilestone"
  );
  return response?.data;
};

export const createManagerProjectapicall = async (value) => {
  const response = await apiInstance.post(
    "/v2/manager/create-manager-project",
    value
  );
  return response?.data;
};

export const managerfilltimesheetdataapicall = async (value) => {
  const response = await apiInstance.post(
    "/v2/manager/fill-manager-timesheet",
    value
  );
  return response?.data;
};

// fetch manager team info
export const fetchmanagerteaminfoapicall = async (value) => {
  const response = await apiInstance.get(
    `/v2/manager/fetch-manager-team-info/${value}`
  );
  return response?.data;
};
//  fetch manager team info

// fetch manager team project
export const fetchmanagerteamprojectsapicall = async (value) => {
  const response = await apiInstance.get(
    `/v2/manager/fetch-manager-team-project/${value}`
  );
  return response?.data;
};
// fetch manager team project

export const updatemanagerprojectapicall = async (value) => {
  const response = await apiInstance.put(
    `/v2/manager/update-manager-team/${value.id}`,
    value.payload
  );
  return response?.data;
};
// fetch manager team project timesheet

export const fetchmanagerteamprojectTimesheetapicall = async (value) => {
  const response = await apiInstance.get(
    `/v2/manager/fetch-manager-team-project-timesheet/${value}`
  );
  return response?.data;
};
