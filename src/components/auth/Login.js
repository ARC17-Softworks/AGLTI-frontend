import React, { Component } from 'react';
import './style.css';
import { gql } from 'apollo-boost';  //for get
import { graphql } from 'react-apollo';  // for binding

const login = gql`
    {
        Project{
            owner
            title
            description
        }
    }
`


class Login extends Component {

    render() {
        return (
            <div className='form-container'>
      <h1>Account <span className='text-primary'>Login</span> </h1>
      <form>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            id='email'
            type='email'
            name='email'
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            required
          />
        </div>
        <input
          type='submit'
          value='Login'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
        )
    }
}

export default Login;