var express = require('express');
var nodemailer = require("nodemailer");
var cors = require('cors');
var app = express();
app.use(cors());

/*
	Here we are configuring our SMTP Server details.
	STMP is mail server which is responsible for sending and recieving email.
*/

//https://askleo.com/what_are_outlookcom_imap_pop3_and_smtp_settings/


var userEmail = 'mike@email.creativeatwork.net';


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


/*
// setup e-mail data with unicode symbols
var mailOptions = {
//	sender :"m1chae1@reborn.com",
    from: '"Mike" <m1chae1@reborn.com>', // sender address
	replyTo:'m1chae1@reborn.com', 
    to: 'Mike <'+userEmail+'>', // list of receivers
    subject: "Hello", // Subject line
    text: "Hello world ", // plaintext body
    html: "<b>Hello world </b>" // html body
}



// send mail with defined transport object
smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
        console.log('error',error);
    }else{
        console.log("Message sent: " + response.message);
    }

    // if you don't want to use this transport object anymore, uncomment following line
    smtpTransport.close(); // shut down the connection pool, no more messages
});

*/



app.get('/', function (req, res) {
    res.sendfile('./nodemailer/index.html');
});

app.get('/send', function (req, res) {

    console.log('req.query',req.query)
    var mailOptions = {
        from: '"Mike" <' + req.query.to + '>', // sender address
        to: userEmail, // list of receivers
        replyTo: req.query.to,
        subject: req.query.subject, // Subject line
        text: req.query.text, // plaintext body
        html: "<b>" + req.query.text + " </b>" // html body
    }

    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
            res.end("error");
        } else {
            console.log("Message sent: " + response);
            res.end("sent");
        }
    });
});

/*--------------------Routing Over----------------------------*/

app.listen(3100, function () {
    console.log("Express Started on Port 3100");
});
