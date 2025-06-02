import React, {useState, useMemo} from "react";
import "./TableWithFilter.scss";

const data = [
  {id: 1, name: "John Doe", email: "john@example.com", status: "Active"},
  {id: 2, name: "Jane Smith", email: "jane@example.com", status: "Inactive"},
  {id: 3, name: "Bob Johnson", email: "bob@example.com", status: "Active"},
  {id: 4, name: "Alice Cooper", email: "alice@example.com", status: "Pending"},
];

export default function TableWithFilter() {
  const [selected, setSelected] = useState([]);
  const [filters, setFilters] = useState({status: "", name: ""});

  // Get unique values for filters
  const uniqueStatus = useMemo(
    () => [...new Set(data.map((d) => d.status))],
    []
  );
  const uniqueNames = useMemo(() => [...new Set(data.map((d) => d.name))], []);

  // Filter data based on dropdowns
  const filteredData = data.filter((item) => {
    const matchStatus = filters.status ? item.status === filters.status : true;
    const matchName = filters.name ? item.name === filters.name : true;
    return matchStatus && matchName;
  });

  // Select All logic based on filtered data
  const isAllSelected =
    filteredData.length > 0 && selected.length === filteredData.length;
  const isIndeterminate =
    selected.length > 0 && selected.length < filteredData.length;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelected([]);
    } else {
      setSelected(filteredData.map((item) => item.id));
    }
  };

  const toggleSelectRow = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  // Handle dropdown change
  const handleFilterChange = (e) => {
    const {name, value} = e.target;
    setFilters((prev) => ({...prev, [name]: value}));
    setSelected([]); // Reset selection on filter change
  };

  return (
    <>
      <div className="filters">
        <label>
          Status:
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            {uniqueStatus.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        <label>
          Name:
          <select
            name="name"
            value={filters.name}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            {uniqueNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <table className="select-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={isAllSelected}
                ref={(input) => {
                  if (input) input.indeterminate = isIndeterminate;
                }}
                onChange={toggleSelectAll}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(({id, name, email, status}) => (
            <tr key={id} className={selected.includes(id) ? "selected" : ""}>
              <td>
                <input
                  type="checkbox"
                  checked={selected.includes(id)}
                  onChange={() => toggleSelectRow(id)}
                />
              </td>
              <td>{name}</td>
              <td>{email}</td>
              <td>{status}</td>
            </tr>
          ))}
          {filteredData.length === 0 && (
            <tr>
              <td colSpan="4" style={{textAlign: "center", padding: "20px"}}>
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
