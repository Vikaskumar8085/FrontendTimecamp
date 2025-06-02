import apiInstance from "../../../ApiInstance/apiInstance";
// create contractor
export const addContractorapicall = async (value) => {
  const response = await apiInstance.post("/v1/admin/create-contractor", value);
  return response.data;
};

// update contractor
export const updatecontractorapicall = async (value) => {
  const response = await apiInstance.put(
    `/v1/admin/edit-contractor/${value.id}`,
    value.payload
  );
  return response.data;
};
// fetch contractor
export const fetchcontractorapicall = async (value) => {
  const response = await apiInstance.get("/v1/admin/fetch-contractor", value);
  return response.data;
};

// fetch active contractor
export const fetchactivecontractorapicall = async (value) => {
  const response = await apiInstance.get(
    "/v1/admin/fetch-active-contractor",
    value
  );
  return response.data;
};

//   fetch inactive contracotr
export const fetchinactivecontractorapicall = async () => {
  const response = await apiInstance.get("/v1/admin/fetch-inactive-contractor");
  return response.data;
};

// fetch single contractor
export const fetchsinglecontractorapicall = async (value) => {
  const response = await apiInstance.get(
    `/v1/admin/fetch-single-contractor/${value}`
  );
  return response.data;
};

export const fetchcontractorprojectapicall = async (value) => {
  const response = await apiInstance.get(
    `/v1/admin/fetch-contractor-project/${value}`
  );
  return response.data;
};

export const fetchcontractorprojectTimesheetapicall = async (value) => {
  const response = await apiInstance.get(
    `/v1/admin/fetch-contractor-timesheet/${value}`
  );
  return response.data;
};
