import React from "react";
import Recaptcha from "react-recaptcha";
import { Link } from "react-router-dom";
import { LinearProgress, Paper, RaisedButton, TextField } from "material-ui";
import { bool, func, shape, string } from "prop-types";
import { SITE_KEY } from "app/constants";

const LoginForm = props => {
  return (
    <div className="flex-container">
      <LinearProgress
        style={{
          visibility: props.isLoading ? "visible" : "hidden",
          width: "500px",
        }}
      />
      <Paper zDepth={2} className="paper">
        <form onSubmit={props.onSubmit}>
          <div>
            <h1>Welcome to Oromico!</h1>
            <p>Login to begin creating your very own tax reports.</p>
            <TextField
              errorText={props.formErrors.email}
              floatingLabelFixed
              floatingLabelText="What's your email?"
              fullWidth
              name="email"
              onChange={props.onChange}
              type="text"
              value={props.email}
            />
            <TextField
              errorText={props.formErrors.password}
              floatingLabelFixed
              floatingLabelText="What is your password?"
              fullWidth
              name="password"
              onChange={props.onChange}
              type="password"
              value={props.password}
              onBlur={props.onBlur}
            />
            <div
              style={{
                visibility: props.showCaptcha ? "visible" : "hidden",
                height: props.showCaptcha ? "auto" : "0px",
              }}
            >
              <br />
              <Recaptcha
                sitekey={SITE_KEY}
                render="explicit"
                verifyCallback={props.verifyCallbackCaptcha}
              />
              <div className="errorCaptcha">{props.formErrors.captcha}</div>
            </div>
          </div>
          <br />
          <div className="form-control">
            <div className="form-link">
              <Link
                onClick={props.disableLinkOnLoading}
                className="link"
                to="/resetpassword"
              >
                Forgot your password?
              </Link>
              <br />
              <Link
                onClick={props.disableLinkOnLoading}
                className="link"
                to="/signup"
              >
                Don't have an account? Sign up
              </Link>
            </div>
            <div>
              <RaisedButton
                disabled={props.isLoading}
                label="Login"
                type="submit"
                primary
              />
            </div>
          </div>
        </form>
      </Paper>
    </div>
  );
};

LoginForm.defaultProps = {
  formErrors: {
    email: "",
    password: "",
    captcha: "",
  },
};

LoginForm.propTypes = {
  email: string.isRequired,
  onBlur: func.isRequired,
  isLoading: bool.isRequired,
  onSubmit: func.isRequired,
  disableLinkOnLoading: func.isRequired,
  onChange: func.isRequired,
  verifyCallbackCaptcha: func.isRequired,
  password: string.isRequired,
  showCaptcha: bool.isRequired,
  formErrors: shape({
    email: string,
    password: string,
    captcha: string,
  }).isRequired,
};

export default LoginForm;
