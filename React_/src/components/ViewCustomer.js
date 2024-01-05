import React from "react";

function ViewCustomer({ customer }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Customer ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{customer._id}</td>
          <td>{customer.fname}</td>
          <td>{customer.lname}</td>
          <td>{customer.email}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default ViewCustomer;
