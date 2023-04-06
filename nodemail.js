const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/form.html');
});

app.post('/send', (req, res) => {
    const { email } = req.body;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'devignx@gmail.com',
            pass: ' '
        }
    });

    let message = {
        from: 'your_email_address@gmail.com',
        to: email,
        subject: 'Test email from Node.js',
        html: '<h1>Hello!</h1><p>This is a test email sent from a Node.js application using Nodemailer.</p>'
    };

    transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log(error);
            res.send('Error: Email failed to send.');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent successfully!');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
