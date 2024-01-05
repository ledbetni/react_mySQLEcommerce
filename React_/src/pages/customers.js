import React from "react";
import { Link } from "react-router-dom";
import CustomerList from "../components/CustomerList";
import ViewCustomer from "../components/ViewCustomer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Customers({ setCustomerToEdit }) {
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState({
    _id: "",
    fname: "",
    lname: "",
    email: "",
  });
  const navigate = useNavigate();

  const onDelete = async (_id) => {
    const response = await fetch(`/customers/${_id}`, { method: "DELETE" });
    if (response.status === 204) {
      setCustomers(customers.filter((m) => m._id !== _id));
    } else {
      console.error(
        `Failed to delete customer with _id = ${_id}, status code = ${response.status}`
      );
    }
  };

  const onEdit = (customer) => {
    setCustomerToEdit(customer);
    navigate("/edit-customer");
  };

  const loadCustomers = async () => {
    const response = await fetch("/db/customers");
    const customers = await response.json();
    if (response.status == 500){
      alert(`Failed to load customer, status code = ${response.status}`);
    }
    console.log(customers);
    if (response.status == 200){
      setCustomers(customers.data);
    }

  };

  const findCustomer = async () => {
    const response = await fetch(`/customers/${custid}`);
    let customer = {};
    const result = await response.json();
    if (result.length > 0) {
      customer = result[0];
    } else {
      customer._id = "";
      customer.fname = "";
      customer.lname = "";
      customer.email = "";
    }
    setCustomer(customer);
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const [custid, setCustId] = useState("");
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");

  const addCustomer = async () => {
    const newCustomer = { fname, lname, email };
    if (newCustomer.fname == "" || newCustomer.lname == "" || newCustomer.email == ""){
      alert("Fields cannot be empty");
      return;
    }

    await fetch("/customers", {
      method: "POST",
      body: JSON.stringify(newCustomer),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status === 201) {
        //alert("Successfully added the customer");
        setFName("");
        setLName("");
        setEmail("");
        loadCustomers();
      } else {
        if(response.status === 401){
          alert("Email is a duplicate");
          return;
        }
        alert(`Failed to add customer, status code = ${response.status}`);
      }
    });
  };


  return (
    <div>
      <h1 className="title">Customers</h1>
      <ul>
        <li>
          <Link className="App-link" to="/">
            Home
          </Link>
        </li>
        <li>Customers</li>
        <li>
          <Link className="App-link" to="/inventories">
            Inventories
          </Link>
        </li>
        <li>
          <Link className="App-link" to="/orders">
            Orders
          </Link>
        </li>
        <li>
          <Link className="App-link" to="/store">
            Store
          </Link>
        </li>
        <li>
          <Link className="App-link" to="/vendors">
            Vendors
          </Link>
        </li>
      </ul>

      <p>
        This website will serve as an eCommerce platform where customers may
        purchase orders from the store which sources items from various vendors.
      </p>
      <p>The Customer table is where we store customer information.</p>


      <fieldset>
        <h2>Search for a Customer</h2>
        <input
          type="text"
          placeholder="Search by Customer_ID"
          value={custid}
          onChange={(e) => setCustId(e.target.value)}
        />
        <button onClick={findCustomer}>Search</button>
            {customer.fname
                ? <fieldset><ViewCustomer customer={customer} /></fieldset>
                : ""
            }
      </fieldset>

      <fieldset>
        <h2>Add a Customer</h2>
        <input
          type="text"
          placeholder="First Name"
          value={fname}
          onChange={(e) => setFName(e.target.value)}
        />
        <input
          type="text"
          value={lname}
          placeholder="Last Name"
          onChange={(e) => setLName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={addCustomer}>Add</button>
      </fieldset>

      <fieldset>
        <h2>Customers</h2>
        <CustomerList
          customers={customers}
          onDelete={onDelete}
          onEdit={onEdit}
        ></CustomerList>
      </fieldset>
    </div>
  );
}

export default Customers;
