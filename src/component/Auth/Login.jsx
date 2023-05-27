import React, { Component } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
  from 'mdb-react-ui-kit';
import '../../Login.css';
import authService from '../../services/services/auth.service';
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import { withRouter } from '../../common/common/with-router';
import Logo from '../../images/logo.jpg'


const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      authService.login(this.state.username, this.state.password).then(
        () => {
          this.props.router.navigate("/mapall");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {

    return (
      <MDBContainer className="my-5">
        <MDBCard>
          <MDBRow className='g-0'>
            <MDBCol md='6'>
              <MDBCardImage src='https://images.pexels.com/photos/3656787/pexels-photo-3656787.jpeg?auto=compress&cs=tinysrgb&w=1600' alt="login form" className='rounded-start w-100' />
            </MDBCol>
            <MDBCol md='6 '>
              <MDBCardBody className='d-flex flex-column text-center' style={{ height: '250px' }}>
                <Form
                  onSubmit={this.handleLogin}
                  ref={(c) => {
                    this.form = c;
                  }}
                >
                    <img src={Logo} style={{height:'400px'}}/>
                  <div className='d-flex flex-row' style={{ marginTop: '20px' }}>
                    <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }} />
                  </div>
                  <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>Sign into your account</h5>
                  <MDBInput
                    wrapperClass='mb-4'
                    label='Email address'
                    id='formControlLg'
                    type='text'
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required]}
                    size="lg"
                  />
                  <MDBInput
                    wrapperClass='mb-4'
                    label='Password'
                    id='formControlLg'
                    type='password'
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required]}
                    size="lg"
                  />
                  <button
                    className="btn btn-secondary mb-4 px-5"
                    color='dark'
                    size='lg'
                    disabled={this.state.loading}
                    type='submit'
                  >
                    {this.state.loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    Login
                  </button>
                  {this.state.message && (
                    <div className="form-group">
                      <div className="alert alert-danger" role="alert">
                        {this.state.message}
                      </div>
                    </div>
                  )}
                  <CheckButton
                    style={{ display: "none" }}
                    ref={(c) => {
                      this.checkBtn = c;
                    }}
                  />
                  <br />
                  <a className="small text-muted" href="#!">Forgot password?</a>
                  <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                    Don't have an account? <a href="/signup" style={{ color: '#393f81' }}>Register here</a>
                  </p>
                </Form>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    );
  }
}

export default withRouter(Login);