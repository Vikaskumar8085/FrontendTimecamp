import React from 'react';
import './UserTable.scss';

const users = [
  {
    id: 1,
    name: 'Rohit Gupta',
    designation: 'Marketing Coordinator',
    username: 'Rohit967',
    email: 'rohitgupta@gmail.com',
    phone: '+91 8769467784',
    joinDate: '25 Dec 2024',
    manager: 'Melnechenko Alexandr',
    image: 'https://i.pravatar.cc/40?img=1',
  },
  {
    id: 2,
    name: 'Floyd Miles',
    designation: 'Frontend Developer',
    username: 'duncan',
    email: 'floydmiles@gmail.com',
    phone: '(406) 555-0120',
    joinDate: '25 Dec 2024',
    manager: 'Golubovskiy Andrey',
    image: 'https://i.pravatar.cc/40?img=2',
  },
  // Add more users...
];

const UserTable = () => {
  return (
    <div className="user-table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>S.No</th>
            <th>Name & Designation</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Joining Date</th>
            <th>Manager</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={user.id}>
              <td><input type="checkbox" /></td>
              <td>{idx + 1}</td>
              <td>
                <div className="user-info">
                  <img src={user.image} alt={user.name} />
                  <div>
                    <strong>{user.name}</strong>
                    <span>{user.designation}</span>
                  </div>
                </div>
              </td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <span className="date-icon">📅</span> {user.joinDate}
              </td>
              <td>{user.manager}</td>
              <td>
                <button className="edit-btn">✏️ Edit</button>
                <button className="view-btn">👁️ View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
