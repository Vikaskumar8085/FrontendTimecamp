import React, {useEffect} from "react";
import TimesheetTable from "./ProjectTimesheetComp/TimesheetTable";

const ProjectTimesheet = ({
  Isprojecttimesheetdata,
  approveprojectfunc,
  disapproveprojectfunc,
  billedprojectfunc,
  selectedItems,
  setSelectedItems,
}) => {
  return (
    <div>
      <TimesheetTable
        approveprojectfunc={approveprojectfunc}
        disapproveprojectfunc={disapproveprojectfunc}
        billedprojectfunc={billedprojectfunc}
        data={Isprojecttimesheetdata}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />
    </div>
  );
};

export default ProjectTimesheet;
