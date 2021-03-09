import React, { Component } from "react";
import axios from "axios";
import { Form, Field } from "react-final-form";
import { TextField, Checkbox, Radio, Select } from "final-form-material-ui";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import { default as TF } from "@material-ui/core/TextField";
import Viewbyadmin from '../Viewbyadmin/Viewbyadmin';
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

class AuthLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginid: "",
      password: "",
      isValidID: true,
      isValidPass: true,
      redirectToView: false,
    };
  }

  validate = (values) => {
    let errors = {};
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!values.loginid) {
      errors.loginid = "Required";
      this.setState({
        isValidID: false,
        loginid: values.loginid,
      });
      // } else if (!re.test(values.loginid)) {
      //   errors.loginid = "Enter valid email address.";
      //   this.setState({
      //     isValidID: false,
      //     emailid: values.email,
      //   });
    } else {
      this.setState({
        isValidID: true,
        loginid: values.loginid,
      });
    }
    if (!values.password) {
      errors.password = "Required";
      this.setState({
        password: values.password,
        isValidPass: false,
      });
    } else {
      this.setState({
        password: values.password,
        isValidPass: true,
      });
    }
    return errors;
  };

  verifyResponse = (resp) => {
    // write the code for resp decode and set the hasSignedIn variable to true
    this.setState({
      redirectToView: true,
    });
  };

  //   ChangeOTPHandler = (event) => {
  //     this.setState({
  //       password: event.target.value,
  //     });
  //   };

  //   ChangeEmailHandler = (event) => {
  //     const email = event.target.value;
  //     const isValid = this.validateEmail(email);
  //     if (!isValid) {
  //       this.setState({
  //         isValid: false,
  //         error: "Invalid Emailid",
  //         emailid: event.target.value,
  //       });
  //     } else {
  //       this.setState({
  //         isValid: true,
  //         error: "",
  //         emailid: event.target.value,
  //       });
  //     }
  //   };

  // sendOTPHandler = () => {
  //   console.log("sending otp",this.state)
  //   axios
  //   .get(URL+'/sendotp', {
  //     params: {
  //       emailid: this.state.emailid
  //     }
  //   })
  //   .then(() => console.log("OTP has been sent"))
  //   .catch(err => {
  //     console.error(err);
  //   });
  // }

//   verifyOTPHandler = (values) => {
//     console.log("Verifying OTP", this.state);
//     let x = this.verifyResponse();

//     window.alert(JSON.stringify(values, 0, 2));
//     // axios
//     // .get(URL+'/verify', {
//     //   params: {
//     //     emailid: this.state.emailid,
//     //     otp: this.state.otp
//     //   }
//     // })
//     // .then((response) => this.verifyResponse(response))
//     // .catch(err => console.error(err));
//   };

  loginHandler = (values) => {
    console.log("Verifying OTP", this.state);
    axios.post("/authLogin", {
      params: {
        loginid: this.state.loginid,
        password: this.state.password,
      },
    })
    .then((response) => this.verifyResponse(response))
    .catch(err => console.error(err));
    this.verifyResponse();
  };

  render() {
    // <Route exact path="/viewcomplain" component={ComplaintViForm}></Route>
    let isDisabled = !(this.state.isValidID && this.state.isValidPass);
    console.log();
    if (this.state.redirectToView) {
      return (
        <BrowserRouter>
          <Route exact path="/viewcomplain" component={Viewbyadmin}></Route>
          {/* <Route exact path="/register" component={ComplaintForm}></Route> */}
          <Redirect
            to={{
              pathname: "/viewcomplain",
              state: { loginid: this.state.loginid },
            }}
          />
        </BrowserRouter>
      );
    } else {
      return (
        <div style={{ padding: 16, margin: "auto", maxWidth: 600 }}>
          {/* <CssBaseline /> */}
          <Typography variant="h4" align="center" component="h1" gutterBottom>
            Authorised Staff Login
          </Typography>

          <Form
            onSubmit={this.loginHandler}
            validate={this.validate}
            initialValues={{}}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
              <form
                onSubmit={(event) => {
                  handleSubmit(event);
                  // .then(() => {
                  //   form.reset(); // or could be passed directly to then()
                  // })
                }}
              >
                <Paper style={{ padding: 16 }}>
                  <Grid container alignItems="center" spacing={2}>
                    {/* <Grid item xs={1} /> */}
                    <Grid item xs={10}>
                      <Field
                        name="loginid"
                        // defaultValue={"jagtapraj123@gmail.com"}
                        fullWidth
                        required
                        component={TextField}
                        type="text"
                        label="Login ID"
                      />
                    </Grid>

                    {/* <Grid item xs={1} /> */}

                    <Grid item xs={10}>
                      <Field
                        fullWidth
                        required
                        name="password"
                        component={TextField}
                        type="password"
                        label="Password"
                      />
                    </Grid>

                    <Grid xs={2} />

                    {/* <Grid item style={{ marginTop: 16 }}>
                        <Button
                          type="button"
                          variant="contained"
                          onClick={() => {
                            this.sendOTPHandler();
                          }}
                          disabled={submitting || pristine }
                        >
                          Send OTP
                        </Button>
                      </Grid> */}

                    <Grid item style={{ marginTop: 16 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={submitting || isDisabled}
                      >
                        Login
                      </Button>
                    </Grid>
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

export default AuthLogin;
