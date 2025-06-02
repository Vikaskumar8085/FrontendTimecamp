import apiInstance from "../../ApiInstance/apiInstance";

export const fetchProjectwithmilestonesapicall = async () => {
  const response = await apiInstance.get(
    "/v1/admin/fetch-projectwithmilestone"
  );
  return response.data;
};

export const addTaskapicall = async (value) => {
  const response = await apiInstance.post("/v1/admin/add-task", value);
  return response.data;
};
