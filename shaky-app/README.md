# Shaky-App

Description of the awesome Shaky App

## Table of Contents

  - Set-Up
  - Build Process
      - Used Tools
      - Prerequisites
      - Installation
  - Start the server
	- Directory Structure
  - Unit tests
    - Prerequisites
    - Run tests
  - Debug DB

## Build Process

### Used Tools

- *NodeJS (server-side JavaScript Environment)*
- *Node Package Manager (package manager for JavaScript node modules)* used for managing the third party library dependencies (e.g. express, mongoose, ...)

### Prerequisites

  - Required:
    - NodeJS, version 6.11.4+
    - Node Package Manager, version 5.5.1+
    - MongoDb, version 3.4
  - Optional:
    - Nodemon, restarts nodejs-server if any file changes in the source code are made

### Installation

After you fulfilled all the prerequisites you need to install the required packages.
Change in the root of the project directory and open a command line interface. To install the npm packages just run

```sh
$ npm install
```
The installed packages are stored in the *node_modules* folder.

## Start the server

The file app.js is entry point of the backend server.

You can start the server either by running this command:

```sh
$ node app.js
```
or

```sh
$ npm start
```

or use this command:

```sh
$ nodemon app.js
```
to reload the server automatically each time file changes are made.

If you want the pug-Files to be reloaded as well, use the following command:

```sh
$ nodemon -e .pug,.js app.js
```

## Directory Structure

- *config*
    - contains configuration environments and database

- *src*

	-  *controllers*
  	- contains all all controllers
	-  *models*
		- contains all mongoose-Models
	-  *static*
  	- contains static files (css/js)
	-  *views*
  	- contains all view-files in .pug-Format

- *node-modules*
    - contains build-tools installed with npm

## Unit tests

Used test-tool: *mocha*

### Prerequisites

Before you can run the tests you must have *mocha* installed. Run
```
$ npm install -g mocha
```

### Run tests

To run the tests be sure you are in the root-directory.

You can either call `$ mocha` or `$ npm test`

## Debug DB

You can use [RoboMongo](https://robomongo.org/) to check the data in the database.
