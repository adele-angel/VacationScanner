import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile } from '../../actions/profileActions';
import { deleteVacation, addLike, removeLike } from '../../actions/vacationActions';
import classnames from 'classnames';
import Spinner from '../common/Spinner';

class VacationItemUnlike extends Component {
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
		const { vacation, showActions } = this.props;
		const { user } = this.props.auth;
		const { profile, loading } = this.props.profile;

		let itemControls, editButton, unfollow;

		let fromDate = new Date(vacation.from),
			toDate = new Date(vacation.to),
			from = (fromDate.getDate() + '/' + (fromDate.getMonth() + 1) + '/' + fromDate.getFullYear()).toString(),
			to = (toDate.getDate() + '/' + (toDate.getMonth() + 1) + '/' + toDate.getFullYear()).toString();

		if (profile === null || vacation === null || user === null || loading) {
			itemControls = <Spinner />;
		} else {
			editButton = (
				<Link to={`/vacation/${vacation._id}`}>
					{!showActions ? null : (
						<button type='button' className='btn btn-danger mr-1'>
							<i className='fas fa-pencil-alt' />
						</button>
					)}
				</Link>
			);
			itemControls = (
				<div>
					{profile.user.admin.toString() === 'true' ? (
						<p>
							{editButton}
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

			unfollow = (
				<div>
					{!this.findUserLike(vacation.likes) ? (
						<div className='card card-body mb-3'>
							<div className='row'>
								<div className='col-md-4 text-center'>
									<img className='rounded d-md-block' src={vacation.image} alt={vacation.title} />
								</div>
								<div className='col-md-8'>
									<p className='text-center mb-1'>
										<strong>{vacation.title}</strong>
										<span className='small'>
											&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;From: {from} &nbsp;&nbsp;&nbsp;&nbsp; To: {to}
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

		return [unfollow];
	}
}

VacationItemUnlike.defaultProps = {
	showActions: true
};

VacationItemUnlike.propTypes = {
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
)(VacationItemUnlike);
