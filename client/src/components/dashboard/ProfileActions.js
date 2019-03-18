import React from 'react';
import { Link } from 'react-router-dom';

const ProfileActions = () => {
	return (
		<div>
			<div className='btn-group mb-4' role='group'>
				<Link to='/edit-profile' className='btn btn-light'>
					<i className='fas fa-user-circle text-info mr-1' /> Edit Profile
				</Link>
			</div>
			<div className='btn-group mb-4' role='group'>
				<Link to='/vacations' className='btn btn-light'>
					<i className='fas fa-globe-americas text-info mr-1' /> View Vacations
				</Link>
			</div>
		</div>
	);
};

export default ProfileActions;