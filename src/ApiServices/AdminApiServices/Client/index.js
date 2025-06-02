import apiInstance from "../../../ApiInstance/apiInstance";

export const createclientapicall = async (value) => {
  const response = await apiInstance.post("/v1/admin/create-client", value);
  return response.data;
};

export const fetchclientapicall = async (value) => {
  const response = await apiInstance.get("/v1/admin/fetch-client", value);
  return response.data;
};

export const fetchactiveclientapicall = async (value) => {
  const response = await apiInstance.get(
    "/v1/admin/fetch-active-client",
    value
  );
  return response.data;
};

export const fetchinactiveclientapicall = async (value) => {
  const response = await apiInstance.get(
    "/v1/admin/fetch-inactive-client",
    value
  );
  return response.data;
};

export const fetchdeadclientapicall = async (value) => {
  const response = await apiInstance.get("/v1/admin/fetch-dead-client", value);
  return response.data;
};

export const fetchsignleclientapicall = async (value) => {
  const response = await apiInstance.get(
    `/v1/admin/fetch-single-client/${value}`
  );
  return response.data;
};

// fetch client projects
export const fetchclientprojectsapicall = async (value) => {
  console.log(value, "afsdfasdf");
  const response = await apiInstance.get(
    `/v1/admin/fetch-client-projects/${value}`
  );
  return response.data;
};

export const fetchclientTimesheetapicall = async (value) => {
  const response = await apiInstance.get(
    `/v1/admin/fetch-client-timesheet/${value}`
  );
  return response.data;
};

export const updateclientapicall = async (value) => {
  const response = await apiInstance.put(
    `/v1/admin/edit-client/${value.id}`,
    value.payload
  );
  return response.data;
};

export const removeclientapicall = async (value) => {
  const response = await apiInstance.delete(`/v1/admin/remove-client/${value}`);
  return response?.data;
};
