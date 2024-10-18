import React, {  useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from "react-router-dom";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate= useNavigate();
  const { filteredEvents } = useOutletContext();
  const handleViewMore = (event) => {
    setSelectedEvent(event);
    setOpen(true); // Open the dialog
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null);
  };

  const handleDelete = async () => {
        try {
          await axios.delete(`http://localhost:8000/api/events/deleteEvent/${selectedEvent._id}`);
          alert('Event deleted successfully');
          setEvents(events.filter((event) => event._id !== selectedEvent._id));
          handleClose(); // Close the modal after deletion
        } catch (error) {
          console.error('Error deleting event:', error);
          alert('Error deleting event');
        }
      };
      const handleUpdate=()=>{
        if (selectedEvent) {
          navigate(`/admin_dashboard/update_event/${selectedEvent._id}`);
          handleClose(); // Close the modal after redirecting
        }
      }
 

  // Fetch events data from backend
  

  return (
    <div className="w-full grid grid-cols-3 gap-4 p-4"
    style={{
      backgroundColor: 'transparent',  // Fully transparent background
    }}>
      {filteredEvents.map((event) => (
        <Card key={event._id} sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 180 }}
            image={event.imgUrl}  // Use the image URL from the event data
            title={event.title}
          />
          {console.log("img",event.imgUrl)}
          <CardContent className='p-0 bg-custom-blue text-white' >
            <Typography gutterBottom variant="h6" component="div">
              {event.title}
            </Typography>
            <Typography variant="body2" >
              Location: {event.location}
            </Typography>
            <Typography variant="body2" >
              Time: {event.time}
            </Typography>
            <Typography variant="body2" >
              Ticket Price: {event.ticketPrice}
            </Typography>
            
          </CardContent>
          <CardActions>
            
            <Button variant="contained" className='w-full'onClick={(e) => handleViewMore(event)}>View More</Button>
          </CardActions>
        </Card>
      ))}

<Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        {selectedEvent && <Modal 
        selectedEvent={selectedEvent}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate} />}
      </Dialog>
    </div>
  );
};

export default Events;
