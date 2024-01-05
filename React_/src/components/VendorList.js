import React from 'react';
import Vendor from './Vendor';

function VendorList({ vendors, onDelete, onEdit }) {
    return (
        <table id="vendors">
            <thead>
                <tr>
                    <th>Vendor ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {vendors.map((vendor, i) => <Vendor vendor={vendor}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    key={i} />)
                }
            </tbody>
        </table>
    );
}

export default VendorList;