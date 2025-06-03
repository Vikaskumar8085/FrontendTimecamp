import React from "react";
import "./UserTable.scss";

const users = [
  {
    id: 1,
    name: "Rohit Gupta",
    designation: "Marketing Coordinator",
    username: "Rohit967",
    email: "rohitgupta@gmail.com",
    phone: "+91 8769467784",
    joinDate: "25 Dec 2024",
    manager: "Melnechenko Alexandr",
    image: "https://i.pravatar.cc/40?img=1",
  },
  {
    id: 2,
    name: "Floyd Miles",
    designation: "Frontend Developer",
    username: "duncan",
    email: "floydmiles@gmail.com",
    phone: "(406) 555-0120",
    joinDate: "25 Dec 2024",
    manager: "Golubovskiy Andrey",
    image: "https://i.pravatar.cc/40?img=2",
  },
  // Add more users...
];

const UserTable = () => {
  const [selected, setSelected] = React.useState([]);
  console.log(selected, "selected");

  const isAllSelected = users.length > 0 && selected.length === users.length;
  const isIndeterminate = selected.length > 0 && selected.length < users.length;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelected([]);
    } else {
      setSelected(users.map((item) => item.id));
    }
  };

  const toggleSelectRow = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };
  return (
    <div className="user-table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>
              {" "}
              <input
                type="checkbox"
                checked={isAllSelected}
                ref={(input) => {
                  if (input) input.indeterminate = isIndeterminate;
                }}
                onChange={toggleSelectAll}
              />
              select all
            </th>
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
              <td>
                <input
                  type="checkbox"
                  checked={selected.includes(user.id)}
                  onChange={() => toggleSelectRow(user.id)}
                />
              </td>
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
