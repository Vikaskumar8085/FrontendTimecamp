import React from "react";

const Table = ({data, columns}) => {
  return (
    <table
      style={{width: "100%", borderCollapse: "collapse", marginBottom: "1rem"}}
    >
      <thead>
        <tr>
          {columns.map((col, idx) => (
            <th
              key={idx}
              style={{
                border: "1px solid #ccc",
                padding: "0.5rem",
                backgroundColor: "#f0f0f0",
              }}
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rIdx) => (
          <tr key={rIdx}>
            {columns.map((col, cIdx) => (
              <td
                key={cIdx}
                style={{border: "1px solid #ccc", padding: "0.5rem"}}
              >
                {row[col.accessor]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
