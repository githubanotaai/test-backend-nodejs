<h1>Creating a simple Product Api Catalog Using Nodejs,MongoDB and Express</h1>

# NodeJs-ExpressJs-CRUD
Developing Restful API with Node.js and MongoDB Atlas Cloud. 
-CHANGE DB USERNAME AND PASS

## Installation

Use the package manager npm.

```bash
npm install body-parser
npm install express
npm install mongodb
npm install mongoose
npm install validator
```

## Setup

The API requires:
 * [Node.js](https://nodejs.org/en/download/)
 * [Express](https://expressjs.com/)
 * [Mocha](https://mochajs.org/) - For testing

To get up and running: 

**1.** Clone the repo.
```
git clone https://github.com/oyugirachel/test-backend-nodejs
.git
```

**2.**  ```cd``` into repo. Use the same directory name(below) if you do not change it.
```
cd test-backend-nodejs
```

**3.**  Setup the application by installing its dependencies with
```
npm install
```

**4.**  The app gets up and running on port 8082 with ```npm start```.

**5.**  **Important** Create a ```.env``` file and set ```jwtSecret``` to any secret phrase you want.
 

# Testing the API routes.

Since this is mostly an API with post and patch requests, testing will be done with [Postman](https://www.getpostman.com/)

# Usage

```nodejs
localhost:8082/products/create with keys.
new CRUD operations will be added .

```

# Start mongo server
We will be using Atlas Mongo for this Api
First of all, open mongodb/mongo.conf and set you local IP address against which you your mongo database server will be running. **Preferably set to access from anywhere which is usually at 0.0.0**

For more on mongo configuration option, visit [Mongodb docs](https://docs.mongodb.com/manual/reference/configuration-options/#configuration-file)
Now run following command in command prompt/terminal(in root folder)
```
mongod --config=mongodb/mongo.conf
```
This will start mongo database server and it keeps running until you manually stops it. 


# Start web server
Now open another command prompt/terminal(in root folder) and run following command -
```
npm run app
```
This will start node server running on port 8082.

# Testing services
There are various tools to test restful services. Some popular ones are - **Postman, Advanced REST client(for chrome)** etc.
OR
To test whether server is working fine, just hit any GET type service in your browser. *Note - You can find relative service paths in app.js file*
`Eg - http://localhost:8082/getProduct`
Initially you don't have any record, you'll get an empty array in response. You can check it in network panel of browser.

To try inserting new record, use following sample data.
```
[{"name":"Pizza"},{"name":"Casserole"}]
```
Since **insertProducts** service is currently working as bulk insertion, you have to send array of data.

# Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

