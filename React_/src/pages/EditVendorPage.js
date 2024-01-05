import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const EditVendorPage = ({ vendorToEdit }) => {

    const [name, setName] = useState(vendorToEdit.name);
    const [email, setEmail] = useState(vendorToEdit.email);

    

    const navigate = useNavigate();

    const EditVendor = async () => {
        const editedVendor = { name, email };
        const response = await fetch(`/vendors/${vendorToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(editedVendor),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            alert("Successfully edited the vendor");
        } else {
            alert(`Failed to edit vendor, status code = ${response.status}`);
        }
        navigate("/vendors");
    };

    return (
        <div>
            <h1>Edit Vendor</h1>
            <input
                    type="text"
                    placeholder="Name "
                    value={name}
                    onChange={e => setName(e.target.value)} />
                <input
                    type="email"
                    placeholder="Enter Email here"
                    value={email}
                    onChange={e => setEmail(e.target.value)} />

            <button onClick={EditVendor}>Save</button>
        </div>
    );
}

export default EditVendorPage;
