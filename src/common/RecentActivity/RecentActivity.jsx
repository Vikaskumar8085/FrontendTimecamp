import React from "react";
import "./RecentActivity.scss";
import {CheckCircle} from "lucide-react";

const RecentActivity = ({activities = []}) => {
  return (
    <div className="recent-activity">
      <h3 className="title">Recent Activity</h3>
      <div className="activity-list">
        {activities.map((activity, index) => (
          <div className="activity-item" key={index}>
            <div className="avatar">
              {activity.avatar ? (
                <img src={activity.avatar} alt="avatar" />
              ) : (
                <span className="initial">{activity.initial}</span>
              )}
            </div>
            <div className="activity-content">
              <div className="message">{activity.Message}</div>
              <div className="time">{moment(activity.updatedAt).fromNow()}</div>
            </div>
            <CheckCircle className="icon" size={20} color="#00C49F" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
