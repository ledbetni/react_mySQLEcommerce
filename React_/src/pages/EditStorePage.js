import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const EditStorePage = ({ storeToEdit }) => {

    const [i_id, setInventory] = useState(storeToEdit.i_id);
    const [cost, setCost] = useState(storeToEdit.cost);
    const [inventories, setInventories] = useState([]);

    useEffect(() => {
        loadInventories();
    }, []);

    const loadInventories = async () => {
        const response = await fetch('/inventories');
        const inventories = await response.json();
        setInventories(inventories.data);
    }

    const navigate = useNavigate();

    const EditStore = async () => {
        const editedStore = { i_id, cost };
        const response = await fetch(`/stores/${storeToEdit.s_id}`, {
            method: 'PUT',
            body: JSON.stringify(editedStore),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            alert("Successfully edited the store");
        } else {
            alert(`Failed to edit store, status code = ${response.status}`);
        }
        navigate("/store");
    };

    return (
        <div>
            <h1>Edit Store</h1>
            <select value={i_id} onChange={(e) => setInventory(e.target.value)}>
                {inventories.map((i) => (
                    <option key={i.i_id} value={i.i_id}>
                        {i.name}
                    </option>
                ))}
            </select>
            <input
                type="text"
                value={cost}
                placeholder="Price"
                onChange={e => setCost(e.target.value)} />

            <button onClick={EditStore}>Save</button>
        </div>
    );
}

export default EditStorePage;
