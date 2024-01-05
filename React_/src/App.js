import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/index';
import Customers from './pages/customers';
import Inventories from './pages/inventories';
import Orders from './pages/orders';
import Store from './pages/store';
import Vendors from './pages/vendors';
import {useState} from 'react';
import EditCustomerPage from './pages/EditCustomerPage';
import EditInventoryPage from './pages/EditInventoryPage';
import EditOrderPage from './pages/EditOrderPage';
import EditStorePage from './pages/EditStorePage';
import EditVendorPage from './pages/EditVendorPage';

function App() {
  const [customerToEdit, setCustomerToEdit] = useState();
  const [inventoryToEdit, setInventoryToEdit] = useState();
  const [orderToEdit, setOrderToEdit] = useState();
  const [storeToEdit, setStoreToEdit] = useState();
  const [vendorToEdit, setVendorToEdit] = useState();

  return(
      <div>
      
          <Router>
              <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/customers" element={<Customers setCustomerToEdit={setCustomerToEdit} />} />
                  <Route path="/edit-customer" element={<EditCustomerPage customerToEdit={customerToEdit} />} />
                  
                  <Route path="/inventories" element={<Inventories setInventoryToEdit={setInventoryToEdit} />} />
                  <Route path="/edit-inventory" element={<EditInventoryPage inventoryToEdit={inventoryToEdit} />} />
                  
                  <Route path="/orders" element={<Orders setOrderToEdit={setOrderToEdit} />} />
                  <Route path="/edit-order" element={<EditOrderPage orderToEdit={orderToEdit} />} />

                  <Route path="/store" element={<Store setStoreToEdit={setStoreToEdit} />} />
                  <Route path="/edit-store" element={<EditStorePage storeToEdit={storeToEdit} />} />

                  <Route path="/vendors" element={<Vendors setVendorToEdit={setVendorToEdit} />} />
                  <Route path="/edit-vendor" element={<EditVendorPage vendorToEdit={vendorToEdit} />} />
              </Routes>
          </Router>
      
      </div>
  );
}

export default App;
