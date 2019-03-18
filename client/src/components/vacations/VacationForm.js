import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addVacation } from '../../actions/vacationActions';

class VacationForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			info: '',
			image: '',
			from: '',
			to: '',
			price: '',
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

		const newVacation = {
			title: this.state.title,
			info: this.state.info,
			image: this.state.image,
			from: this.state.from,
			to: this.state.to,
			price: this.state.price
		};

		this.props.addVacation(newVacation);

		this.setState({
			title: '',
			info: '',
			image: '',
			from: '',
			to: '',
			price: ''
		});
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		const { errors } = this.state;

		return (
			<div className='post-form mb-3'>
				<div className='card card-info'>
					<div className='card-header bg-info text-white'>Create A New Vacation</div>
					<div className='card-body'>
						<form onSubmit={this.onSubmit}>
							<TextFieldGroup
								placeholder='Title'
								name='title'
								value={this.state.title}
								onChange={this.onChange}
								error={errors.title}
								info='Type in destination city'
							/>
							<TextFieldGroup
								placeholder='Image URL'
								name='image'
								value={this.state.image}
								onChange={this.onChange}
								error={errors.image}
							/>
							<TextAreaFieldGroup
								placeholder='Type in a vacation description'
								name='info'
								value={this.state.info}
								onChange={this.onChange}
								error={errors.info}
							/>
							<TextFieldGroup
								name='from'
								type='date'
								value={this.state.from}
								onChange={this.onChange}
								info='Type in starting date'
								error={errors.from}
							/>
							<TextFieldGroup
								name='to'
								type='date'
								value={this.state.to < this.state.from ? this.state.from : this.state.to}
								onChange={this.onChange}
								info='Type in ending date. Ending date must be equal or later then starting date, otherwise it will be automatically assume the starting date value'
								error={errors.to}
							/>
							<TextFieldGroup
								placeholder='Price'
								name='price'
								type='number'
								value={this.state.price}
								onChange={this.onChange}
								error={errors.price}
							/>
							<button type='submit' className='btn btn-dark'>
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

VacationForm.propTypes = {
	addVacation: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ addVacation }
)(VacationForm);
