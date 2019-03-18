import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import VacationForm from "./VacationForm";
import Spinner from "../common/Spinner";
import { getCurrentProfile } from "../../actions/profileActions";
import { getVacations } from "../../actions/vacationActions";
import VacationFeedLike from "./VacationFeedLike";
import VacationFeedUnlike from "./VacationFeedUnlike";

class Vacations extends Component {
  componentDidMount() {
    this.props.getVacations();
    this.props.getCurrentProfile();
  }

  render() {
    const { vacations, loading } = this.props.vacation;
    const { profile } = this.props.profile;
    let vacationContent;

    if (vacations === null || profile === null || loading) {
      vacationContent = <Spinner />;
    } else {
      vacationContent = (
        <div>
          {profile.user.admin.toString() === "true" ? (
            <div>
              <button
                type="button"
                className="btn btn-info"
                data-toggle="collapse"
                data-target="#open_form"
              >
                <i className="fas fa-plus-circle text-light mr-1" />
                &nbsp; Add Vacation
              </button>
              <br />
              <br />
              <div id="open_form" className="collapse">
                <VacationForm />
              </div>
            </div>
          ) : null}
        </div>
      );
    }

    return (
      <div className="vacations">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {vacationContent}
              <VacationFeedLike vacations={vacations} />
              <VacationFeedUnlike vacations={vacations} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Vacations.propTypes = {
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
)(Vacations);
