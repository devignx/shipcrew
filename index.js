const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

// Set up a route to handle the form submission
app.post('/send', (req, res) => {
  // Get the email address from the request body
  const email = req.body.email;

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'devignx@gmail.com',
      pass: '',
    },
  });

  // Set up the email message
  const message = {
    from: 'devignx@gmail.com',
    to: email,
    subject: 'Test email from Node.js',
    text: 'Hello from Node.js!',
  };

  // Send the email using Nodemailer
  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log(err);
      res.send('Error: Email failed to send.');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Email sent successfully!');
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
