const express = require('express');
const router = express.Router();

const verifyToken = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/authorizeRole');
const {
    createOrder,
    assignOrder,
    updateStatus,
    getMyOrders,
    getAllOrders,
    trackOrder,
    updatePayment
} = require('../controllers/deliveryController');

// Admin routes
router.post('/create', verifyToken, authorizeRole('Admin'), createOrder);
router.put('/assign', verifyToken, authorizeRole('Admin'), assignOrder);
router.get('/all', verifyToken, authorizeRole('Admin'), getAllOrders);

// User routes
router.get('/track/:orderId', verifyToken, authorizeRole('User'), trackOrder);
router.put('/payment/:orderId', verifyToken, authorizeRole('User'), updatePayment);

// DeliveryAgent routes
router.get('/my-orders', verifyToken, authorizeRole('DeliveryAgent'), getMyOrders);
router.put('/status', verifyToken, authorizeRole('DeliveryAgent'), updateStatus);

module.exports = router;

