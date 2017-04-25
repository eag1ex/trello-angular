#### - Trello Angular -
A Trello like looking App using Angular.js and Bootstrap 4/Flexbox witn Nodemailer.


######Repo


###### Instalation

```
#!python

$/ npm install
$/ bower install
```

***
###### Start the App

```
#!python

  $/ npm run nodemailer   
 $/ npm start
```

***
##### Stack/Setup
* Angular 1.6/component, BootStrap alpha.6/Flexbox, Sass, Typescript, nodejs/Express, Nodemailer
* Following John Papa Angular Styleguide
* Integraded in modular fashion
* Using mock data as service
* Coded in OOP
***


##### File structure

> **app**

>> scripts

>>> main

>>>> app.main.ts

>>>> app.main.html

>>>> app.ticket.modal.html

>>>> app.dashboard.ts

>>> services

>>>> mock.data.ts

>>> layout

>>>> app.layout.ts

>>>> layout.html

>> **app.core.ts**

>> **app.ts**

>> scss

>>> global.variables.scss

>>> layout.scss

>>> main.scss

> index.html

```
#!python

     /**
       *  The hierarchy of this app is:
       *  Layout  <<< mockData
       *     > main  <<< mockData
       *        > modal <<< data from parent
       *          > send form  <<< data from parent
       *             >> form is send if nodemailer is running.
       */
```

***

##### -- Remarks --
* Not a complete project
* View card and edit view are the same form
* Not tested for mobile
* You need to setup your own SMTP to use and test ./nodemailer/  
***

###### To be completed ?
* Not a complete project
* View card and edit view are the same form
* Not tested for mobile
* 

***

##### Thank you