import apiInstance from "../../../ApiInstance/apiInstance";
// create designation

export const createdesignationapicall = async (value) => {
  console.log(value, "value");
  const repsonse = await apiInstance.post(
    "/v1/master/create-designation",
    value
  );

  // console.log(response, "data");
  return await repsonse.data;
};

// fetch designation
export const fetchdesignationapicall = async (value) => {
  const response = await apiInstance.get("/v1/master/fetch-designation", value);
  return response.data;
};

// remove designation api call
export const removedesignationapicall = async (value) => {
  const response = await apiInstance.delete(
    `/v1/master/remove-designation/${value}`
  );
  return response.data;
};

// update designation api call
export const updatedesignationapicall = async (value) => {
  const response = await apiInstance.put(
    `/v1/master/update-designation/${value.id}`,
    value.payload
  );
  return response.data;
};
