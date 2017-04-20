#### - Nimble3 Dashboard -

######Repo
git@bitbucket.org:man777/nimbl3.test.git

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

 $/ gulp
```

***
##### Stack/Setup
* Angular 1.6/component, BootStrap alpha.6/Flexbox, Sass, Typescript
* Integraded Fake server, can be swapped to real API
* Following John Papa Angular Styleguide
* Sass Methologies
* Coded in OOP
***


##### File structure

> **app**

>> scripts

>>> dashboard

>>>> app.dashboard.html

>>>> app.dashboard.ts

>>> fake.data.server

>>>> _mockdata.ts

>>>> dataservice.ts

>>>> httpbackedMockService.ts

>>>> module.data.ts

>>> layout

>>>> app.layout.ts

>>>> layout.html

>> **app.core.ts**

>> **app.ts**

>> scss

>>> fonts/

>>> _sprite.scss

>>> global.variables.scss

>>> layout.scss

>>> main.scss

>>> svg_sprite.svg

> index.html

***


##### -- Remarks --
* Gulp development setup, not optimised for production
* Gulp rendered (html/js/css/svg) files location > ./public/dist
* Bower files location > ./public/bower_components 
***

###### To be completed ?
* Not completed validation for iphone 6
* Some issue with layout of table on mobile
* Login page not done
***

##### Thank you