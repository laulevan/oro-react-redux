import React from "react";
import { connect } from "react-redux";
import { func, object } from "prop-types";
import { logout } from "app/actions/login";
import { dispatchNewFiles, dispatchStopUpload } from "app/actions/newUpload";

class Logout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    this.props.logout();

    // Clear newFilesUpload
    this.props.dispatchNewFiles([]);
    this.props.dispatchStopUpload(false);

    this.props.history.push("/login");
  }

  render() {
    return null;
  }
}

const mapStateToProps = () => {
  return {};
};

Logout.propTypes = {
  dispatchNewFiles: func.isRequired,
  dispatchStopUpload: func.isRequired,
  logout: func.isRequired,
  history: object.isRequired,
};

export default connect(mapStateToProps, {
  dispatchNewFiles,
  dispatchStopUpload,
  logout,
})(Logout);
