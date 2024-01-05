import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const EditCustomerPage = ({ customerToEdit }) => {
  const [fname, setFName] = useState(customerToEdit.fname);
  const [lname, setLName] = useState(customerToEdit.lname);
  const [email, setEmail] = useState(customerToEdit.email);

  const navigate = useNavigate();

  const EditCustomer = async () => {
    const editedCustomer = { fname, lname, email };
    const response = await fetch(`/customers/${customerToEdit._id}`, {
      method: "PUT",
      body: JSON.stringify(editedCustomer),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      alert("Successfully edited the customer");
    } else {
      alert(`Failed to edit customer, status code = ${response.status}`);
    }
    navigate("/customers");
  };

  return (
    <div>
      <h1>Edit Customer</h1>
      <input
        type="text"
        placeholder="Enter First Name here"
        value={fname}
        onChange={(e) => setFName(e.target.value)}
      />
      <input
        type="text"
        value={lname}
        placeholder="Enter Last Name here"
        onChange={(e) => setLName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Enter Email here"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={EditCustomer}>Save</button>
    </div>
  );
};

export default EditCustomerPage;
