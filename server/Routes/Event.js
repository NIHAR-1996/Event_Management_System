// routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const { createEvent, getEvents, getEventById,deleteEvent,updateEvent } = require('../Controller/Event');

// Create an event
router.post('/create', createEvent);

// Get all events
router.get('/getEvents', getEvents);

// Get a specific event by ID
router.get('/:id', getEventById);

router.delete('/deleteEvent/:id',deleteEvent);
router.put('/updateEvent/:id', updateEvent);

module.exports = router;
