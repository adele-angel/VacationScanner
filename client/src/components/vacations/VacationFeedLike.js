import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VacationItemLike from './VacationItemLike';

class VacationFeedLike extends Component {
	render() {
		const { vacations } = this.props;

		return vacations.map(vacation => <VacationItemLike key={vacation._id} vacation={vacation} />);
	}
}

VacationFeedLike.propTypes = {
	vacations: PropTypes.array.isRequired
};

export default VacationFeedLike;
