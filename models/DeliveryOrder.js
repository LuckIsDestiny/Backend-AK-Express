const mongoose = require('mongoose');

const deliveryOrderSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  vendorName: { type: String, required: true },
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
  },
  payment: {
    amount: { type: Number},
    status: {
      type: String, 
      enum: ['Pending', 'Completed', 'Failed'],
      default: 'Pending'
    },
    method: {
      type: String,
      enum: ['Cash', 'Card', 'UPI'],
    },
    transactionId: String
  }
}, { timestamps: true });

module.exports = mongoose.model('DeliveryOrder', deliveryOrderSchema);
