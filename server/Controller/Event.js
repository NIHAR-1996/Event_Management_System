// controllers/eventController.js
const Event = require('../Models/Event');

// Create a new event
const createEvent = async (req, res) => {
    try {
        const { title, location, time, imgUrl, ticketPrice } = req.body;
    
        // Example of validation (adjust according to your needs)
        if (!title || !location || !time || !ticketPrice) {
          return res.status(400).json({ message: "All fields are required." });
        }
    
        const newEvent = new Event({
          title,
          location,
          time,
          imgUrl,
          ticketPrice,
        });
    
        const savedEvent = await newEvent.save();
        return res.status(201).json(savedEvent);
      } catch (error) {
        console.error("Error creating event:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
};

// Get all events
const getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
        
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events', error });
    }
};

// Get event by ID
const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching event', error });
    }
};

const deleteEvent=async(req,res)=>{
    try{
        const{id}=req.params;
        const deletedEvent=await Event.findByIdAndDelete(id);

        if(!deletedEvent){
            return res.status(404).json({ message: 'Event not found' });
        }
          res.status(200).json({message:"Event not found"});
    } catch(error){
        res.status(500).json({message:'Error deleting Event',error});
    }
}

const updateEvent=async(req,res)=>{
    const { id } = req.params; // Get the event ID from the route parameter
    const updatedData = req.body; 
    try{
         
    const updatedEvent = await Event.findByIdAndUpdate(id, updatedData, { new: true });
    
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.status(200).json(updatedEvent); // Send back the updated event
    } catch(error){
        console.error('Error updating event:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { createEvent, getEvents, getEventById,deleteEvent,updateEvent};
