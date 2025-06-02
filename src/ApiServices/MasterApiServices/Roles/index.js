import apiInstance from "../../../ApiInstance/apiInstance";
// create designation
export const createrolesapicall = async (value) => {
  const repsonse = await apiInstance.post("/v1/master/create-roles", value);
  return repsonse.data;
};

// fetch designation
export const fetchroleapicall = async (value) => {
  const response = await apiInstance.get("/v1/master/fetch-roles", value);
  return response.data;
};

// remove role api call
export const removeroleapicall = async (value) => {
  const response = await apiInstance.delete(`/v1/master/remove-roles/${value}`);
  return response.data;
};

// update role api call
export const updateroleapicall = async (value) => {
  const response = await apiInstance.put(
    `/v1/master/update-roles/${value.id}`,
    value.payload
  );
  return response.data;
};
