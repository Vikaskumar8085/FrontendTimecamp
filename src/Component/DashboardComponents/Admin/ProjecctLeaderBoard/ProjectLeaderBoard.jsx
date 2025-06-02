import Grid2 from "@mui/material/Grid2";
import React, {useCallback, useEffect} from "react";
import apiInstance from "../../../../ApiInstance/apiInstance";

const ProjectLeaderBoard = () => {
  const [isprojectleaderboard, setisprojectleaderboard] = React.useState([]);
  const fetchprojectleaderboardfunc = useCallback(async () => {
    const response = await apiInstance.get(
      "/v2/admin-dash/fetch-project-leaderboard-decision"
    );

    if (response.data?.success) {
      setisprojectleaderboard(response.data?.result);
    }
  }, [0]);

  useEffect(() => {
    fetchprojectleaderboardfunc();
  }, [fetchprojectleaderboardfunc]);
  let value = 35;
  return (
    <>
      <div className="project_leaderboard_wrapper">
        <div className="title">
          <h1>Project Decision Maker Leaderboard</h1>
          <p>Grack project and resource productivity in real-time</p>
        </div>
        <Grid2 container spacing={4}>
          {isprojectleaderboard.map((item, index) => {
            return (
              <Grid2 size={{md: 4, lg: 4, sm: 6, xs: 12}} key={index}>
                <div className="project_leaderboard_card">
                  <h2>{item?.ProjectName}</h2>
                </div>

                {item?.ResourcesName.flatMap((item1, index1) => {
                  return (
                    <ul key={index1}>
                      <li>{item1.FirstName}</li>
                    </ul>
                  );
                })}
              </Grid2>
            );
          })}
        </Grid2>
      </div>
    </>
  );
};

export default ProjectLeaderBoard;
