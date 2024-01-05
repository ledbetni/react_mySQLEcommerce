import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const EditInventoryPage = ({ inventoryToEdit }) => {

    const [v_id, setVendor] = useState(inventoryToEdit.v_id);
    const [name, setName] = useState(inventoryToEdit.name);
    const [price, setPrice] = useState(inventoryToEdit.price);
    const [quantity, setQuantity] = useState(inventoryToEdit.quantity);
    const [vendors, setVendors] = useState([]);
    const [inventories, setInventories] = useState([]);

    const loadVendors = async () => {
        const response = await fetch('/vendors');
        const vendors = await response.json();
        console.log("vendors response:" + response);
        setVendors(vendors.data);
    }

    useEffect(() => {
        loadVendors();
    }, []);

    const navigate = useNavigate();

    const EditInventory = async () => {
        const editedInventory = { v_id, name, price, quantity };
        console.log("Edit Inventory JSON:" + JSON.stringify(editedInventory));
        const response = await fetch(`/inventories/${inventoryToEdit.i_id}`, {
            method: 'PUT',
            body: JSON.stringify(editedInventory),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log("EditInventory put request:" + JSON.stringify(response));
        if (response.status === 200) {
            alert("Successfully edited the inventory");
        } else {
            alert(`Failed to edit inventory, status code = ${response.status}`);
        }
        navigate("/inventories");
    };

    return (
        <div>
            <h1>Edit Inventory</h1>

            <select value={v_id} onChange={(e) => setVendor(e.target.value)}>
                {vendors.map((v) => (
                    <option key={v._id} value={v._id}>
                        {v.name}
                    </option>
                ))}
            </select>

            <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)} />
                <input
                    type="text"
                    value={price}
                    placeholder="Enter Last Name here"
                    onChange={e => setPrice(e.target.value)} />
                <input
                    type="email"
                    placeholder="Enter Email here"
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)} />

            <button onClick={EditInventory}>Save</button>
        </div>
    );
}

export default EditInventoryPage;
