var express = require('express');
var nodemailer = require("nodemailer");
var cors = require('cors');
var app = express();
app.use(cors());

/*
	Here we are configuring our SMTP Server details.
	STMP is mail server which is responsible for sending and recieving email.
*/
var userEmail = 'mike@email.creativeatwork.net';

/**
 * please refer to https://nodemailer.com/about/  , https://nodemailer.com/smtp/
 * for how to setup your smtp, standard free service may not work due to spam/block limitations
 * you may use 'gmail' without any settings:
 *   service: 'gmail',
 *   auth: {
        user: EMAIL_ID,
        pass: 'YOUR_PASSWORD'
    },
 */
var smtpTransport = nodemailer.createTransport({
    //  use_authentication: false,
    host: 'gator3162.hostgator.com',
    ssl: true,
    //	secure:true,
    port: 465,
    auth: {
        user: userEmail,
        pass: 'testpass1234*'
    },
    tls: { rejectUnauthorized: false },
});
/*------------------SMTP Over-----------------------------*/





/*------------------Routing Started ------------------------*/
app.get('/', function (req, res) {
    //FOR TESTING TRY THIS FROM
    res.sendfile('./nodemailer/index.html');
});

app.get('/send', function (req, res) {

    var mailOptions = {
        from: '"'+req.query.fName+' '+req.query.lName+' from '+req.query.company+'" <' + req.query.emailFrom + '>',
        to: req.query.emailTo, // list of receivers
        replyTo: req.query.emailFrom,
        subject: req.query.subject, // Subject line
        text: req.query.ticket, // plaintext body
        html: req.query.ticket // html body
    }

    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log('message not send!',error);
            res.end("error");
        } else {
            console.log("Message sent");
            res.end("send");
        }
    });
});

/*--------------------Routing Over----------------------------*/

app.listen(3100, function () {
    console.log("Express Started on Port 3100");
});
