import React from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';

function Customer({ customer, onDelete, onEdit }) {
    return (
        <tr>
            <td>{customer._id}</td>
            <td>{customer.fname}</td>
            <td>{customer.lname}</td>
            <td>{customer.email}</td>
            <td><MdEdit onClick={() => onEdit(customer)} className="App-button-edit" /></td>
            <td><MdDeleteForever onClick={() => onDelete(customer._id)} className="App-button-delete" /></td>
        </tr>
    );
}

export default Customer;