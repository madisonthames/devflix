import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    
    register() {

        const {username, password} = this.state;
        axios
        .post('/auth/register', {username, password})
        .then(response => {
            console.log(response)
        })
    }

    render() {
        console.log(this.state)
        return (
            <div className='registerMain'>
                <div className='registerHeader'>
                    <Link to='/'>
                        <img src="https://fontmeme.com/permalink/190624/077d286cb67bd13d5d3497bf52bde221.png" alt="netflix-font" border="0"/>
                    </Link>

                    <Link to='/browse'> 
                        <button> Sign In </button> 
                    </Link>
                </div>

                <div className='registerField'>
                    <div className='freeTrial'>
                        Enjoy your first month.<p className='free'>It's free.</p>
                    </div>

                    <div className='registerFieldText'>
                        <h2>Create your account.</h2>
                    </div>

                    <input name='username' className='emailInput' placeholder='Email' onChange={(e) => this.handleChange(e)} />

                    <input name='password' className='passwordInput' placeholder='Password' onChange={(e) => this.handleChange(e)}/>

                    <Link to='/browse'> 
                        <button className='continueButton' onClick={() => this.register()}> CONTINUE </button>  
                    </Link>
                </div>
            </div>
        )
    }
}

export default Register;