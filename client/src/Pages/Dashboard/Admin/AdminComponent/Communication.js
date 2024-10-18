import React, { useState,useEffect } from "react";
import { toast } from "react-hot-toast";
import { MdEmail } from "react-icons/md";

const Communication = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSendEmail = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/send_email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, message }),
      });

      if (response.ok) {
        toast.success("Email sent successfully!");
        setEmail("");
        setMessage("");
      } else {
        toast.error("Failed to send email.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Cleanup function to reset body overflow
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="flex justify-center overflow-hidden ">
      <div className=" flex flex-col items-center w-[50%] border rounded-lg border-gray-300 shadow-lg space-y-4 mt-10 bg-slate-400 p-5">
        <h1 className="font-bold">Communicate with Users</h1>
        <input
          type="email"
          placeholder="Enter user's email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-[50%] h-6 rounded-sm"
        />
        <textarea
          placeholder="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-[50%] h-20 rounded-sm "
        ></textarea>
        <button onClick={handleSendEmail} className="bg-custom-blue text-white p-3 rounded-md flex  justify-center items-center">Send Email
            <MdEmail className="m-1"/>
        </button>
      </div>
    </div>
  );
};

export default Communication;
