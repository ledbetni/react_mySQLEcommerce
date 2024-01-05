import React from 'react';
import { Link } from 'react-router-dom';
import StoreList from '../components/StoreList';
import ViewStore from '../components/ViewStore';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Store({ setStoreToEdit }) {
    const [stores, setStores] = useState([]);
    const [store, setStore] = useState({
        s_id: "",
        i_id: "",
        cost: "",
    });
    // FK
    const [inventories, setInventories] = useState([]);
    const navigate = useNavigate();

    const onDelete = async (s_id) => {
        const response = await fetch(`/stores/${s_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            setStores(stores.filter(m => m.s_id !== s_id));
        } else {
            console.error(`Failed to delete store with _id = ${s_id}, status code = ${response.status}`);
        }
    };

    const onEdit = store => {
        setStoreToEdit(store);
        navigate("/edit-store");
    };

    const loadStores = async () => {
        const response = await fetch('/stores');
        const stores = await response.json();
        console.log("store response:" + JSON.stringify(response));
        setStores(stores.data);
    };

    const loadInventories = async () => {
        const response = await fetch('/inventories');
        const inventories = await response.json();
        setInventories(inventories.data);
        setInventory(inventories.data[0].i_id);
    };

    const findStore = async () => {
        const response = await fetch(`/stores/${storeId}`);
        let store = {};
        const result = await response.json();
        if (result.length > 0) {
            store = result[0];
        } else {
            store.s_id = "";
            store.i_id = "";
            store.cost = "";
        }
        console.log("findStore result:" + JSON.stringify(result));
        setStore(store);
      };

    useEffect(() => {
        loadStores();
        loadInventories();
    }, []);

    const [storeId, setStoreId] = useState("");
    const [i_id, setInventory] = useState('');
    const [cost, setCost] = useState('');

    const addStore = async () => {
        const newStore = { i_id, cost };
        if (newStore.i_id == "" || newStore.cost == ""){
          alert("Fields cannot be empty");
          return;
        }
        console.log("New Store Item JSON:" + JSON.stringify(newStore));
        await fetch('/stores', {
            method: 'POST',
            body: JSON.stringify(newStore),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if (response.status === 201) {
                //alert("Successfully added the store");
                setInventory("");
                setCost("");
                loadStores();
            } else {
                alert(`Failed to add store, status code = ${response.status}`);
            }
        });
    };



    return(
        <div>
            <h1 className="title">Store</h1>

            <ul>
                <li><Link className="App-link" to="/">Home</Link></li>
                <li><Link className="App-link" to="/customers">Customers</Link></li>
                <li><Link className="App-link" to="/inventories">Inventories</Link></li>
                <li><Link className="App-link" to="/orders">Orders</Link></li>
                <li>Store</li>
                <li><Link className="App-link" to="/vendors">Vendors</Link></li>
            </ul>

            <p>This website will serve as an eCommerce platform where customers may purchase orders from the store which sources items from various vendors.</p>
            <p>The "Store" is where our items for sale are listed.</p>



            <fieldset>
                <h2>Search for a Store Item</h2>
                <input
                    type="text"
                    placeholder="Search by Store_ID"
                    value={storeId}
                    onChange={(e) => setStoreId(e.target.value)}
                />
                <button onClick={findStore}>Search</button>
                    {store.cost
                        ? <fieldset><ViewStore store={store} /></fieldset>
                        : ""
                    }
            </fieldset>

            <fieldset>
                <h2>Add a Store Item</h2>

                <select value={i_id} onChange={(p) => setInventory(p.target.value)}>
                    {inventories.map((i) => (
                        <option key={i.i_id} value={i.i_id}>
                            {i.name}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    placeholder="Price"
                    value={cost}
                    onChange={e => setCost(e.target.value)} />

                <button onClick={addStore}>Add</button>
            </fieldset>

            <fieldset>
                <h2>Store Items</h2>
                <StoreList stores={stores} onDelete={onDelete} onEdit={onEdit}></StoreList>
            </fieldset>
        </div>
    );
}

export default Store;
