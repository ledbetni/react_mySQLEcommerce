import * as model from "./model.mjs";
import express from "express";

const PORT = 14378;
const app = express();
app.use(express.json());

//------------------------------------------------------------------------------------CREATE------//
/**
 * CREATE a new CUSTOMER with the columns titles provided in the body
 */
app.post("/customers", (req, res) => {
    model
        .createCustomer(req.body.fname, req.body.lname, req.body.email)
        .then((result) => {
            res.status(201).send(result);
        })
        .catch((error) => {
            console.log("Add customer error:");
            console.error(error.errno);
            console.log(typeof(error));
            if(error.errno === 1062){
              res.status(401).json({Error: "Email is a duplicate"});
              return;
            }
            // In case of an error, send back status code 400 in case of an error.
            // A better approach will be to examine the error and send an
            // error status code corresponding to the error.
            res.status(400).json({ Error: "Request failed" });
        });
});

/**
 * CREATE a new VENDOR with columns titles provided in the body
 */
app.post("/vendors", (req, res) => {
    model
        .createVendor(req.body.name, req.body.email)
        .then((result) => {
            res.status(201).send(result);
        })
        .catch((error) => {
        console.error(error);
        // In case of an error, send back status code 400 in case of an error.
        // A better approach will be to examine the error and send an
        // error status code corresponding to the error.
        res.status(400).json({ Error: "Request failed" });
        });
});

/**
 * CREATE a new INVENTORY with the columns titles provided in the body
 */
app.post("/inventories", (req, res) => {
    //console.log(req.body.v_id);
    model
        .createInventory(
            req.body.v_id,
            req.body.name,
            req.body.price,
            req.body.quantity
        )
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
        console.error(error);
        // In case of an error, send back status code 400 in case of an error.
        // A better approach will be to examine the error and send an
        // error status code corresponding to the error.
        res.status(400).json({ Error: "Request failed" });
        });
});

/**
 * CREATE a new STORE with the columns titles provided in the body
 */
 app.post("/stores", (req, res) => {
    model
        .createStore(req.body.i_id, req.body.cost)
        .then((result) => {
            res.status(201).send(result);
        })
        .catch((error) => {
        console.error(error);
        // In case of an error, send back status code 400 in case of an error.
        // A better approach will be to examine the error and send an
        // error status code corresponding to the error.
        res.status(400).json({ Error: "Request failed" });
        });
});

/**
 * CREATE a new ORDER with the columns titles provided in the body
 */
 app.post("/orders", (req, res) => {
    model
    //console.log("Create order" + req.body);
        .createOrder(req.body.c_id, req.body.total, req.body.s_id)
        .then((result) => {
            res.status(201).send(result);
        })
        .catch((error) => {
        console.error(error);
        // In case of an error, send back status code 400 in case of an error.
        // A better approach will be to examine the error and send an
        // error status code corresponding to the error.
        res.status(400).json({ Error: "Request failed" });
        });
});

//--------------------------------------------------------------------------------RETRIEVE ALL------//

/**
 * RETRIEVE ALL customers.
 */
app.get("/db/customers", async (req, res, next) => {
    try {
        res.json(await model.findCustomers(req.query.page));
        console.log(req, res);
    } catch (err) {
        console.error(`Error - `, err.message);
        next(err);
    }
});

/**
 * RETRIEVE ALL vendors.
 */
app.get("/vendors", async (req, res, next) => {
    try {
        res.json(await model.findVendors(req.query.page));
    } catch (err) {
        console.error(`Error - `, err.message);
        next(err);
    }
});

/**
 * RETRIEVE ALL inventories.
 */
 app.get("/inventories", async (req, res, next) => {
    try {
        res.json(await model.findInventories(req.query.page));
    } catch (err) {
        console.error(`Error - `, err.message);
        next(err);
    }
});

/**
 * RETRIEVE ALL stores.
 */
 app.get("/stores", async (req, res, next) => {
    try {
        res.json(await model.findStores(req.query.page));
    } catch (err) {
        console.error(`Error - `, err.message);
        next(err);
    }
});

/**
 * RETRIEVE ALL orders.
 */
 app.get("/orders", async (req, res, next) => {
    try {
        res.json(await model.findOrders(req.query.page));
    } catch (err) {
        console.error(`Error - `, err.message);
        next(err);
    }
});

//------------------------------------------------------------------------------------RETRIEVE------//

/**
 * RETRIEVE the customer corresponding to the ID provided in the URL.
 */
app.get("/customers/:_id", (req, res) => {
    const customerId = req.params._id;
    model
        .findCustomerById(customerId)
        .then((customer) => {
            if (customer !== null) {
            res.json(customer);
            } else {
            res.status(404).json({ Error: "Resource not found" });
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(400).json({ Error: "Request failed" });
        });
});

/**
 * RETRIEVE the vendor corresponding to the ID provided in the URL.
 */
app.get("/vendors/:_id", (req, res) => {
    const vendorId = req.params._id;
    model
        .findVendorById(vendorId)
        .then((vendor) => {
            if (vendor !== null) {
                res.json(vendor);
            } else {
                res.status(404).json({ Error: "Resource not found" });
            }
        })
        .catch((error) => {
        console.error(error);
        res.status(400).json({ Error: "Request failed" });
        });
});


/**
 * RETRIEVE the inventory corresponding to the ID provided in the URL.
 */
 app.get("/inventories/:i_id", (req, res) => {
    const inventoryId = req.params.i_id;
    model
        .findInventoryById(inventoryId)
        .then((inventory) => {
            if (inventory !== null) {
                res.json(inventory);
            } else {
                res.status(404).json({ Error: "Resource not found" });
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(400).json({ Error: "Request failed" });
        });
});

/**
 * RETRIEVE the store corresponding to the ID provided in the URL.
 */
 app.get("/stores/:s_id", (req, res) => {
    const storeId = req.params.s_id;
    model
        .findStoreById(storeId)
        .then((store) => {
            if (store !== null) {
                res.json(store);
            } else {
                res.status(404).json({ Error: "Resource not found" });
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(400).json({ Error: "Request failed" });
        });
});

/**
 * RETRIEVE the order corresponding to the ID provided in the URL.
 */
 app.get("/orders/:o_id", (req, res) => {
    const orderId = req.params.o_id;
    model
        .findOrdById(orderId)
        .then((order) => {
            if (order !== null) {
                res.json(order);
            } else {
                res.status(404).json({ Error: "Resource not found" });
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(400).json({ Error: "Request failed" });
        });
});

//------------------------------------------------------------------------------------UPDATE------//

/**
 * UPDATE the customer whose _id is provided in the path parameter, values provided in the body.
 */
app.put("/customers/:_id", (req, res) => {
    model
        .replaceCustomer(
            req.params._id,
            req.body.fname,
            req.body.lname,
            req.body.email
        )
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((error) => {
            console.error(error);
            res.status(400).json({ Error: "Request failed" });
        });
});

/**
 * UPDATE the vendor whose _id is provided in the path parameter, values provided in the body.
 */
app.put("/vendors/:_id", (req, res) => {
    model
        .replaceVendor(
            req.params._id,
            req.body.name,
            req.body.email
        )
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((error) => {
            console.error(error);
            res.status(400).json({ Error: "Request failed" });
        });
});

/**
 * UPDATE the inventory whose _id is provided in the path parameter, values provided in the body.
 */
 app.put("/inventories/:i_id", (req, res) => {
    model
        .replaceInventory(
            req.params.i_id,
            req.body.v_id,
            req.body.name,
            req.body.price,
            req.body.quantity
        )
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((error) => {
            console.error(error);
            res.status(400).json({ Error: "Request failed" });
        });
});

/**
 * UPDATE the store whose _id is provided in the path parameter, values provided in the body.
 */
 app.put("/stores/:s_id", (req, res) => {
    model
        .replaceStore(
            req.params.s_id,
            req.body.i_id,
            req.body.cost,
        )
        .then((result) => {
          console.log("Put Stores response:" + result);
            res.status(200).send(result);
        })
        .catch((error) => {
            console.error("Put Store error:" + error);
            res.status(400).json({ Error: "Request failed" });
        });
});

/**
 * UPDATE the order whose _id is provided in the path parameter, values provided in the body.
 */
 app.put("/orders/:o_id", (req, res) => {
    model
        .replaceOrder(
            req.params.o_id,
            req.body.c_id,
            req.body.total,
            req.body.s_id,
        )
        //console.log("Edit Order Put Request:" + req.body);
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((error) => {
            console.error(error);
            res.status(400).json({ Error: "Request failed" });
        });
});

//------------------------------------------------------------------------------------DELETE------//

/**
 * Delete the customer whose _id is provided in the query parameters
 */
app.delete("/customers/:_id", (req, res) => {
    model
        .deleteCustById(req.params._id)
        .then((deletedInfo) => {
            if (deletedInfo.affectedRows === 1) {
                res.status(204).send("customer deleted");
            } else {
                res.status(404).json({ Error: "Resource not found" });
            }
        })
        .catch((error) => {
            console.error(error);
            res.send({ error: "Request failed" });
        });
});

/**
 * Delete the vendor whose _id is provided in the query parameters
 */
app.delete("/vendors/:_id", (req, res) => {
    console.log("Delete Vendors Request:" + req.params._id);
    model
        .deleteVendById(req.params._id)
        .then((deletedInfo) => {
            if (deletedInfo.affectedRows === 1) {
                res.status(204).send("vendor deleted");
            } else {
                res.status(404).json({ Error: "Resource not found" });
            }
        })
        .catch((error) => {
            console.error(error);
            res.send({ error: "Request failed" });
        });
});

/**
 * Delete the inventory whose _id is provided in the query parameters
 */
 app.delete("/inventories/:i_id", (req, res) => {
   console.log("Delete Inventory Request:" + req.params.i_id);
    model
        .deleteInvById(req.params.i_id)
        .then((deletedInfo) => {
            if (deletedInfo.affectedRows === 1) {
                res.status(204).send("inventory deleted");
            } else {
                res.status(404).json({ Error: "Resource not found" });
            }
        })
        .catch((error) => {
            console.error(error);
            res.send({ error: "Request failed" });
        });
});

/**
 * Delete the store whose _id is provided in the query parameters
 */
 app.delete("/stores/:s_id", (req, res) => {
    model
        .deleteStoreById(req.params.s_id)
        .then((deletedInfo) => {
            if (deletedInfo.affectedRows === 1) {
                res.status(204).send("store item deleted");
            } else {
                res.status(404).json({ Error: "Resource not found" });
            }
        })
        .catch((error) => {
            console.error(error);
            res.send({ error: "Request failed" });
        });
});

/**
 * Delete the order whose _id is provided in the query parameters
 */
 app.delete("/orders/:o_id", (req, res) => {
    model
        .deleteOrdById(req.params.o_id)
        .then((deletedInfo) => {
          console.log("Delete Order Info:" + JSON.stringify(deletedInfo));
            if (deletedInfo.affectedRows === 1) {
                res.status(204).send("order deleted");
            } else {
                res.status(404).json({ Error: "Resource not found" });
            }
        })
        .catch((error) => {
            console.error(error);
            res.send({ error: "Request failed" });
        });
});



/////PORT/////////////////////////////////////////////////////////////////////////////////////////////

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
