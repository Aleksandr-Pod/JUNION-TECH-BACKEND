const createError = require('../../helpers/createError');
const { Vendor } = require('../../models/vendor');

const getVendors = async (req, res) => {
    if (req.query) req.query = prepareQuery(req);
    const data = await Vendor.find(req.query);
    if (!data) throw createError(404, "No any vendor in database");
    res.status(200).json({
        quantity: data.length,
        data
    })
}
const prepareQuery = ({query}) => {
    if (query.name) query = { ...query, name: { "$regex": query.name } };
    if (query.address) query = { ...query, address: { "$regex": query.address } };
    if (query.owner) query = { ...query, owner: { "$regex": query.owner } };
    return query;
}
module.exports = getVendors;