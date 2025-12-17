const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');

// Create order
router.post('/create', orderController.createOrder);

// Get user orders
router.get('/user/:email', orderController.getUserOrders);

// Get order by ID
router.get('/:id', orderController.getOrderById);

// Update order status
router.put('/:id/status', orderController.updateOrderStatus);

// Get all orders (admin)
router.get('/', orderController.getAllOrders);

module.exports = router;
