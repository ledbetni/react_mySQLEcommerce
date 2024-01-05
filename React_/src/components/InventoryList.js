import React from 'react';
import Inventory from './Inventory';

function InventoryList({ inventories, onDelete, onEdit }) {
    return (
        <table id="inventories">
            <thead>
                <tr>
                    <th>Inventory_ID</th>
                    <th>Vendor_ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {inventories.map((inventory, i) => <Inventory inventory={inventory}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    key={i} />)
                }
            </tbody>
        </table>
    );
}

export default InventoryList;