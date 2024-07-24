// import  from'./Controllers/appointmentController.js';
// //import { myVariable } from './file1.js';
// import dotenv from 'dotenv';
// dotenv.config();
// //require('dotenv').config();
// import twilio from 'twilio';

// const accountSid = 'AC7d303f2772889487221e8aefa346f78a';  
// const authToken = '035f50ae41274e3f30e815aa95d29757';   

// const client = twilio(accountSid, authToken);


// const sendSMS = async (body) => {
//   let msgOptions = {
//     from: '+12066874593',
//     to: '+13065802724',
//     body: body
//   };
  
//   try {
//     const message = await client.messages.create(msgOptions);
//     console.log(message);
//   } catch (error) {
//     console.error(`New appointment created for ${data.clientname}. Date: ${data.date}, Slot: ${data.slot}`);
//   }
// };

// //sendSMS();
  
// sendSMS();



// // const sendSMS = async (body) => {
// //   let msgOptions = {
// //     from: '+12066874593',
// //     to: '+13065802724',
// //     body: body
// //   };
  
// //   try {
// //     const message = await client.messages.create(msgOptions);
// //     console.log(message);
// //   } catch (error) {
// //     console.error(`New appointment created for ${data.clientname}. Date: ${data.date}, Slot: ${data.slot}`);
// //   }
// // };

// //sendSMS();

// // // Load the Twilio module
// // const twilio = require('twilio');

// // // Twilio credentials
// // const accountSid = 'AC7d303f2772889487221e8aefa346f78a';  
// // const authToken = '035f50ae41274e3f30e815aa95d29757';   

// // // Create a Twilio client
// // const client = new twilio(accountSid, authToken);

// // // Function to send an SMS
// // function sendSMS(to, from, body) {
// //     client.messages.create({
// //         body: body,
// //         to: to,    // Text this number
// //         from: from // From a valid Twilio number
// //     })
// //     .then((message) => console.log(`Message sent successfully with SID: ${message.sid}`))
// //     .catch((error) => console.error(`Error sending message: ${error}`));
// // }

// // // Example usage of the sendSMS function
// // const toNumber = '+13065802724';        // Replace with the recipient's phone number
// // const fromNumber = '+12066874593';      // Replace with your Twilio phone number
// // const messageBody = 'Hello from Twilio!';

// // sendSMS(toNumber, fromNumber, messageBody);
