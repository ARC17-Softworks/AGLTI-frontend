import React, { Component } from 'react';
import {flowRight as compose} from 'lodash';
import {LOGIN_USER} from '../../queries/queries';
import { graphql } from 'react-apollo';  // for binding
import './style.css';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
        email:'',
        password:''
    }
  }

  submitForm(e){
    e.preventDefault();
    this.props.LOGIN_USER({
        variables: {
            email:this.state.email,
            password:this.state.password
        }
    })
    console.log(e.target.value);
  }

  render(){
  return(
     <div>
       <h1>Account <span className='text-primary'>Login</span> </h1>
       <div className='form-container'>
       <form onSubmit={this.submitForm.bind(this)}>
         {/* <div className='form-group'>
           <label htmlFor='name'>Name</label>
           <input
            id='name'
            type='text'
            name='name'
            required
          />
        </div> */}
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            id='email'
            type='email'
            name='email'
            required
            onChange={(e) => this.setState({email: e.target.value})}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            required
            onChange={(e) => this.setState({password: e.target.value})}
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
}


export default compose(
  graphql(LOGIN_USER,{name: "LOGIN_USER"})
)(Login);