import apiInstance from "../../../ApiInstance/apiInstance";

export const fetchHolidaylistapicall = async (value) => {
  const response = await apiInstance.get("/v1/master/fetch-holiday", value);
  return response.data;
};

export const createholidayapicall = async (value) => {
  const response = await apiInstance.post("/v1/master/create-holiday", value);
  return response.data;
};

// remove data

export const removeholidaylistapicall = async (value) => {
  const response = await apiInstance.delete(
    `/v1/master/remove-holiday/${value}`
  );
  return response.data;
};

// update data
export const updateholidaylistapicall = async (value) => {
  const response = await apiInstance.delete(
    `/v1/master/remove-holiday/${value.id}`,
    value.payload
  );
  return response.data;
};
