import React from 'react';
import { Link } from 'react-router-dom';

function Index() {
    return(
        <div>
            <h1 className="title">eCommerce Platform</h1>

            <ul>
                <li>Home</li>
                <li><Link className="App-link" to="/customers">Customers</Link></li>
                <li><Link className="App-link" to="/inventories">Inventories</Link></li>
                <li><Link className="App-link" to="/orders">Orders</Link></li>
                <li><Link className="App-link" to="/store">Store</Link></li>
                <li><Link className="App-link" to="/vendors">Vendors</Link></li>
            </ul>

            <p>This website will serve as an eCommerce platform where customers may purchase orders from the store which sources items from various vendors.</p>
        </div>
    );
}

export default Index;
