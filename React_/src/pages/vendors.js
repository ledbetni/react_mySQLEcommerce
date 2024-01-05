import React from 'react';
import { Link } from 'react-router-dom';
import VendorList from '../components/VendorList';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ViewVendor from '../components/ViewVendor';

function Vendors({ setVendorToEdit }) {
    const [vendors, setVendors] = useState([]);
    const [vendor, setVendor] = useState({
        _id: "",
        name: "",
        email: "",
      });
      const navigate = useNavigate();

    const onDelete = async (_id) => {
        const response = await fetch(`/vendors/${_id}`, { method: 'DELETE' });
        console.log(`Delete Vendors ID: ${_id}`);
        if (response.status === 204) {
            setVendors(vendors.filter(m => m._id !== _id));
        } else {
            console.error(`Failed to delete vendor with _id = ${_id}, status code = ${response.status}`);
        }
    };

    const onEdit = vendor => {
        setVendorToEdit(vendor);
        navigate("/edit-vendor");
    }

    const loadVendors = async () => {
        const response = await fetch('/vendors');
        const vendors = await response.json();
        console.log("vendors response:" + response);
        setVendors(vendors.data);
    }

    const findVendor = async () => {
        const response = await fetch(`/vendors/${vendId}`);
        let vendor = {};
        const result = await response.json();
        if (result.length > 0) {
          vendor = result[0];
        } else {
          vendor._id = "";
          vendor.name = "";
          vendor.email = "";
        }
        setVendor(vendor);
      };

    useEffect(() => {
        loadVendors();
    }, []);

    const [vendId, setVendId] = useState("");
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const addVendor = async () => {
        const newVendor = { name, email };
        if (newVendor.name == "" || newVendor.email == ""){
          alert("Fields cannot be empty");
          return;
        }
        await fetch('/vendors', {
            method: 'POST',
            body: JSON.stringify(newVendor),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if (response.status === 201) {
                //alert("Successfully added the vendor");
                setName("");
                setEmail("");
                loadVendors();
            } else {
                alert(`Failed to add vendor, status code = ${response.status}`);
            }
        });

    };


    return(
        <div>
            <h1 className="title">Vendors</h1>

            <ul>
                <li><Link className="App-link" to="/">Home</Link></li>
                <li><Link className="App-link" to="/customers">Customers</Link></li>
                <li><Link className="App-link" to="/inventories">Inventories</Link></li>
                <li><Link className="App-link" to="/orders">Orders</Link></li>
                <li><Link className="App-link" to="/store">Store</Link></li>
                <li>Vendors</li>
            </ul>

            <p>This website will serve as an eCommerce platform where customers may purchase orders from the store which sources items from various vendors.</p>
            <p>The Vendor table is where we store vendor information.</p>


            <fieldset>
                <h2>Search for a Vendor</h2>
                <input
                    type="text"
                    placeholder="Search by Vendor_ID"
                    value={vendId}
                    onChange={(e) => setVendId(e.target.value)}
                />
                <button onClick={findVendor}>Search</button>
                    {vendor.name
                        ? <fieldset><ViewVendor vendor={vendor} /></fieldset>
                        : ""
                    }
            </fieldset>

            <fieldset>
                <h2>Add a Vendor</h2>
                <input
                    type="text"
                    placeholder="Vendor Name"
                    value={name}
                    onChange={e => setName(e.target.value)} />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)} />
                <button onClick={addVendor}>Add</button>
            </fieldset>

            <fieldset>
                <h2>Vendors</h2>
                <VendorList vendors={vendors} onDelete={onDelete} onEdit={onEdit}></VendorList>
            </fieldset>



        </div>
    );
}

export default Vendors;
