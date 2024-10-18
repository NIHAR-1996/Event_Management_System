const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail= async (req,res)=>{
    const { email, message } = req.body;

   
      

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASS,
            },
            port: 587,
            secure: false,
        });

          const mailOptions = {
            from: process.env.EMAIL_USER, // Sender address
            to: email,  // List of receivers
            subject: 'Message from Event Management System',
            text: message,  // Plain text body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error('Error sending email:', error);
              return res.status(500).json({ success: false, message: 'Failed to send email' });
            }
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            res.status(200).json({ success: true, message: 'Email sent successfully', previewUrl: nodemailer.getTestMessageUrl(info) });
          });

  
}

module.exports=sendEmail