import "./Contractormilestone.scss";
const Contractormilestone = ({ milestones, loading = false }) => {
  // Function to decide progress bar color based on percentage
  const getProgressBarColor = (percentage) => {
    const p = parseFloat(percentage);
    if (p < 20) return "#ccc"; // light gray for very low progress
    if (p >= 20 && p < 40) return "green";
    if (p >= 40 && p < 60) return "orange";
    if (p >= 60) return "red";
    return "#ccc";
  };

  return (
    <>
      {milestones.map((item, index) => {
        const { Name, Description, Start_date, End_date, Is_completed } = item;

        const now = new Date();
        const start = new Date(Start_date);
        const end = new Date(End_date);

        const totalDuration = end - start;
        const elapsedDuration = now - start;

        const percentage = Math.min(
          100,
          Math.max(0, (elapsedDuration / totalDuration) * 100)
        ).toFixed(1);

        const progressBarColor = getProgressBarColor(percentage);

        return (
          <div className="milestone-card" key={index}>
            <div className="milestone-header">
              <h2>{Name}</h2>
              <span
                className={`status ${Is_completed ? "completed" : "ongoing"}`}
              >
                {Is_completed ? "Completed" : "Ongoing"}
              </span>
            </div>

            <p className="description">{Description}</p>

            <div className="date-range">
              <span>
                <strong>Start:</strong> {start.toLocaleDateString()}
              </span>
              <span>
                <strong>End:</strong> {end.toLocaleDateString()}
              </span>
            </div>

            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{
                  width: `${percentage}%`,
                  backgroundColor: progressBarColor,
                }}
              />
            </div>
            <div className="percentage-text">{percentage}% complete</div>
          </div>
        );
      })}
      {/* <div style={{backgroundColor: "white", height: "100%"}}>
        {!milestones.length && <Empty />}
      </div>{" "} */}
    </>
  );
};
export default Contractormilestone;
