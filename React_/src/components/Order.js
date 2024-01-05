import React from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';

function Order({ order, onDelete, onEdit }) {
    return (
        <tr>
            <td>{order.o_id}</td>
            <td>{order.c_id}</td>
            <td>{order.total}</td>
            <td>{order.s_id}</td>
            <td><MdEdit onClick={() => onEdit(order)}className="App-button-edit" /></td>
            <td><MdDeleteForever onClick={() => onDelete(order.o_id)}className="App-button-delete" /></td>
        </tr>
    );
}

export default Order;
