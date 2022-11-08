const addProduct = require('./add');
const getProducts = require('./get');
const getTodayProducts = require('./getToday');
const deleteProduct = require('./delete');
const updateProduct = require('./update');
const { getDiscount, putDiscount } = require('./discount');

module.exports = {
    addProduct,
    getProducts,
    getTodayProducts,
    deleteProduct,
    updateProduct,
    getDiscount,
    putDiscount
};