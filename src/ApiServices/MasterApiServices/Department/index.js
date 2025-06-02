import apiInstance from "../../../ApiInstance/apiInstance";

export const createdepartmentapicall = async (value) => {
  const response = await apiInstance.post(
    "/v1/master/create-department",
    value
  );
  return response.data;
};

export const fetchdepartmentapicall = async (value) => {
  const response = await apiInstance.get("/v1/master/fetch-department", value);
  return response.data;
};

export const removedepartmentapicall = async (value) => {
  const response = await apiInstance.delete(
    `/v1/master/remove-department/${value}`
  );
  return response.data;
};

export const updatedepartmentapicall = async (value) => {
  const response = await apiInstance.put(
    `/v1/master/update-department/${value.id}`,
    value.payload
  );
  return response.data;
};
