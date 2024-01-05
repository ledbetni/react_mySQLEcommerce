import React from 'react';
import Order from './Order';

function OrderList({ orders, onDelete, onEdit }) {
    return (
        <table id="orders">
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Customer ID</th>
                    <th>Total</th>
                    <th>Store ID</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order, i) => <Order order={order}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    key={i} />)
                }
            </tbody>
        </table>
    );
}

export default OrderList;