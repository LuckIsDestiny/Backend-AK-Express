const mongoose = require('mongoose');

const deliveryOrderSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  customerName: String,
  address: String,
  status: {
    type: String,
    enum: ['Pending', 'Assigned', 'Out for Delivery', 'Delivered'],
    default: 'Pending'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model('DeliveryOrder', deliveryOrderSchema);
