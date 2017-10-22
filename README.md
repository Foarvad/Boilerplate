# Boilerplate

This is another one boilerplate for frontend development.
It involves convenient environment for development maintainable and well-structured frontend for websites.

### Info worth to know

It doesn't contain any frontend framework such as React/Angular/Vue/Ember etc.

## What does the boilerplate consist of?

### HTML:

* [Pug(ex Jade)](https://pugjs.org/api/getting-started.html) is used for preprocessing;
* The markup is divided to logic components;

```layout.pug``` is a common template of page(meta tags, css and js files to load)
```index.pug``` is a typical content component which inherits ```layout.pug``` as a template page markup.
As well, ```index.pug``` contains variables, whose value will convert into css and js file name to load.

### CSS:

* Stylus is used for preprocessing;
* PostCSS is used for postprocessing;
* All css files are divided to logic components;

### Gulp

[Gulp](https://gulpjs.com) is tool for automation of workflow. It works like: ```input file => reform/action => output```
Learn a full list of plugins in ```package.json```

### Libraries

It has some frequently used libraries that i use on daily basis.

## How to launch 

### Node.js

Gulp needs [Node.js](https://nodejs.org/en) installed in order to work.
Check if your Node.js is installed. Open Command Prompt(cmd) and paste:
```
node -v
```

### NPM

Npm(https://www.npmjs.com) is distributed with Node.js. So, just need to update it if needed.
In case you do, update Npm to latest version:
```
npm install npm@latest -g
```

### Running the environment

This environment needs a predefined packages to work with. Find directory of folder with Command Prompt and paste:
```
npm install
```

Once you've got node_modules folder with needed packages, you have 2 commands in disposal:
```gulp watch``` It launches environment and watches your files
```gulp build``` It compiles files and get it ready for release