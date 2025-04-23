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
    getAllDeliveryAgents
} = require('../controllers/deliveryController');

router.post('/create', verifyToken, authorizeRole(['Vendor', 'Admin']), createOrder);
router.get('/all', verifyToken, authorizeRole(['Vendor', 'Admin']), getAllOrders);
router.get('/agents/all', verifyToken, authorizeRole(['Vendor', 'Admin']), getAllDeliveryAgents);
router.put('/assign', verifyToken, authorizeRole(['Admin']), assignOrder);

// User routes
// router.get('/track/:orderId', verifyToken, authorizeRole(['User']), trackOrder);
// router.put('/payment/:orderId', verifyToken, authorizeRole(['User']), updatePayment);

// DeliveryAgent routes
router.get('/my-orders/:userId', verifyToken, authorizeRole(['DeliveryAgent']), getMyOrders);
router.put('/status', verifyToken, authorizeRole(['DeliveryAgent']), updateStatus);

module.exports = router;

