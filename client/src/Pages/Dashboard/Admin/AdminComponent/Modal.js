import React from "react";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';

const Modal = ({ selectedEvent,handleDelete,handleUpdate }) => {

    

  return (
    <div style={{ padding: "16px", backgroundColor: '#060B26', color: 'white', borderRadius: '8px' }}>
      <CardMedia
        sx={{ height: 250, borderRadius: '8px 8px 0 0' }}
        image={selectedEvent.imgUrl}
        title={selectedEvent.title}
      />
      <Typography variant="h6" style={{ marginTop: '16px' }}>
        {selectedEvent.title}
      </Typography>
      <Typography variant="body2">
        Location: {selectedEvent.location}
      </Typography>
      <Typography variant="body2">
        Time: {selectedEvent.time}
      </Typography>
      <Typography variant="body2">
        Ticket Price: {selectedEvent.ticketPrice} $
      </Typography>

      <div
        style={{
          marginTop: "16px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button variant="outlined" color="primary" onClick={()=>handleUpdate()}>
          Update
        </Button>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default Modal;
