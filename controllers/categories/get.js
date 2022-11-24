const {Product} = require("../../models/product");

const getCategories = async(req, res) => {
  // const data = await Product.distinct("category"); // only list of categories
  const data = await Product.aggregate([
    {$unwind: "$category"},
    {$group: {_id: "$category", quantity: {$sum: 1}}}
  ])
  console.log(data)
  res.status(200).json({
    quantity: data.length,
    data
  });
}
module.exports = getCategories;