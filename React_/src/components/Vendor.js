import React from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';

function Vendor({ vendor, onDelete, onEdit }) {
    return (
        <tr>
            <td>{vendor._id}</td>
            <td>{vendor.name}</td>
            <td>{vendor.email}</td>
            <td><MdEdit onClick={() => onEdit(vendor)} className="App-button-edit" /></td>
            <td><MdDeleteForever onClick={() => onDelete(vendor._id)} className="App-button-delete" /></td>
        </tr>
    );
}

export default Vendor;