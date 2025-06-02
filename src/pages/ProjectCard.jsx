import React from 'react';
import './ProjectCard.scss';

const ProjectCard = ({
  projectName = 'Timecamp Webdesign',
  startDate = '28 Dec 2024',
  endDate = '01 Jan 2025',
  progress = 85,
  members = [
    'https://i.pravatar.cc/32?img=1',
    'https://i.pravatar.cc/32?img=2',
    'https://i.pravatar.cc/32?img=3',
    'https://i.pravatar.cc/32?img=4',
  ],
  extraMembers = 2
}) => {
  return (
    <div className="project-card">
      <div className="header">{projectName}</div>

      <div className="details">
        <div className="info">
          <label>📅 Start Date</label>
          <span>{startDate}</span>
        </div>
        <div className="info">
          <label>📅 End Date</label>
          <span>{endDate}</span>
        </div>
        <div className="info">
          <label>👥 Members</label>
          <div className="avatars">
            {members.slice(0, 4).map((src, i) => (
              <img key={i} src={src} alt={`Member ${i + 1}`} />
            ))}
            {extraMembers > 0 && <span className="extra">+{extraMembers}</span>}
          </div>
        </div>
      </div>

      <div className="progress-section">
        <div className="progress-bar">
          <div className="filled" style={{ width: `${progress}%` }}></div>
        </div>
        <span className="progress-text">{progress}%</span>
      </div>

      <div className="action">
        <button>🕓 Timesheet</button>
      </div>
    </div>
  );
};

export default ProjectCard;
