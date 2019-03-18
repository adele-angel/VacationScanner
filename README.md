# VacationScanner
Vacation booking website (single page application). The website's system is role-based access control.

### Regular user can:
- Register & login into the system
- Delete account
- View vacations
- Add vacations to favorites
- Remove vacations from favorites

### Administrator can:
- Login into the system
- Delete account
- View, add, edit and delete vacations
- View a vacation statistics chart. Vacations versus number of followers

## Online Demo
https://vacation-scanner.herokuapp.com/

> To login as administrator use the following email and password

    Username: admin@gmail.com
    Password: qaz123

## Usage
1. Replace database URI
2. cd project folder
3. type nodemon in terminal to start application

###### Server packages

```
npm install --save
bcrypt
body-parser
concurrently
express
jsonwebtoken
moment
mongoose
passport
passport-jwt
validator
```
```
npm install --save-dev nodemon
```

###### Client packages

```
npm install --save
axios
classnames
jwt-decode
react
react-dom
react-redux
react-router-dom
react-scripts
redux
redux-thunk
victory
```

### Learning Objectives
- HTML5 + CSS3 + Bootstrap 4.0 + JavaScript (ES6)
- React.js
	* JSX
	* Redux.js
	* React middleware
	* MVC
	* router
- Node.js
	* Express.js
	* RESTfull application
- MongoDB
	* Database queries
	* Mongoose ODM
- Web deployment
	* Heroku
