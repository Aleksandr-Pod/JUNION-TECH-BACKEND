const {Product} = require('../../models/product');

const getProducts = async (req, res) => {
    if (Object.keys(req.query).length === 0) req.query = prepareQuery(req);
    const result = await Product.find(req.query);
    res.status(200).json({
        qty: result.length,
        result
    })
} 
const prepareQuery = ({ query }) => {
    query.status = query.status ? query.status : "present";
    if (query.name) query = { ...query, name: { "$regex": query.name } };
    if (query.owner) query = { ...query, owner: { "$regex": query.owner } };
    if (query.price_min || query.price_max) {
        if (query.price_min && !query.price_max) query.price_max = "999999999";
        if (!query.price_min && query.price_max) query.price_min = "0";
        if (Number(query.price_min) <= Number(query.price_max)) {
            query = { ...query, price: { $gte: query.price_min, $lt: query.price_max } }
        } else {query.price = query.price_min}
    }
    return query;
}
module.exports = getProducts;