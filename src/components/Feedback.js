import React from "react";
import { Alert } from "tabler-react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { clearFeedback } from "../store/actions/feedbackActions";
const Feedback = ({ feedback, clearFeedback }) => {
  return feedback.item.message ? (
    <Alert type={feedback.item.type}>
      {feedback.item.message}
      <button
        className="btn btn-sm btn-light float-right"
        onClick={clearFeedback}
      >
        Hide
      </button>
    </Alert>
  ) : (
    ""
  );
};

Feedback.prototype = {
  feedback: propTypes.object.isRequired,
  clearFeedback: propTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  feedback: state.feedback,
});
export default connect(mapStateToProps, { clearFeedback })(Feedback);
