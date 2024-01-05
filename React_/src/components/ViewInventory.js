import React from "react";

function ViewInventory({ inventory }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Inventory ID</th>
          <th>Vendor ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{inventory.i_id}</td>
          <td>{inventory.v_id}</td>
          <td>{inventory.name}</td>
          <td>{inventory.price}</td>
          <td>{inventory.quantity}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default ViewInventory;
