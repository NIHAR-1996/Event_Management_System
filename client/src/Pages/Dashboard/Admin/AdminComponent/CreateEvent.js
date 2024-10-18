import React, { useState,useEffect} from "react";
import { toast } from 'react-hot-toast';
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";

const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    title: "",
    location: "",
    time: "",
    imgUrl: "",
    ticketPrice: ""
  });
  const navigate=useNavigate();
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const { id } = useParams();  // Get event ID from the URL

  useEffect(() => {
    if (id) {
      setIsUpdateMode(true);
      fetchEventDetails(id);
    }
  }, [id]);

  const fetchEventDetails = async (eventId) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/events/${eventId}`);
      const event = response.data;
      setEventData({
        title: event.title,
        location: event.location,
        time: event.time,
        imgUrl: event.imgUrl,
        ticketPrice: event.ticketPrice
      });
    } catch (error) {
      console.error("Error fetching event details:", error);
      toast.error("Failed to load event details.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUpdateMode) {
      // Call API to update event
      try {
        await axios.put(`http://localhost:8000/api/events/updateEvent/${id}`, eventData);
        toast.success("Event updated successfully!");
        navigate('/admin_dashboard');
      } catch (error) {
        toast.error("Failed to update event");
      }
    } else {
      // Call API to create new event
      try {
        await axios.post(`http://localhost:8000/api/events/create`, eventData);
        toast.success("Event created successfully!");
        navigate('/admin_dashboard');
      } catch (error) {
        toast.error("Failed to create event");
      }
    }
  };
  
  return (
    <div className="flex justify-center items-center p-0 m-0 "
     >
      <form className="max-w-md mx-auto border border-gray-400 p-4 min-w-52 bg-slate-100 mt-20 z-10 rounded-xl w-[60%] shadow-md " onSubmit={handleSubmit}
      >
        <h1 className="font-bold">
          Create Event
        </h1>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="title"
            id="floating_title"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={eventData.title}
            onChange={handleChange}
            required
          />
          <label
            htmlFor="floating_title"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-0 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Event Title
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="location"
            id="floating_location"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={eventData.location}
            onChange={handleChange}
            required
          />
          <label
            htmlFor="floating_location"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-0 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Event Location
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="imgUrl"
            id="floating_image_url"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={eventData.imgUrl}
            onChange={handleChange}
            required
          />
          <label
            htmlFor="floating_image_url"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-0 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Image URL
          </label>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="time"
              id="floating_time"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={eventData.time}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="floating_time"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-0 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Time
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="ticketPrice"
              id="floating_ticket_price"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={eventData.ticketPrice}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="floating_ticket_price"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-0 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Ticket Price
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
         {isUpdateMode ? "Update Event" : "Create Event"}
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
