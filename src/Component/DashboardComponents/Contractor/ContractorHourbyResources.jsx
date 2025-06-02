import React, {useEffect} from "react";
import apiInstance from "../../../ApiInstance/apiInstance";

const ContractorHourbyResources = () => {
  const fetchcontractortimehoursfunc = async () => {
    try {
      const response = await apiInstance.get(
        "/v2/contractor/fetch-contractor-by-hours"
      );
      console.log(response, "response");
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    fetchcontractortimehoursfunc();
  });

  return <div>ContractorHourbyResources</div>;
};

export default ContractorHourbyResources;
