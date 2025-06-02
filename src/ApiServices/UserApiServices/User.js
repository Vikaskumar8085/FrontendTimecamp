import apiInstance from "../../ApiInstance/apiInstance";

export const getuserapicall = async () => {
  const response = await apiInstance.get("/v1/user/get-user");
  return response.data;
};

export const GoogleLoginAuth = async (value) => {
  const response = await apiInstance.post("/v1/user/google-auth", value);
  return response.data;
};

export const verifyTokenapicall = async (value) => {
  const response = await apiInstance.get(`/v1/user/verify/${value}`);
  return response.data;
};
