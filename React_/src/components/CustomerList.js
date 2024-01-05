import React from 'react';
import Customer from './Customer';

function CustomerList({ customers, onDelete, onEdit }) {
  // useEffect(() => {
  //   loadCustomers();
  //   console.log("Called");
  // });
    return (
        <table id="customers">
            <thead>
                <tr>
                    <th>Customer_ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {customers.map((customer, i) => <Customer customer={customer}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    key={i} />)}
            </tbody>
        </table>
    );
}

export default CustomerList;
