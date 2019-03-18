import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';

import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import Profiles from './components/profiles/Profiles';
import Vacations from './components/vacations/Vacations';
import VacationForm from './components/vacations/VacationForm';
import Vacation from './components/vacation/Vacation';
import Chart from './components/vacations/Chart';
import Error404 from './components/common/Error404';

import './App.css';

// check for token
if (localStorage.jwtToken) {
	// set auth token header auth
	setAuthToken(localStorage.jwtToken);
	// decode token and get user info and exp
	const decoded = jwt_decode(localStorage.jwtToken);
	// set user in isAuthenticated
	store.dispatch(setCurrentUser(decoded));
	// check for expired token
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		// logout user
		store.dispatch(logoutUser());
		// clear current profile
		store.dispatch(clearCurrentProfile());
		// redirect to login
		window.location.href = '/login';
	}
}

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div className='App'>
						<Navbar />
						{/* <Route exact path='/' component={Landing} /> */}
						<div className='container'>
							<Switch>
								<Route exact path='/' component={Landing} />
								<Route exact path='/register' component={Register} />
								<Route exact path='/login' component={Login} />
								<Route exact path='/profiles' component={Profiles} />

								<PrivateRoute exact path='/dashboard' component={Dashboard} />
								<PrivateRoute exact path='/create-profile' component={CreateProfile} />
								<PrivateRoute exact path='/edit-profile' component={EditProfile} />
								<PrivateRoute exact path='/vacations' component={Vacations} />
								<PrivateRoute exact path='/add-vacation' component={VacationForm} />
								<PrivateRoute exact path='/vacation/:id' component={Vacation} />
								<PrivateRoute exact path='/chart' component={Chart} />

								<Route component={Error404} />
							</Switch>
						</div>
						<Footer />
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
