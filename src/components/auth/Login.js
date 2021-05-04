import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import {flowRight as compose} from 'lodash';
import {LOGIN_USER} from '../../queries/queries';
import { graphql } from 'react-apollo';  // for binding
import './style.css';

async function loginUser(credentials) {
  return fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

// class Login extends Component {
//   constructor(props){
//     super(props);
//     this.state = {
//         email:'',
//         password:''
//     }
//   }

//   submitForm(e){
//     e.preventDefault();
//     // this.props.LOGIN_USER({
//     //     variables: {
//     //         email:this.state.email,
//     //         password:this.state.password
//     //     }
//     // })
//     console.log(e.target.value);
//   }

//   render(){
export default function Login({ setToken }) {
    const [useremail, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      useremail,
      password
    });
    setToken(token);
  }
  return(
     <div className="login-wrapper">
       
       <div className='form-container'>
       <h1>Account <span className='text-primary'>Login</span> </h1>
       <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            id='email'
            type='email'
            name='email'
            required
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            required
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <input
          type='submit'
          value='Login'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}

// export default compose(
//   graphql(LOGIN_USER,{name: "LOGIN_USER"})
// )(Login);