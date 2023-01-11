<h1>Backend Analyst Candidate Testing</h1>

Hello dear developer, in this test we will analyze your general knowledge and even speed of development. Below we will explain everything that will be needed.
Do not be alarmed, we do not expect everyone to be able to complete all tasks, this test is the same presented for candidates of all experience levels, so do what you can without worry.

<strong>The challenge</strong>

Your challenge is to develop an API, using Node.JS, for a product catalog management application. Thus, you must analyze and convert the user stories below into routes of an application.
 
<strong>User stories:</strong>

- As a user I would like to register a product so that I can have access to the data of this product in the future (Title, description, price, category)
- I as a user would like to be able to associate and edit a product category;
- As a user I would like to be able to access the list of all products;
- As a user I would like to be able to filter products by name or category;
- I as a user would like to be able to update the product data;
- I as a user would like to be able to delete a product from my catalog;
 
<strong>Instructions</strong>
- <strong>To start the test, <strong>fork</strong> this repository, create a branch with its full name and then and send us the link to the test performed (link to your repository) . If you just clone the repository you will not be able to push and then it will be more complicated to make the pull request.</strong>
- The choice of libraries, databases, architecture, etc. is at your discretion.
- Change the README file explaining what it takes to run your application.
- Paste the branch name into the GUPY system and indicate the completion of the test
- If you want you can leave us feedback regarding the test

 
<strong>Our analysis</strong>
- Knowledge of Javascript, NodeJs, Express will be assessed for this position;
- We'll look at how you structure the:
  application layers;
  outgoing calls,
  environment variables,
   cache,
  unit tests,
  logs;
  error handling;
  documentation.
- Code organization, module separation, readability and comments.
- Commit history.
- The use of MongoDB is a differentiator

<h1>Code Documentation</h1>
Hello, dear. Below is the usage documentation.

After downloading the project,it is necessary to install all project dependencies with npm

```console
anotaai@pc:~$ npm install
```
Now it is possible to run up the server with the command

```console
anotaai@pc:~$ npm run dev
```

<h2>About API</h2>
Here is some technical information about modeling the problem

<h3>Schemas</h3> 
two schemes were models:

- Products: mproducts has categories reference
```javascript 
    id: {type: String, required: false},
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'category', required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true}
```
- Categories:
```javascript
const categorySchema = new mongoose.Schema({
    id: {type: String, required: false}, 
    title: {type: String, require: true}
})
```

<h3>Routes</h3>

Method |  EndPoint | Returns
:---------: | :------ | :-------:
<strong>GET</strong> | /products | products: Array 
<strong>GET</strong> | /products/category/:id | product: Object
<strong>POST</strong>| /product/category/     | message: Object
