import React, { Component } from 'react';
import PropTypes from 'prop-types';
var dateFormat = require('dateformat');

class ProfileItem extends Component {
	render() {
		const { profile } = this.props;

		return (
			<div className='card card-body bg-light mb-3'>
				<div className='row'>
					<div className='col-2'>
						<img src='../../images/avatar.png' alt='' className='rounded-circle' />
					</div>
					<div className='col-lg-6 col-md-4 col-8'>
						<h3>
							{profile.user.firstname} {profile.user.lastname}
						</h3>
						<p>{profile.handle}</p>
						<p>
							{profile.user.admin ? (
								<span className='text-danger'>Administrator</span>
							) : (
								<span>Non-Admin User</span>
							)}
						</p>
						<p>Joined on {dateFormat(profile.date, 'dddd, mmmm dS, yyyy, h:MM:ss TT')}</p>
					</div>
				</div>
			</div>
		);
	}
}

ProfileItem.propTypes = {
	profile: PropTypes.object.isRequired
};

export default ProfileItem;
