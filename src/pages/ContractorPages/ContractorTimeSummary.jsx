import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import ContractorTotalHoursByResources from "../../Component/DashboardComponents/Contractor/ContractorTotalHoursByResources";
import ContractorTotalHoursByProject from "../../Component/DashboardComponents/Contractor/ContractorTotalHoursByProject";
import ContractorTotalHoursByCompany from "../../Component/DashboardComponents/Contractor/ContractorTotalHoursByCompany";
import ContractorBillingStatusDistribution from "../../Component/DashboardComponents/Contractor/ContractorBillingStatusDistribution";
import ContractorProjectTimeUtilization from "../../Component/DashboardComponents/Contractor/ContractorProjectTimeUtilization";
import ContaractorDailyHours from "../../Component/DashboardComponents/Contractor/ContaractorDailyHours";
import ContractorApprovelbilingstatus from "../../Component/DashboardComponents/Contractor/ContractorApprovelbilingstatus";
import LayoutDesign from "../../Layoutcomponents/LayoutDesign/LayoutDesign";

const ContractorTimeSummary = () => {
  return (
    <LayoutDesign>
      <BreadCrumb pageName="Contractor Time Summary" />
      <div
        style={{
          width: "100%",
          padding: "20px",
          background: "white",
          margin: "10px 0px",
        }}
      >
        {/* <DateRangePicker /> */}
      </div>

      <ContractorTotalHoursByResources />
      <ContractorTotalHoursByProject />
      <ContractorTotalHoursByCompany />
      <ContractorBillingStatusDistribution />
      <ContractorProjectTimeUtilization />
      <ContaractorDailyHours />
      <ContractorApprovelbilingstatus />
    </LayoutDesign>
  );
};

export default ContractorTimeSummary;
