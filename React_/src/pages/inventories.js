import React from 'react';
import { Link } from 'react-router-dom';
import InventoryList from '../components/InventoryList';
import ViewInventory from "../components/ViewInventory";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Inventories({ setInventoryToEdit }) {
    const [inventories, setInventories] = useState([]);
    const [inventory, setInventory] = useState({
        i_id: "",
        v_id: "",
        name: "",
        price: "",
        quantity: "",
    });
    // FK
    const [vendors, setVendors] = useState([]);
    const navigate = useNavigate();

    const onDelete = async (i_id) => {
        const response = await fetch(`/inventories/${i_id}`, { method: 'DELETE' });
        console.log("Delete Vendor: " + JSON.stringify(response));
        if (response.status === 204) {
            setInventories(inventories.filter(m => m.i_id !== i_id));
        } else {
            console.error(`Failed to delete inventory with _id = ${i_id}, status code = ${response.status}`);
        }
    };

    const onEdit = inventory => {
        setInventoryToEdit(inventory);
        navigate("/edit-inventory");
    }

    const loadInventories = async () => {
        const response = await fetch('/inventories');
        const inventories = await response.json();
        setInventories(inventories.data);
    }

    const loadVendors = async () => {
        const response = await fetch("/vendors");
        const vendors = await response.json();
        setVendors(vendors.data);
        setVendor(vendors.data[0]._id);
        console.log("Load Vendors Response" + vendors);
      };

    const findInventory = async () => {
        const response = await fetch(`/inventories/${invId}`);
        let inventory = {};
        const result = await response.json();
        if (result.length > 0) {
            inventory = result[0];
        } else {
            inventory.i_id = "";
            inventory.v_id = "";
            inventory.name = "";
            inventory.price = "";
            inventory.quantity = "";
        }
        setInventory(inventory);
      };

    useEffect(() => {
        loadInventories();
        loadVendors();
    }, []);

    const [invId, setInvId] = useState("");
    const [v_id, setVendor] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');

    const addInventory = async () => {
        const newInventory = { v_id, name, price, quantity };
        if (newInventory.v_id == "" || newInventory.name == "" || newInventory.price == "" || newInventory.quantity == ""){
          alert("Fields cannot be empty");
          return;
        }
        console.log("Add Inventory JSON:" + JSON.stringify(newInventory));
        await fetch('/inventories', {
            method: 'POST',
            body: JSON.stringify(newInventory),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            console.log(response);
            if (response.status === 200) {
                //alert("Successfully added the inventory");
                setVendor("");
                setName("");
                setPrice("");
                setQuantity("");
                loadInventories();
            } else {
                alert(`Failed to add inventory, status code = ${response.status}`);
            }
        });
    };


    return(
        <div>
            <h1 className="title">Inventories</h1>

            <ul>
                <li><Link className="App-link" to="/">Home</Link></li>
                <li><Link className="App-link" to="/customers">Customers</Link></li>
                <li>Inventories</li>
                <li><Link className="App-link" to="/orders">Orders</Link></li>
                <li><Link className="App-link" to="/store">Store</Link></li>
                <li><Link className="App-link" to="/vendors">Vendors</Link></li>
            </ul>

            <p>This website will serve as an eCommerce platform where customers may purchase orders from the store which sources items from various vendors.</p>
            <p>The Inventories table is where our inventories are saved.</p>

            <fieldset>
                <h2>Search for an Inventory</h2>
                <input
                    type="text"
                    placeholder="Search by Inventory_ID"
                    value={invId}
                    onChange={(e) => setInvId(e.target.value)}
                />
                <button onClick={findInventory}>Search</button>
                    {inventory.name
                        ? <fieldset><ViewInventory inventory={inventory} /></fieldset>
                        : ""
                    }
            </fieldset>

            <fieldset>
                <h2>Add an Inventory</h2>

                <select value={v_id} onChange={(e) => setVendor(e.target.value)}>
                    {vendors.map((v) => (
                        <option key={v._id} value={v._id}>
                            {v.name}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    placeholder="Inventory Name"
                    value={name}
                    onChange={e => setName(e.target.value)} />
                <input
                    type="text"
                    value={price}
                    placeholder="Price"
                    onChange={e => setPrice(e.target.value)} />
                <input
                    type="number"
                    placeholder="Quantity in-stock"
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)} />

                <button onClick={addInventory}>Add</button>
            </fieldset>

            <fieldset>
                <h2>Inventory</h2>
                <InventoryList inventories={inventories} onDelete={onDelete} onEdit={onEdit}></InventoryList>
            </fieldset>




        </div>
    );
}

export default Inventories;
