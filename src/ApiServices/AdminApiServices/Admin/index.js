import apiInstance from "../../../ApiInstance/apiInstance";

export const createadminapicall = async (value) => {
  const response = await apiInstance.post("/v1/admin/create-admin", value);
  return response.data;
};

export const updateprofileapicall = async (value) => {
  const response = await apiInstance.put(
    `/v1/admin/update-admin-profile/${value.id}`,
    value.payload
  );
  return response.data;
};

export const editadminapicall = async (value) => {
  const response = await apiInstance.put(
    `/v1/admin/update-admin/${value.id}`,
    value.payload
  );
  return response?.data;
};

// fetch admin api call
export const fetchadminapicall = async () => {
  const response = await apiInstance.get("/v1/admin/fetch-admin");
  return response.data;
};

// fetch staff
export const fetchstaffmemberapicall = async () => {
  const response = await apiInstance.get("/v1/admin//fetch-staffmembers");
  return response.data;
};

// fetch user notification

export const fetchuserNotificationapicall = async () => {
  const response = await apiInstance.get("/v1/user/fetch-user-notification");
  return response.data;
};

export const approvetimesheetbyadminapicall = async (value) => {
  const response = await apiInstance.put(
    `/v1/admin/approve-timesheet-by-admin/${value.id}`,
    value.payload
  );

  return response?.data;
};

export const disapprovetimesheetbyadminapicall = async (value) => {
  const response = await apiInstance.put(
    `/v1/admin/disapprove-timesheet-by-admin/${value.id}`,
    value.payload
  );

  return response?.data;
};

export const billedtimesheetbyadminapicall = async (value) => {
  const response = await apiInstance.put(
    `/v1/admin/billed-tiemsheet-by-admin/${value.id}`,
    value.payload
  );

  return response?.data;
};
