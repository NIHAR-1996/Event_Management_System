// models/Event.js
const mongoose = require('mongoose');

const SoldEvents = new mongoose.Schema({
    eventId: {
        type: String,
        required: true,
    },
    saleId: {
        type: String,
        required: true
    },
    ticketPrice: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('TicketSale', SoldEvents);
