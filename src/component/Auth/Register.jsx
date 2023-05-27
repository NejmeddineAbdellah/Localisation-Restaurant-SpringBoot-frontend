import React, { Componen, Component, useState } from 'react';
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
import authService from '../../services/services/auth.service.js';
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import { withRouter } from '../../common/common/with-router';
import Logo from '../../images/logo.jpg'
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

import { isEmail } from "validator";



const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};


class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      successful: false,
      message: ""
    };
  }



  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      authService.register(
        this.state.username,
        this.state.email,
        this.state.password
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {

    return (
      <MDBContainer className="my-5">

        <MDBCard>
          <MDBRow className='g-0'>
            <MDBCol md='6'>
              <MDBCardImage src='https://images.pexels.com/photos/3887985/pexels-photo-3887985.jpeg?auto=compress&cs=tinysrgb&w=1600' alt="login form" className='rounded-start w-100' />
            </MDBCol>
            <MDBCol md='6'>
              <MDBCardBody className='d-flex flex-column text-center'>
                <Form
                  onSubmit={this.handleRegister}
                  ref={(c) => {
                    this.form = c;
                  }}
                >
                  <img src={Logo} style={{ height: '400px' }} />
                  <div className='d-flex flex-row mt-2'>
                    <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }} />
                  </div>
                  <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>Create new account</h5>


                  <MDBInput wrapperClass='mb-4' label='Username' id='formControlLg' type='text' value={this.state.username} onChange={this.onChangeUsername}
                    validations={[required, vusername]} size="lg" />
                  <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' value={this.state.email} onChange={this.onChangeEmail}
                    validations={[required, email]} size="lg" />
                  <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' value={this.state.password} onChange={this.onChangePassword}
                    validations={[required, vpassword]} size="lg" />

                  <button className="btn btn-success mb-4 px-5" color='dark' size='lg' disabled={this.state.loading} type='submit'>{this.state.loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}SignUP</button>{this.state.message && (
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
                  <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>Already have account? <a href="/" style={{ color: '#393f81' }}>Login</a></p>

                </Form>
              </MDBCardBody>
            </MDBCol>

          </MDBRow>
        </MDBCard>

      </MDBContainer>
    );
  }
}

export default withRouter(Register);