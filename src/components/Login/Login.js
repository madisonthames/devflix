import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import { Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Home from '../Home/Home';
import {login} from '../../ducks/reducer';

class Login extends Component {
    constructor() {
        super()
        this.state = {
          loggedIn: false,  
          username: '',
          password: ''
        }
        this.login = this.login.bind(this);
    }


  handleUsernameInput(value) {
    this.setState({ username: value });
  }

  handlePasswordInput(value) {
    this.setState({ password: value });
  }

  login(username, password) {
    this.props.login(username, password).then(response => {
      this.setState({username: response.value.data.username, loggedIn: true})
    })
  }

    render() {
        const { username, password, loggedIn } = this.state;
        if(loggedIn){
          return <Redirect to="/browse" />
      }
        return (
    
            <div className='login'>
              <div className='login-wrapper'>
                <div className='info'>
                    <div className='input'>
                        <h1> Sign In </h1>
                        <input className='emailInput' 
                         placeholder='Email'
                         value={username}
                         onChange={e => this.handleUsernameInput(e.target.value)} />
                        <input className='passwordInput' 
                         placeholder='Password'
                         value={password}
                         onChange={e => this.handlePasswordInput(e.target.value)} />
                    </div>


                    <div>
                        
                        <button onClick={() => this.login(username, password)}> SIGN IN </button>  
                        
                        <div className='signUp'>
                          <h2> New to Devflix?</h2>  
                          <Link to='/auth/register'><h3>Sign up now.</h3></Link>
                        </div>
                    </div>
                </div>
              </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}



export default connect(mapStateToProps, {login})(Login);

