## Project description :star:
Developer APi for a catalog management application.

## What you as a user can do :checkered_flag:

:small_blue_diamond: Register, update and delete products.

:small_blue_diamond: Register, update and delete categories.

:small_blue_diamond: Filter products by title.

:small_blue_diamond: Filter products by categories.

## what you need

[Node](https://nodejs.org/en/download/)

[Yarn](https://yarnpkg.com/)

## How to install 

On terminal, clone the project: 

```
git clone https://github.com/LeonardoSalmento/test-backend-nodejs.git
```

get in the folder project:

```
cd test-backend-nodejs
```

Install dependencies:
```
yarn
```
or 

```
npm install
```

To create a file called ".env" and fill the variables below with information from your own database on mongoDb:

DB_PASSWORD=**
DB_NAME=**


And execute o command:
```
yarn start
```

or 


```
npm start
```

The applycation is ready to run in http://localhost:3333/

## Database

As Database I used MongoDB.

Were created scheemas below:

### User

name  | email  | password |created | updated
------|--------|----------|--------|--------
String|String|String|Date|Date

### Product

name|email|pawword|Category|created|updated
----|-----|-------|--------|-------|-------
String|String|String|Object|Date|Date

### Category

title|created|updated
------|------|-------
String|Date|Date



