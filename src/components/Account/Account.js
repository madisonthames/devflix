import React, {Component} from 'react';
import axios from 'axios';
import Header from '../Header/Header';

class Account extends Component {
    constructor() {
        super()
        this.state = {
          username: '',
          newUsername: ''
        }
        this.updateUsername = this.updateUsername.bind(this);
    }

    handleUsernameInput(value) {
        this.setState({ username: value });
    }
    
    handleNewUsernameInput(value) {
        console.log(value)
        this.setState({ newUsername: value });
    }

    updateUsername(){
        axios
        .put(`/auth/account/${this.state.username}`, {updateUsername: this.state.newUsername})
        .then((response) => {
            // console.log(response)
            alert(`Your username has been updated to ${response.data[0].username}`)
        })
    }
    

    render() {
        const { username, newUsername } = this.state;
        console.log(newUsername)
        return (
            <div className='full-account'>
                < Header />
                        <div className='account'>
                            <h2>Change Account Email</h2>
                                <div className='input'>
                                    <input className='emailInput' 
                                    placeholder='Enter Current Email'
                                    value={username}
                                    onChange={e => this.handleUsernameInput(e.target.value)} />
                                    <input className='passwordInput' 
                                    placeholder='Enter New Email'
                                    value={newUsername}
                                    onChange={e => this.handleNewUsernameInput(e.target.value)} />
                                </div>

                                <div>
                                    <button onClick={this.updateUsername}> CONFIRM NEW EMAIL </button>  
                                </div>
                            </div>
            </div>
        )
    }
}

export default Account;