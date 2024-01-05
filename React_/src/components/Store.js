import React from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';

function Store({ store, onDelete, onEdit }) {
    return (
        <tr>
            <td>{store.s_id}</td>
            <td>{store.i_id}</td>
            <td>{store.cost}</td>
            <td><MdEdit onClick={() => onEdit(store)} className="App-button-edit" /></td>
            <td><MdDeleteForever onClick={() => onDelete(store.s_id)} className="App-button-delete" /></td>
        </tr>
    );
}

export default Store;
