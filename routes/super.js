const { ctrlWrapper, auth } = require("../middlewares");
const ctrl = require("../controllers/super");
const router = require("express").Router();

router.get('/', auth, ctrlWrapper(ctrl.getSys));
router.put('/', auth, ctrlWrapper(ctrl.putSuperPass));
router.get('/users', auth, ctrlWrapper(ctrl.getAllUsers));
router.put('/users', auth, ctrlWrapper(ctrl.updateUserRole));
router.delete('/users', auth, ctrlWrapper(ctrl.deleteUser));

module.exports = router;