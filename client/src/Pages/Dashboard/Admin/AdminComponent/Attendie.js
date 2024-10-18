import React,{useEffect,useState} from 'react';
import axios from 'axios';

const Attendie = () => {
    const [attendees, setAttendees] = useState([]);

    useEffect(() => {
        const fetchAttendees = async () => {
          try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8000/api/attendees', {
              headers: {
                Authorization: `Bearer ${token}`,  // Pass token in headers
              },
            });
            setAttendees(response.data);
          } catch (error) {
            console.error("Error fetching attendees", error);
          }
        };
    
        fetchAttendees();
      }, []);


  return (
    
    <div className="container mx-auto mt-10">
    <h2 className="text-3xl text-center font-bold mb-6 text-gray-800">
      Attendee List
    </h2>

    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow-lg">
        <thead>
          <tr className="bg-indigo-600 text-white text-left">
            <th className="py-3 px-4">Name</th>
            <th className="py-3 px-4">Email</th>
          </tr>
        </thead>
        <tbody>
          {attendees.length > 0 ? (
            attendees.map((attendee) => (
              <tr key={attendee._id} className="bg-gray-100 border-b border-gray-200">
                <td className="py-3 px-4">{attendee.name}</td>
                <td className="py-3 px-4">{attendee.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="text-center py-4">
                No attendees available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
    
  );
};

export default Attendie
