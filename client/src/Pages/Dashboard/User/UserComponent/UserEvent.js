import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useOutletContext } from "react-router-dom";
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const UserEvent = () => {
  
//   const [selectedEvent, setSelectedEvent] = useState(null);

  // Fetch events data from backend
  const { filteredEvents } = useOutletContext();
  

  const handlePayment = async (event) => {
   // setSelectedEvent(event.ticketPrice);   Set the selected event for which payment will be made
    
    const ticketPrice = event.ticketPrice;  // Assuming the event object has a ticketPrice field
    const eventId=event._id;
    
    try {
        let response = await axios.post('http://localhost:8000/api/payment', {
            ticketPrice: ticketPrice, // Pass ticket price to backend
            eventId:eventId
        });
        
        console.log(response);
        if (response && response.data) {
            let link = response.data.links[1].href;
            window.location.href = link;  // Redirect to PayPal payment page
        }
    } catch (error) {
        console.log('Error processing payment:', error);
    }
};

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
          </CardContent>
          <CardActions>
          <Button variant="contained" onClick={() => handlePayment(event)}>
              Ticket Price: {event.ticketPrice} $
            </Button>
            <Button variant="outlined">View More</Button>
          </CardActions>
        </Card>
      ))}


    </div>
  );
};

export default UserEvent;
