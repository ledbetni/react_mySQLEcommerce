import React from 'react';
import Store from './Store';

function StoreList({ stores, onDelete, onEdit }) {
    return (
        <table id="stores">
            <thead>
                <tr>
                    <th>Store ID</th>
                    <th>Inventory ID</th>
                    <th>Price</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {stores.map((store, i) => <Store store={store}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    key={i} />)
                }
            </tbody>
        </table>
    );
}

export default StoreList;