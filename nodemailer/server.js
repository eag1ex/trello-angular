var express=require('express');
var nodemailer = require("nodemailer");
var app=express();

/*
	Here we are configuring our SMTP Server details.
	STMP is mail server which is responsible for sending and recieving email.
*/

//https://www.fastmail.com/help/technical/servernamesandports.html
var smtpTransport = nodemailer.createTransport({
    service: 'FastMail',
    host: 'smtp.fastmail.com',
    port: 465,
    auth: {
        user: 'jackychan123e53@fastmail.com',
        pass: 'testpass1234*'
    },
    tls: {rejectUnauthorized: false},
    debug:true
});


/*------------------SMTP Over-----------------------------*/

/*------------------Routing Started ------------------------*/

app.get('/',function(req,res){
	res.sendfile('./nodemailer/index.html');
});

app.get('/send',function(req,res){
	var mailOptions={
		to : req.query.to,
		subject : req.query.subject,
		text : req.query.text
	}
	console.log(mailOptions);
	smtpTransport.sendMail(mailOptions, function(error, response){
   	 if(error){
        	console.log(error);
		res.end("error");
	 }else{
        	console.log("Message sent: " + response.message);
		res.end("sent");
    	 }
});
});

/*--------------------Routing Over----------------------------*/

app.listen(3000,function(){
	console.log("Express Started on Port 3000");
});
