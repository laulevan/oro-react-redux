import React from "react";
import axios from "axios";
import validator from "validator";
import { bool, func, object } from "prop-types";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
// import userIPFuc from "app/utils/getUserIp";

import AccountLocked from "app/components/login/AccountLocked";
import AccountNotVerifiedForm from "app/components/login/AccountNotVerifiedForm";
import NavBar from "app/components/common/NavBar";
import { API_URL } from "app/config";
// import { Intercom } from "app/components/common";
// import { INTERCOM_KEY } from "app/constants";
import {
  LoginForm,
  ResendVerificationEmail,
  SessionTerminatedModal,
} from "app/components/login";
import {
  ACCOUNT_LOCKED,
  CAPTCHA_REQUIRED,
  INVALID_CAPTCHA,
  INVALID_EMAIL_ADDRESS,
  INVALID_USER_CREDENTIALS,
  THIS_FIELD_IS_REQUIRED,
  SHORT_PASSWORD,
  UNVERIFIED_EMAIL,
} from "app/errorMessages";
import { login } from "app/actions/login";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      openSessionTerminatedModal: localStorage.expiry === "expiry",
      isAccountLocked: false,
      isAccountVerified: true,
      isLoading: false,
      isResendEmailComplete: false,
      captcha: "",
      showCaptcha: false,
      countSubmit: 0,
      formErrors: {
        email: "",
        password: "",
        captcha: "",
      },
    };
    this.destinationRoute = this.props.location.search
      ? this.props.location.search.replace("?dir=", "")
      : "/";
  }

  componentWillMount() {
    if (this.props.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  onBlur = e => {
    e.preventDefault();
    const { password } = this.state;
    const formErrors = {};
    if (validator.isEmpty(password)) {
      formErrors.password = THIS_FIELD_IS_REQUIRED;
    } else if (password.length < 8) {
      formErrors.password = SHORT_PASSWORD;
    }
    this.setState({ formErrors });
  };

  /*
   * Developer's Note:
   * This is to handle the case when an account is not verified.
   * Sets the state of isAccountVerified back to true.
   * Here we assume that whenever a user tries to login, his
   * account is already verified. We will only find out if this
   * is really the case when we do an ajax request. The backend
   * will throw a 403 error stating that `Email address has not
   * been verified`.
   *
   * For a complete list of error messages. Check out the file
   * `errorMessages.js` in the app directory
   */

  onCancelResendVerificationEmail = e => {
    e.preventDefault();
    this.setState({
      isAccountVerified: true,
      email: "",
      password: "",
    });
  };

  /*
   * This is for handling the event when an account is locked.
   * This event handler turns hides the AccountLocked Component
   */

  onDismissOkButton = e => {
    e.preventDefault();
    this.setState({
      isAccountLocked: false,
    });
  };

  /*
   * This is for handling the event when a user has made a request
   * for a new verification email. From the user's point of view
   * this redirects them back to the login form.
   */

  onClickOkButton = e => {
    e.preventDefault();
    this.setState({
      isAccountVerified: true,
      isResendEmailComplete: false,
    });
  };

  /*
   * General event handler for updating the value of a form
   * field react style.
   */

  onChange = (e, newValue) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: newValue,
    });
  };

  onSend = e => {
    e.preventDefault();
    axios.post(`${API_URL}resendverificationemail`, {
      email: this.state.email,
    });
    this.setState({
      isResendEmailComplete: true,
    });
  };

  onSubmit = async e => {
    e.preventDefault();
    // let ip = await userIPFuc();
    // ip = JSON.parse(ip);
    const { isValid, formErrors } = this.validate();
    // this.setState({ userIp: ip.ip });
    if (!isValid) {
      return this.setState({ formErrors });
    }
    this.setState({ isLoading: true });
    try {
      this.setState({ formErrors: {} });
      await this.props.login(this.state);
      this.props.history.push(this.destinationRoute);
    } catch (err) {
      // Show Captcha after second typing wrong password
      if (this.state.countSubmit < 1) {
        this.setState({ countSubmit: this.state.countSubmit + 1 });
      } else {
        this.setState({ showCaptcha: true });
      }

      if (err.response && err.response.data.errors !== undefined) {
        this.setState({ isLoading: false });
        return this.setState({
          formErrors: err.response.data.errors,
        });
      }

      if (err.response && err.response.data.error !== undefined) {
        this.setState({ isLoading: false });
        switch (err.response.data.error) {
          case ACCOUNT_LOCKED: {
            return this.setState({
              isAccountLocked: true,
            });
          }
          case UNVERIFIED_EMAIL: {
            return this.setState({
              isAccountVerified: false,
            });
          }
          case INVALID_USER_CREDENTIALS: {
            return this.setState({
              formErrors: {
                password: INVALID_USER_CREDENTIALS,
              },
            });
          }
          case CAPTCHA_REQUIRED: {
            return this.setState({
              formErrors: {
                captcha: CAPTCHA_REQUIRED,
              },
            });
          }
          case INVALID_CAPTCHA: {
            return this.setState({
              formErrors: {
                captcha: INVALID_CAPTCHA,
              },
            });
          }
          default: {
            return this.setState({
              formErrors: {
                password: err.response.data.error,
              },
            });
          }
        }
      }
    }
  };

  onCloseSessionTerminatedModal = () => {
    localStorage.setItem("expiry", "");
    this.setState({ openSessionTerminatedModal: false });
  };

  getIp = () => {};

  /*
   * Used for disabling links on any of the forms
   * while the isLoading state is true
   */
  disableLinkOnLoading = e => {
    if (this.state.isLoading) {
      e.preventDefault();
    }
  };

  validate = () => {
    const formErrors = {};
    const { email, password } = this.state;
    if (validator.isEmpty(email)) {
      formErrors.email = THIS_FIELD_IS_REQUIRED;
    }
    if (!validator.isEmail(email)) {
      formErrors.email = INVALID_EMAIL_ADDRESS;
    }
    if (validator.isEmpty(password)) {
      formErrors.password = THIS_FIELD_IS_REQUIRED;
    }
    return {
      isValid: isEmpty(formErrors),
      formErrors,
    };
  };

  verifyCallbackCaptcha = captcha => {
    this.setState({ ...this.state, captcha });
  };

  render() {
    const {
      isAccountLocked,
      isAccountVerified,
      isResendEmailComplete,
    } = this.state;

    /*
     * Developer's Note:
     *
     * Im doing it this way because I
     * cant think of a better way to render conditionally.
     * One option that was available to me was using ternary
     * operators but that runs the risk of readability when
     * doing nested ternary operators already.
     * Feel Free to think of a better of achieving this.
     * */

    let Markup;
    if (isAccountLocked) {
      Markup = <AccountLocked onClick={this.onDismissOkButton} />;
    } else if (isAccountVerified) {
      Markup = (
        <LoginForm
          onBlur={this.onBlur}
          isLoading={this.state.isLoading}
          email={this.state.email}
          formErrors={this.state.formErrors}
          onChange={this.onChange}
          disableLinkOnLoading={this.disableLinkOnLoading}
          password={this.state.password}
          onSubmit={this.onSubmit}
          verifyCallbackCaptcha={this.verifyCallbackCaptcha}
          showCaptcha={this.state.showCaptcha}
        />
      );
    } else if (isResendEmailComplete && !isAccountVerified) {
      Markup = (
        <ResendVerificationEmail
          onClick={this.onClickOkButton}
          email={this.state.email}
          onChange={this.onChange}
          onCancel={this.onCancel}
        />
      );
    } else {
      Markup = (
        <AccountNotVerifiedForm
          email={this.state.email}
          onCancel={this.onCancelResendVerificationEmail}
          onChange={this.onChange}
          onSend={this.onSend}
        />
      );
    }
    return (
      <div className="container">
        <NavBar />
        <SessionTerminatedModal
          open={this.state.openSessionTerminatedModal}
          onClose={this.onCloseSessionTerminatedModal}
        />
        {Markup}
        {/* <Intercom appID={INTERCOM_KEY} /> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authentication.isAuthenticated,
  };
};

Login.propTypes = {
  login: func.isRequired,
  location: object.isRequired,
  history: object.isRequired,
  isAuthenticated: bool.isRequired,
};

export default connect(mapStateToProps, { login })(Login);
