const { ctrlWrapper, auth } = require("../middlewares");
const ctrl = require("../controllers/super");
const router = require("express").Router();

router.get('/', auth, ctrlWrapper(ctrl.getSys));
router.put('/', auth, ctrlWrapper(ctrl.putSuperPass));
router.get('/users', auth, ctrlWrapper(ctrl.getAllUsers));

module.exports = router;