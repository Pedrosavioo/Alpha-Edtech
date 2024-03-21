const express = require('express');
const router = express.Router();
const userController = require('../controllers/orderController');

router.get('/', userController.getAllOrders);
router.get('/search', userController.getOrdersProduct); 
router.get('/:id', userController.getOrder);
router.post('/', userController.addOrder);
router.put('/:id', userController.updateOrder);
router.delete('/:id', userController.deleteOrder); 

module.exports = router;