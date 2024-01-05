import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const EditOrderPage = ({ orderToEdit }) => {

    const [c_id, setCustomer_id] = useState(orderToEdit.customer_id);
    const [total, setTotal] = useState(orderToEdit.total);
    const [s_id, setStore_id] = useState(orderToEdit.s_id);
    const [customers, setCustomers] = useState([]);
    const [stores, setStores] = useState([]);

    const navigate = useNavigate();

    const loadCustomers = async () => {
        const response = await fetch('/db/customers');
        const customers = await response.json();
        setCustomers(customers.data);
        setCustomer_id(customers.data[0]._id);
    };

    const loadStores = async () => {
          const response = await fetch('/stores');
          const stores = await response.json();
          setStores(stores.data);
          setStore_id(stores.data[0].s_id);
      };

    useEffect(() => {
      loadCustomers();
      loadStores();
  }, []);


    const EditOrder = async () => {
        const editedOrder = { c_id, total, s_id };
        const response = await fetch(`/orders/${orderToEdit.o_id}`, {
            method: 'PUT',
            body: JSON.stringify(editedOrder),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log("editedOrder:" + JSON.stringify(editedOrder));
        console.log("response:" + JSON.stringify(response));
        if (response.status === 200) {
            alert("Successfully edited the order");
        } else {
            alert(`Failed to edit order, status code = ${response.status}`);
        }
        navigate("/orders");
    };

    return (
        <div>
            <h1>Edit Order</h1>
            {/*}<input
                type="text"
                placeholder="Customer ID"
                 value={c_id}
                 onChange={e => setCustomer_id(e.target.value)}
                />*/}
                <select value={c_id} onChange={(e) => setCustomer_id(e.target.value)}>
                    {customers.map((i) => (
                        <option key={i._id} value={i._id}>
                            {i._id}
                        </option>
                    ))}
                </select>

            <input
                type="text"
                value={total}
                placeholder="Total"
                onChange={e => setTotal(e.target.value)} />

                <select value={s_id} onChange={(b) => setStore_id(b.target.value)}>
                    {stores.map((i) => (
                        <option key={i.s_id} value={i.s_id}>
                            {i.s_id}
                        </option>
                    ))}
                </select>

            {/*}<input
                type="text"
                placeholder="Store ID"
                value={s_id}
                onChange={e => setStore_id(e.target.value)}
                />*/}

            <button onClick={EditOrder}>Save</button>
        </div>
    );
}

export default EditOrderPage;
