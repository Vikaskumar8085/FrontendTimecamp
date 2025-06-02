import apiInstance from "../../../ApiInstance/apiInstance";
// create designation

export const createcolorapicall = async (value) => {
  console.log(value, "value");
  const repsonse = await apiInstance.post("/v1/master/create-color", value);

  return await repsonse.data;
};

// fetch color
export const fetchcolorapicall = async (value) => {
  const response = await apiInstance.get("/v1/master/fetch-color", value);
  return response.data;
};

// remove color api call
export const removecolorapicall = async (value) => {
  const response = await apiInstance.delete(`/v1/master/remove-color/${value}`);
  return response.data;
};

// update color api call
export const updatecolorapicall = async (value) => {
  const response = await apiInstance.put(
    `/v1/master/update-color/${value.id}`,
    value.payload
  );
  return response.data;
};
