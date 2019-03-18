import React from 'react';
import { Link } from 'react-router-dom';

const AdminActions = () => {
	return (
		<div>
			<div className='btn-group mb-4' role='group'>
				<Link to='/add-vacation' className='btn btn-light'>
					<i className='fas fa-plus-circle text-info mr-1' /> Add vacation
				</Link>
			</div>
			<div className='btn-group mb-4' role='group'>
				<Link to='/vacations' className='btn btn-light'>
					<i className='fas fa-eye text-info mr-1' /> View Vacations
				</Link>
			</div>
			<div className='btn-group mb-4' role='group'>
				<Link to='/chart' className='btn btn-light'>
					<i className='fas fa-chart-bar text-info mr-1' /> View Report
				</Link>
			</div>
		</div>
	);
};

export default AdminActions;
