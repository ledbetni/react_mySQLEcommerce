import React from "react";

function ViewStore({ store }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Store ID</th>
          <th>Inventory ID</th>
          <th>cost</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{store.s_id}</td>
          <td>{store.i_id}</td>
          <td>{store.cost}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default ViewStore;
