import React from "react";

function ViewOrder({ order }) {
  return (
    <table>
      <thead>
        <tr>
            <th>Order ID</th>
            <th>Customer ID</th>
            <th>Total</th>
            <th>Store ID</th>
        </tr>
      </thead>
      <tbody>
        <tr>
            <td>{order.o_id}</td>
            <td>{order.c_id}</td>
            <td>{order.total}</td>
            <td>{order.s_id}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default ViewOrder;
