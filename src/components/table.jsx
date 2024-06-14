import React from "react";
import "../table.css";

const Table = () => {
  const data = [
    { Name: "John Doe", Age: 28, Country: "USA" },
    { Name: "Anna Smith", Age: 24, Country: "UK" },
    { Name: "Peter Johnson", Age: 30, Country: "Canada" },
  ];
  return (
    <div className="table-container">
      <table className="styled-table">
        <thead>
          <tr>
            {Object.keys(data[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? "even" : "odd"}>
              {Object.values(row).map((cell, i) => (
                <td key={i}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
