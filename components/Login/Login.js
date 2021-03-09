import React, { Component } from "react";
import axios from "axios";
import { Form, Field } from "react-final-form";
import { TextField, Checkbox, Radio, Select } from "final-form-material-ui";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import { default as TF } from "@material-ui/core/TextField";
import {
  Typography,
  Paper,
  Link,
  Grid,
  Button,
  CssBaseline,
  RadioGroup,
  FormLabel,
  MenuItem,
  FormGroup,
  FormControl,
  FormControlLabel,
} from "@material-ui/core";
import ComplaintForm from "../../ComplaintForm";
import ViewComplaint from "../ViewComplaint/ViewComplaint";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailid: "",
      otp: 0,
      isValid: true,
      redirectToregister: false,
      otpSent: false
    };
  }

  validate = (values) => {
    let errors = {};
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!values.email) {
      errors.email = "Required";
      this.setState({
        isValid: false,
        emailid: values.email,
      });
    } else if (!re.test(values.email)) {
      errors.email = "Enter valid email address.";
      this.setState({
        isValid: false,
        emailid: values.email,
      });
    } else {
      this.setState({
        isValid: true,
        emailid: values.email,
      });
    }
    if (!values.otp) {
      errors.otp = "Required";
    } else {
      this.setState({
        otp: values.otp,
      });
    }
    return errors;
  };

  verifyResponse = (resp) => {
    // write the code for resp decode and set the hasSignedIn variable to true
    this.setState({
      redirectToregister: true,
    });
  };

  ChangeOTPHandler = (event) => {
    this.setState({
      otp: event.target.value,
    });
  };

  ChangeEmailHandler = (event) => {
    const email = event.target.value;
    const isValid = this.validateEmail(email);
    if (!isValid) {
      this.setState({
        isValid: false,
        error: "Invalid Emailid",
        emailid: event.target.value,
      });
    } else {
      this.setState({
        isValid: true,
        error: "",
        emailid: event.target.value,
      });
    }
  };

  sendOTPHandler = () => {
    console.log("sending otp", this.state);
    axios
      .post("/sendotp", {
        params: {
          emailid: this.state.emailid,
        },
      })
      .then(() => {
        console.log("OTP has been sent");
        this.setState({otpSent: true});
      })
      .catch((err) => {
        console.error(err);
      });
  };

  verifyOTPHandler = () => {
    console.log("Verifying OTP", this.state);
    let x = this.verifyResponse();
    // axios
    // .get(URL+'/verify', {
    //   params: {
    //     emailid: this.state.emailid,
    //     otp: this.state.otp
    //   }
    // })
    // .then((response) => this.verifyResponse(response))
    // .catch(err => console.error(err));
  };

  render() {
    // <Route exact path="/viewcomplain" component={ComplaintViForm}></Route>
    let isDisabled = !this.state.isValid;
    if (this.state.redirectToregister) {
      return (
        <BrowserRouter>
          <Route exact path="/viewcomplain" component={ViewComplaint}></Route>
          <Route exact path="/register" component={ComplaintForm}></Route>
          <Redirect
            to={{
              pathname: "/viewcomplain",
              state: { emailid: this.state.emailid },
            }}
          />
        </BrowserRouter>
      );
    } else {
      return (
        <div style={{ padding: 16, margin: "auto", maxWidth: 600 }}>
          {/* <CssBaseline /> */}
          <Typography variant="h4" align="center" component="h1" gutterBottom>
            Compplaint Registration Login
          </Typography>
          <Typography variant="h6" align="center" component="h6" gutterBottom>
            Verify Email ID
          </Typography>

          <Form
            onSubmit={this.verifyOTPHandler}
            validate={this.validate}
            initialValues={{}}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
              <form onSubmit={handleSubmit}>
                <Paper style={{ padding: 16 }}>
                  <Grid container alignItems="center" spacing={2}>
                    {/* <Grid item xs={1} /> */}
                    <Grid item xs={10}>
                      <Field
                        name="email"
                        // defaultValue={"jagtapraj123@gmail.com"}
                        fullWidth
                        required
                        component={TextField}
                        type="email"
                        label="Email"
                        required
                      />
                    </Grid>

                    {/* <Grid item xs={1} /> */}

                    <Grid item xs={10}>
                      <Field
                        fullWidth
                        required
                        name="otp"
                        component={TextField}
                        type="number"
                        label="OTP"
                        required
                      />
                    </Grid>

                    <Grid item style={{ marginTop: 16 }}>
                      <Button
                        type="button"
                        variant="contained"
                        onClick={() => {
                          this.sendOTPHandler();
                        }}
                        disabled={submitting || pristine}
                      >
                        Send OTP
                      </Button>
                    </Grid>
                    <Grid item style={{ marginTop: 16 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={submitting || isDisabled}
                      >
                        Submit
                      </Button>
                    </Grid>
                    {(this.state.optSent) && <span>OTP is sent to {this.state.email}</span>}
                  </Grid>
                </Paper>
                {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
              </form>
            )}
          />
        </div>
      );
    }
  }
}

export default Login;
