const addProduct = require('./add');
const getProducts = require('./get');
const getTodayProducts = require('./getToday');
const deleteProduct = require('./delete');
const updateProduct = require('./update');

module.exports = {
    addProduct,
    getProducts,
    getTodayProducts,
    deleteProduct,
    updateProduct
};