import apiInstance from "../../../ApiInstance/apiInstance";

export const createweekoffdaysapicall = async (value) => {
  const response = await apiInstance.post(
    "/v1/master/create-weekoffday",
    value
  );
  return response.data;
};

export const fetchweekoffdaysapicall = async (value) => {
  const response = await apiInstance.get("/v1/master/fetch-weekoffday", value);
  return response.data;
  F;
};
