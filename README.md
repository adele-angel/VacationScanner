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

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts
In the project directory, you can run:

#### `npm start`
Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

#### `npm test`
Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`
Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can’t go back!**
If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Learn More
You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
To learn React, check out the [React documentation](https://reactjs.org/).

#### Code Splitting
This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

#### Analyzing the Bundle Size
This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

#### Making a Progressive Web App
This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration
This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment
This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify
This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
