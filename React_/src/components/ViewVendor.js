import React from "react";

function ViewVendor({ vendor }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Vendor ID</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{vendor._id}</td>
          <td>{vendor.name}</td>
          <td>{vendor.email}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default ViewVendor;
