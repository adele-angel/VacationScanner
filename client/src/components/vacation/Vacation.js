import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import VacationItemUnlike from '../vacations/VacationItemUnlike';
import EditVacationForm from './EditVacationForm';
import Spinner from '../common/Spinner';
import { getVacation } from '../../actions/vacationActions';

class Vacation extends Component {
	componentDidMount() {
		this.props.getVacation(this.props.match.params.id);
	}

	render() {
		const { vacation, loading } = this.props.vacation;
		let vacationContent;

		if (vacation === null || loading || Object.keys(vacation).length === 0) {
			vacationContent = <Spinner />;
		} else {
			vacationContent = (
				<div>
					<VacationItemUnlike vacation={vacation} showActions={false} />
					<EditVacationForm vacationId={vacation._id} vacationOld={vacation} />
				</div>
			);
		}

		return (
			<div className='vacation'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-12'>
							<Link to='/vacations' className='btn btn-light mb-3'>
								Back To Vacation List
							</Link>
							{vacationContent}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Vacation.propTypes = {
	getVacation: PropTypes.func.isRequired,
	vacation: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	vacation: state.vacation
});

export default connect(
	mapStateToProps,
	{ getVacation }
)(Vacation);
