const {Product} = require("../../models/product");

const getCategories = async(req, res) => {
  // const data = await Product.distinct("category"); // only list of categories
  const data = await Product.aggregate([
    {$unwind: "$category"},
    {$group: {_id: "$category", quantity: {$sum: { $cond: [ {$eq: ["$status", "present"]}, 1, 0]}}}}
  ])
  // console.log(data);
  res.json({
    quantity: data.length,
    data
  });
}
module.exports = getCategories;