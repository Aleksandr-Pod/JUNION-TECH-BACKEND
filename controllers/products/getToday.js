const {Product} = require('../../models/product');

const getTodayProducts = async (req, res) => {
    const myDate = new Date();
    myDate.setHours(3);
    myDate.setMinutes(0);
    myDate.setSeconds(0);
    myDate.getMilliseconds(0);
    const from = myDate.toISOString();
    myDate.setDate(myDate.getDate() + 1);
    const to = myDate.toISOString();

    const createdToday = await Product.find({
        "createdAt": {
            $gte: from,
            $lt: to,
        }
    });
    const deletedToday = await Product.find({
        "updatedAt": {
            $gte: from,
            $lt: to,
        },
        "status": "deleted"
    });
    res.status(200).json({
        createdQuantity: createdToday.length,
        createdToday,
        deletedQantity: deletedToday.length,
        deletedToday,
    })
} 

module.exports = getTodayProducts;