const express = require('express');
const router = express.Router();
const userController = require('../controllers/productController');

router.get('/', userController.getAllProducts);
router.get('/:id', userController.getProductId);
router.post('/', userController.addProduct);
router.put('/:id', userController.updateProduct);
router.delete('/:id', userController.deleteProduct);

module.exports = router;