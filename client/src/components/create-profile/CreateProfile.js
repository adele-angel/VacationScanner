import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import { createProfile } from '../../actions/profileActions';

class CreateProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			handle: '',
			errors: {}
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	onSubmit(e) {
		e.preventDefault();

		const profileData = {
			handle: this.state.handle
		};

		this.props.createProfile(profileData, this.props.history);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		const { errors } = this.state;

		return (
			<div className='create-profile'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-8 m-auto'>
							<h1 className='display-4 text-center'>Create Your Profile</h1>
							<p className='lead text-center'>Choose your nickname</p>
							<small className='d-block pb-3'>* = required fields</small>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									placeholder='* Profile Nickname'
									name='handle'
									value={this.state.handle}
									onChange={this.onChange}
									error={errors.handle}
									info='A unique nickname for your profile URL'
								/>
								<div className='mb-3' />
								<input type='submit' value='Submit' className='btn btn-info btn-block mt-4' />
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

CreateProfile.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ createProfile }
)(withRouter(CreateProfile));
