import apiInstance from "../../ApiInstance/apiInstance";

export const admindashcounterapicall = async () => {
  const response = await apiInstance.get("/v2/admin-dash/dashboard-data");
  return response.data;
};
