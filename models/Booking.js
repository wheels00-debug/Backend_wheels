const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  serviceType: {
    type: String,
    required: true,
  },
  flavor: {
    type: String,
  },
  customFlavor: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  customLocation: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  notes: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Completed', 'Cancelled'],
    default: 'Pending',
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt
  collection: 'Hookahs', // Force Mongoose to use exactly this collection name
});

// Transform output to match the format used by the frontend (id instead of _id)
bookingSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
