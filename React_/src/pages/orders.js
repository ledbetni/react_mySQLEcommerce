import React from 'react';
import { Link } from 'react-router-dom';
import OrderList from '../components/OrderList';
import ViewOrder from '../components/ViewOrder';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Orders({ setOrderToEdit }) {
    const [orders, setOrders] = useState([]);
    const [order, setOrder] = useState({
        o_id: "",
        c_id: "",
        total: "",
        s_id: "",
      });

    const [customers, setCustomers] = useState([]);
    const [stores, setStores] = useState([]);
    const navigate = useNavigate();

    const onDelete = async (o_id) => {
        const response = await fetch(`/orders/${o_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            setOrders(orders.filter(m => m.o_id !== o_id));
        } else {
            console.error(`Failed to delete order with _id = ${o_id}, status code = ${response.status}`);
        }
    };

    const onEdit = order => {
        setOrderToEdit(order);
        navigate("/edit-order");
    }

    const loadOrders = async () => {
        const response = await fetch('/orders');
        const orders = await response.json();
        //console.log("orders response:" + JSON.stringify(response));
        setOrders(orders.data);
    }

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

    const findOrder = async () => {
        const response = await fetch(`/orders/${o_id}`);
        let order = {};
        const result = await response.json();
        if (result.length > 0) {
            order = result[0];
        } else {
            order.o_id = "";
            order.c_id = "";
            order.total = "";
            order.s_id = "";
        }
        console.log("findOrder result:" + JSON.stringify(result));
        setOrder(order);
      };

      useEffect(() => {
        loadOrders();
        loadCustomers();
        loadStores();
    }, []);

    const [o_id, setOrdId] = useState("");
    const [c_id, setCustomer_id] = useState("");
    const [total, setTotal] = useState('');
    const [s_id, setStore_id] = useState('');

    const addOrder = async () => {
        const newOrder = { c_id, total, s_id };
        if (newOrder.c_id == "" || newOrder.total == "" || newOrder.s_id == ""){
          alert("Fields cannot be empty");
          return;
        }
        console.log("=================");
        console.log("Orders post request:" + JSON.stringify(newOrder));
        console.log("=================");
        //console.log("Customers array: " + JSON.stringify(stores));
        await fetch('/orders', {
            method: 'POST',
            body: JSON.stringify(newOrder),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if (response.status === 201) {
                //alert("Successfully added the order");
                setCustomer_id("");
                setTotal("");
                setStore_id("");
                loadOrders();

            } else {
                alert(`Failed to add order, status code = ${response.status}`);
            }
        });
    };



    return(
        <div>
            <h1 className="title">Orders</h1>

            <ul>
                <li><Link className="App-link" to="/">Home</Link></li>
                <li><Link className="App-link" to="/customers">Customers</Link></li>
                <li><Link className="App-link" to="/inventories">Inventories</Link></li>
                <li>Orders</li>
                <li><Link className="App-link" to="/store">Store</Link></li>
                <li><Link className="App-link" to="/vendors">Vendors</Link></li>
            </ul>

            <p>This website will serve as an eCommerce platform where customers may purchase orders from the store which sources items from various vendors.</p>



            <fieldset>
                <h2>Search for an Order</h2>
                <input
                    type="text"
                    placeholder="Search by Order_ID"
                    value={o_id}
                    onChange={(e) => setOrdId(e.target.value)}
                    />
                    <button onClick={findOrder}>Search</button>
                        {order.total
                            ? <fieldset><ViewOrder order={order} /></fieldset>
                            : ""
                        }
                </fieldset>


            <fieldset>
                <h2>Add an Order</h2>

                {/*<input
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
                    onChange={p => setTotal(p.target.value)} />

                    <select value={s_id} onChange={(b) => setStore_id(b.target.value)}>
                        {stores.map((i) => (
                            <option key={i.s_id} value={i.s_id}>
                                {i.s_id}
                            </option>
                        ))}
                    </select>

                {/*<input
                    type="text"
                    placeholder="Store ID"
                    value={s_id}
                    onChange={e => setStore_id(e.target.value)}
                    />*/}


                {/*<select value={c_id} onChange={(e) => setCustomer_id(e.target.value)}>
                    {customers.map((c) => (
                        <option key={c._id} value={c._id}>
                            {c.name}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    value={total}
                    placeholder="Total"
                    onChange={e => setTotal(e.target.value)} />


                <select value={s_id} onChange={(e) => setStore_id(e.target.value)}>
                    {stores.map((s) => (
                        <option key={s.s_id} value={s.s_id}>
                            {s.s_id}
                        </option>
                    ))}
                </select>*/}


                <button onClick={addOrder}>Add</button>
            </fieldset>

            <fieldset>
                <h2>Orders</h2>
                <OrderList orders={orders} onDelete={onDelete} onEdit={onEdit}></OrderList>
            </fieldset>
        </div>
    );
}

export default Orders;
