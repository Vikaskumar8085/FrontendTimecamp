import apiInstance from "../../ApiInstance/apiInstance";

export const createcompanyapicall = async (value) => {
  const repsonse = await apiInstance.post("/v1/user/create-company", value);
  return repsonse.data;
};

export const fetchcompanyapicall = async () => {
  const response = await apiInstance.get("/v1/user/fetch-company");
  return response.data;
};
