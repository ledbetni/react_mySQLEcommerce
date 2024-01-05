import mysql from "mysql2/promise";

const config = {
  db: {
    host: 
    user: 
    password: 
    database: 
  },
  listPerPage: 200
};


function getOffset(currentPage = 1, listPerPage) {
  return (currentPage - 1) * [listPerPage];
}

function emptyOrRows(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}

async function query(sql, params) {
  const connection = await mysql.createConnection(config.db);
  const [results] = await connection.execute(sql, params);
  connection.close();
  return results;
}


//------------------------------------------------------------------------------------------//

const createCustomer = async (fname, lname, email) => {
    const result = await query(
      `INSERT
        INTO customers(fname, lname, email) VALUES(?,?,?)`,
      [fname, lname, email]
    );
    return result;
  };

  const createVendor = async (name, email) => {
      const result = await query(
        `INSERT
          INTO vendors(name, email) VALUES(?,?)`,
        [name, email]
      );
      return result;
  };

  const createInventory = async (v_id, name, price, quantity) => {
      console.log(v_id, name, price, quantity);
      const result = await query(
        `INSERT
          INTO inventories(v_id, name, price, quantity) VALUES(?,?,?,?)`,
        [v_id, name, price, quantity]
      );
      console.log(result);
      return result;
  };

  const createStore = async (i_id, cost) => {
    const result = await query(
      `INSERT
        INTO storeTbl(i_id, cost) VALUES(?,?)`,
      [i_id, cost]
    );
    return result;
};

const createOrder = async (c_id, total, s_id) => {
    const result = await query(
      `INSERT
        INTO ordersTbl(c_id, total, s_id) VALUES(?,?,?)`,
      [c_id, total, s_id]
    );
    console.log("Create Order Post Result:" + result);
    console.log("c_id:" + c_id, "total:" + total, "s_id" + s_id);
    return result;
};

//------------------------------------------------------------------------------------------//

async function findCustomers(page = 1) {
  const offset = getOffset(page, config.listPerPage);
  const rows = await query(
    `SELECT *
      FROM customers LIMIT ?,?`,
    [offset, config.listPerPage], function(err,result,field){
      if (err) throw err;
      //console.log(result);
      console.log(config.listPerPage);
    }
  );
  const data = emptyOrRows(rows);
  const meta = { page };
  return {
    data,
    meta,
  };
}

async function findVendors(page = 1) {
    const offset = getOffset(page, config.listPerPage);
    const rows = await query(
      `SELECT *
        FROM vendors LIMIT ?,?`,
      [offset, config.listPerPage]
    );
    const data = emptyOrRows(rows);
    const meta = { page };
    return {
      data,
      meta,
    };
}

async function findInventories(page = 1) {
    const offset = getOffset(page, config.listPerPage);
    const rows = await query(
      `SELECT *
        FROM inventories LIMIT ?,?`,
      [offset, config.listPerPage]
    );
    const data = emptyOrRows(rows);
    const meta = { page };
    return {
      data,
      meta,
    };
}

async function findStores(page = 1) {
    const offset = getOffset(page, config.listPerPage);
    const rows = await query(
      `SELECT *
        FROM storeTbl LIMIT ?,?`,
      [offset, config.listPerPage]
    );
    const data = emptyOrRows(rows);
    const meta = { page };
    return {
      data,
      meta,
    };
}

async function findOrders(page = 1) {
    const offset = getOffset(page, config.listPerPage);
    const rows = await query(
      `SELECT *
        FROM ordersTbl LIMIT ?,?`,
      [offset, config.listPerPage]
    );
    const data = emptyOrRows(rows);
    const meta = { page };
    return {
      data,
      meta,
    };
}

//------------------------------------------------------------------------------------------//

const findCustomerById = async (_id) => {
  const rows = await query(
    `SELECT *
          FROM customers WHERE _id=?`,
    [_id]
  );
  const data = emptyOrRows(rows);
  return data;
};

const findVendorById = async (_id) => {
    const rows = await query(
      `SELECT *
            FROM vendors WHERE _id=?`,
      [_id]
    );
    const data = emptyOrRows(rows);
    return data;
};

const findInventoryById = async (i_id) => {
    const rows = await query(
      `SELECT *
            FROM inventories WHERE i_id=?`,
      [i_id]
    );
    const data = emptyOrRows(rows);
    return data;
};

const findStoreById = async (s_id) => {
    const rows = await query(
      `SELECT *
            FROM storeTbl WHERE s_id=?`,
      [s_id]
    );
    const data = emptyOrRows(rows);
    return data;
};

const findOrdById = async (o_id) => {
    const rows = await query(
      `SELECT *
            FROM ordersTbl WHERE o_id=?`,
      [o_id]
    );
    const data = emptyOrRows(rows);
    return data;
};

//------------------------------------------------------------------------------------------//

const replaceCustomer = async (_id, fname, lname, email) => {
  const result = await query(
    `UPDATE
      customers SET fname=?, lname=?, email=? WHERE _id=?`,
    [fname, lname, email, _id]
  );
  return result;
};

const replaceVendor = async (_id, name, email) => {
    const result = await query(
      `UPDATE
        vendors SET name=?, email=? WHERE _id=?`,
      [name, email, _id]
    );
    return result;
};

const replaceInventory = async (i_id, v_id, name, price, quantity) => {
    const result = await query(
      `UPDATE
        inventories SET v_id=?, name=?, price=?, quantity=? WHERE i_id=?`,
      [v_id, name, price, quantity, i_id]
    );
    return result;
};

const replaceStore = async (s_id, i_id, cost) => {
    console.log("primary key:" + s_id, "foreign key:" + i_id, "cost:" + cost);
    const result = await query(
      `UPDATE
        storeTbl SET i_id=?, cost=? WHERE s_id=?`,
      [i_id, cost, s_id], function(err,result){
        if (err) throw err;
        //console.log(result);
        console.log(config.listPerPage);
      }
    );
    console.log("replaceStore result" + result);
    return result;
};

const replaceOrder = async (o_id, c_id, total, s_id) => {
    console.log("o_id:" + o_id, "c_id:" + c_id, "total:" + total, "s_id:" + s_id);
    const result = await query(
      `UPDATE
        ordersTbl SET c_id=?, total=?, s_id=? WHERE o_id=?`,
      [c_id, total, s_id, o_id]
    );
    console.log("replaceOrder result:" + result);
    return result;
};

//------------------------------------------------------------------------------------------//

const deleteCustById = async (_id) => {
  const result = await query(
    `DELETE
          FROM customers WHERE _id=?`,
    [_id]
  );
  return result;
};

const deleteVendById = async (_id) => {
    const result = await query(
      `DELETE
            FROM vendors WHERE _id=?`,
      [_id]
    );
    return result;
};

const deleteInvById = async (i_id) => {
    const result = await query(
      `DELETE
            FROM inventories WHERE i_id=?`,
      [i_id]
    );
    return result;
};

const deleteStoreById = async (s_id) => {
    const result = await query(
      `DELETE
            FROM storeTbl WHERE s_id=?`,
      [s_id]
    );
    console.log("Delete storebyID result:" + JSON.stringify(result));
    return result;
};

const deleteOrdById = async (o_id) => {
    const result = await query(
      `DELETE
            FROM ordersTbl WHERE o_id=?`,
      [o_id]
    );
    //console.log("Delete ordbyID result:" + JSON.stringify(result));
    return result;
};

//////////////////////////////////////////////////////////////////////////////////////////////

export {
    findCustomers,
    createCustomer,
    findCustomerById,
    replaceCustomer,
    deleteCustById,

    findVendors,
    createVendor,
    findVendorById,
    replaceVendor,
    deleteVendById,

    createInventory,
    findInventories,
    findInventoryById,
    replaceInventory,
    deleteInvById,

    createStore,
    findStores,
    findStoreById,
    replaceStore,
    deleteStoreById,

    createOrder,
    findOrders,
    findOrdById,
    replaceOrder,
    deleteOrdById
};
