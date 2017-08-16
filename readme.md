#### - Trello Angular -
A Trello like looking App using Angular.js and Bootstrap 4/Flexbox witn Nodemailer Lodash. and $httpbacked Mock service

#### - [ Company / Digital Agency - Eaglex](http://eaglex.net) -
[ Creative Agency specializing in Creative and website/application development, SPA/MVC, Mean Stack, UX/UI, Agile, things like that, hope you like this project. ](http://eaglex.net/portfolio)

######Repo


###### Instalation
* You need to setup your own SMTP to use and test ./nodemailer/ for sending email.
* Go to ./nodemailer/server.js > update your SMTP settings!  
* For Nodemailer to work you need nodejs 6^, and node-sass (installed -g)
* Run **$/ npm run hot** to install node-sass, and rebuild it. (you might need sudo if on Mac/Linux)
* Unit testing **$/ npm run itest** to install first

```
#!python

$/ npm install
```

***
###### Start the App

```
#!python

$/ npm run nodemailer   
$/ npm start
$/ npm run test
```

***
##### Stack/Setup
* Angular 1.6/component, BootStrap alpha.6/Flexbox, Sass, Typescript, nodejs/Express, Nodemailer, Lodash
* Following John Papa Angular Styleguide
* Integraded in modular fashion
* Using $httpbackend mock data as service
* Coded in OOP
* added unit testing using jasmine/karma
***


##### File structure

> **app**

>> scripts

>>> directives

>>>> email.form.ts

>>>> project.name.ts

>>> main

>>>> app.main.ts

>>>> app.main.html

>>>> app.ticket.modal.ts

>>>> app.ticket.modal.html

>>>> app.dashboard.ts

>>> services

>>>> mock.data.ts

>>> fake.data.server

>>>> dataservice.ts

>>>> httpbackedMockService.ts

>>> layout

>>>> app.layout.ts

>>>> layout.html

>> **app.core.ts**

>> **app.ts**

>> scss

>>> _preloader.scss

>>> cog09.svg

>>> global.variables.scss

>>> layout.scss

>>> main.scss

>> tests

>>> ...

> index.html

```
#!python

     /**
       *  The hierarchy of this app is:
       *  Layout  <<< $httbackend mock service
       *     > main  <<< $httbackend mock service
       *        > modal <<< data from parent
       *          > send form  <<< data from parent
       *             >> form is send if nodemailer is running.
       */
```

***

##### -- Remarks --
* View card and edit view are the same form
* You need to setup your own SMTP to use and test ./nodemailer/
* Go to ./nodemailer/server.js > update your SMTP settings!
* Tested and works on Linux and Windows
* Bower files are installed in ./public dir, and used by "wiredep"
***

###### To be completed ?
* Not a complete project
* View card and edit view are the same form
* Not tested for mobile
* A little glich with bootstrap ui Modal vs Bootstrap alpha 4 - the transition not smooth 

***

##### Thank you