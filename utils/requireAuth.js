import React from "react";
import { connect } from "react-redux";
import { bool, object, string } from "prop-types";

export default function(ComposedComponent) {
  class Authenticate extends React.Component {
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.__rememberDestinationRoute(this.props);
      } else if (!localStorage.token) {
        this.props.history.push("/logout");
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.__rememberDestinationRoute(nextProps);
      } else if (nextProps.encryptionKey === "") {
        // Don't redirect if user is in dashboard
        if (nextProps.location.pathname !== "/") nextProps.history.push("/");
      } else if (!localStorage.token) {
        nextProps.history.push("/logout");
      }
    }

    __rememberDestinationRoute(props) {
      props.history.push(`/login?dir=${props.location.pathname}`);
    }

    render() {
      return (
        this.props.isAuthenticated && <ComposedComponent {...this.props} />
      );
    }
  }

  const mapStateToProps = store => {
    console.log(store);
    return {
      isAuthenticated: store.authentication.isAuthenticated,
      encryptionKey: store.encryptionKey.lastUpdated,
    };
  };

  Authenticate.propTypes = {
    history: object.isRequired,
    isAuthenticated: bool.isRequired,
    encryptionKey: string.isRequired,
    location: object.isRequired,
  };

  return connect(mapStateToProps)(Authenticate);
}
