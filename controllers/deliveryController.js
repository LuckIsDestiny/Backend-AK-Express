const DeliveryOrder = require('../models/DeliveryOrder')
const User = require('../models/User')

exports.createOrder = async (req, res) => {
  try {
    const { orderId, vendorName, customerName, address, payment } = req.body;
    const newOrder = new DeliveryOrder({
      orderId,
      vendorName,
      customerName,
      address,
      payment: {
        amount: payment.amount,
        method: payment.method,
        status: payment.status || 'Pending',
        transactionId: payment.transactionId
      }
    });
    await newOrder.save();
    res.status(201).json({ msg: 'Order created Successfuly', order: newOrder });
  } catch (err) {
    res.status(500).json({ msg: 'Error creating order', error: err.message });
  }
}

exports.assignOrder = async (req, res) => {
  try {
    const { orderId, deliveryAgentId } = req.body;
    const updated = await DeliveryOrder.findOneAndUpdate(
      { orderId },
      { assignedTo: deliveryAgentId, status: 'Assigned' },
      { new: true }
    );
    res.json({ msg: 'Order assigned', order: updated });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to assign order', error: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const updated = await DeliveryOrder.findOneAndUpdate(
      { orderId },
      { status },
      { new: true }
    );
    res.json({ msg: 'Status updated', order: updated });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to update status', error: err.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const myOrders = await DeliveryOrder.find({ assignedTo: req.user.userId });
    res.json(myOrders);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch orders', error: err.message });
  }
};

exports.getAllOrders = async (_req, res) => {
  try {
    // Explicitly specify path and model to ensure proper population
    const orders = await DeliveryOrder.find()
      .populate({
        path: 'assignedTo',
        model: 'User', // Make sure this matches your User model name
        select: 'name email'
      });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch all orders', error: err.message });
  }
};

exports.getAllDeliveryAgents = async (_req, res) => {
  try {
    const deliveryAgents = await User.find({ role: 'DeliveryAgent' });
    console.log(deliveryAgents);
    res.status(200).json(deliveryAgents);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch delivery agents', error: err.message });
  }
};

// exports.trackOrder = async (req, res) => {
//   try {
//     const order = await DeliveryOrder.findOne({
//       orderId: req.params.orderId
//     });
//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }
//     res.json(order);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.updatePayment = async (req, res) => {
//   try {
//     const order = await DeliveryOrder.findOne({
//       orderId: req.params.orderId
//     });
//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     order.payment = {
//       ...order.payment,
//       ...req.body
//     };

//     await order.save();
//     res.json(order);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };