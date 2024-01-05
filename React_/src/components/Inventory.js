import React from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';

function Inventory({ inventory, onDelete, onEdit }) {
    return (
        <tr>
            <td>{inventory.i_id}</td>
            <td>{inventory.v_id}</td>
            <td>{inventory.name}</td>
            <td>{inventory.price}</td>
            <td>{inventory.quantity}</td>
            <td><MdEdit onClick={() => onEdit(inventory)} className="App-button-edit" /></td>
            <td><MdDeleteForever onClick={() => onDelete(inventory.i_id)} className="App-button-delete" /></td>
        </tr>
    );
}

export default Inventory;
