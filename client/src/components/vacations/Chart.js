import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import { getCurrentProfile } from '../../actions/profileActions';
import { getVacations } from '../../actions/vacationActions';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

class Chart extends Component {
	componentDidMount() {
		this.props.getVacations();
		this.props.getCurrentProfile();
	}

	render() {
		const { vacations, loading } = this.props.vacation;
		const { profile } = this.props.profile;

		let chartContent;

		const data = vacations.reduce((data, vacation) => {
			if (vacation.likes.length > 0) data.push({ vacation: vacation.title, followers: vacation.likes.length });
			return data;
		}, []);

		const tickValues = vacations.reduce((data, vacation) => {
			if (vacation.likes.length > 0) data.push(vacation.likes.length);
			return data;
		}, []);

		const tickFormat = vacations.reduce((data, vacation) => {
			if (vacation.likes.length > 0) data.push(vacation.title);
			return data;
		}, []);

		if (vacations === null || profile === null || loading) {
			chartContent = <Spinner />;
		} else {
			chartContent = (
				<VictoryChart theme={VictoryTheme.material} domainPadding={20}>
					<VictoryAxis tickValues={tickValues} tickFormat={tickFormat} />
					<VictoryAxis dependentAxis tickFormat={x => `${x}`} />
					<VictoryBar data={data} x='vacation' y='followers' />
				</VictoryChart>
			);
		}

		return (
			<div className='chart text-center'>
				<h1 className='display-4'>Admin Report</h1>
				<h2>
					<span className='badge badge-light'>
						<small>Y: number of followers, X: vacation destination</small>
					</span>
				</h2>
				{chartContent}
			</div>
		);
	}
}

Chart.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	getVacations: PropTypes.func.isRequired,
	vacation: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	vacation: state.vacation,
	profile: state.profile,
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ getVacations, getCurrentProfile }
)(Chart);
