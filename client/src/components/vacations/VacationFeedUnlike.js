import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VacationItemUnlike from './VacationItemUnlike';

class VacationFeedUnlike extends Component {
	render() {
		const { vacations } = this.props;

		return vacations.map(vacation => <VacationItemUnlike key={vacation._id} vacation={vacation} />);
	}
}

VacationFeedUnlike.propTypes = {
	vacations: PropTypes.array.isRequired
};

export default VacationFeedUnlike;
