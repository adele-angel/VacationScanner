import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile } from '../../actions/profileActions';
import { deleteVacation, addLike, removeLike } from '../../actions/vacationActions';
import classnames from 'classnames';
import Spinner from '../common/Spinner';

class VacationItemLike extends Component {
	componentDidMount = () => {
		this.props.getCurrentProfile();
	};

	onDeleteClick(id) {
		this.props.deleteVacation(id);
	}

	onLikeClick(id) {
		this.props.addLike(id);
	}

	onUnlikeClick(id) {
		this.props.removeLike(id);
	}

	findUserLike(likes) {
		const { auth } = this.props;
		if (likes.filter(like => like.user === auth.user.id).length > 0) {
			return true;
		} else return false;
	}

	render() {
		const { vacation } = this.props;
		const { user } = this.props.auth;
		const { profile, loading } = this.props.profile;

		let itemControls, follow;

		function formatDate(date) {
			var d = new Date(date),
				month = '' + (d.getMonth() + 1),
				day = '' + d.getDate(),
				year = d.getFullYear();
			if (month.length < 2) month = '0' + month;
			if (day.length < 2) day = '0' + day;
			return [year, month, day].join('-');
		}

		if (profile === null || vacation === null || user === null || loading) {
			itemControls = <Spinner />;
		} else {
			itemControls = (
				<div>
					{profile.user.admin.toString() === 'true' ? (
						<p>
							<Link to='/edit-vacation'>
								<button type='button' className='btn btn-danger mr-1'>
									<i className='fas fa-pencil-alt' />
								</button>
							</Link>
							<button
								onClick={this.onDeleteClick.bind(this, vacation._id)}
								type='button'
								className='btn btn-danger mr-1'>
								<i className='fas fa-times' />
							</button>
						</p>
					) : (
						<button
							onClick={this.onLikeClick.bind(this, vacation._id)}
							type='button'
							className='btn btn-light mr-1'>
							<i
								className={classnames('fas fa-heart', {
									'text-danger': this.findUserLike(vacation.likes)
								})}
							/>
							<span className='badge badge-light'>{vacation.likes.length}</span>
						</button>
					)}
				</div>
			);

			follow = (
				<div>
					{this.findUserLike(vacation.likes) ? (
						<div className='card card-body mb-3'>
							<div className='row'>
								<div className='col-md-4 text-center'>
									<img className='rounded d-md-block' src={vacation.image} alt={vacation.title} />
								</div>
								<div className='col-md-8'>
									<p className='text-center mb-1'>
										<strong>{vacation.title}</strong>
										<span className='small'>
											&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;From: {formatDate(vacation.from)}{' '}
											&nbsp;&nbsp;&nbsp;&nbsp; To: {formatDate(vacation.to)}
										</span>
									</p>
									<p className='lead'>{vacation.info}</p>
									<div className='row text-center'>
										<div className='col text-left'>
											<button type='button' className='btn btn-warning mr-1'>
												Order today for ${vacation.price.toLocaleString('il-EG')}
											</button>
										</div>
										<div className='col text-right'>{itemControls}</div>
									</div>
								</div>
							</div>
						</div>
					) : null}
				</div>
			);
		}

		return [follow];
	}
}

VacationItemLike.propTypes = {
	addLike: PropTypes.func.isRequired,
	removeLike: PropTypes.func.isRequired,
	deleteVacation: PropTypes.func.isRequired,
	vacation: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ deleteVacation, addLike, removeLike, getCurrentProfile }
)(VacationItemLike);
