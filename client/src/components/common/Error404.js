import React from 'react';
import { Link } from 'react-router-dom';

const Error404 = () => {
	return (
		<div className='error404 text-center'>
			<h1 className='display-1'>
				<i className='fas fa-frown text-info' />
			</h1>
			<h1 className='display-2'>404</h1>
			<h1 className='display-4'>Page not found</h1>
			<p>The page you are looking for doesn't exist or an other error has occurred</p>
			<p>
				<Link to='/dashboard'>Click here </Link>to redirect back to dashboard, or had over to
				<Link to='/vacations'> vacations page </Link>to view other vacations
			</p>
		</div>
	);
};

export default Error404;
