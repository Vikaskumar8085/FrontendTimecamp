import apiInstance from "../../ApiInstance/apiInstance";

export const loginapicall = async (value) => {
  console.log(value);
  const response = await apiInstance.post("/v1/user/login", value);
  return response.data;
};

export const signupapicall = async (value) => {
  const response = await apiInstance.post("/v1/user/user_register", value);
  return response.data;
};
