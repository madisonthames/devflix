import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Payment extends Component {
    render() {
        return (
            <div className='main'>
                    <div className='paymentHeader'>
                        <Link to='/'>
                            <img src="https://fontmeme.com/permalink/190624/077d286cb67bd13d5d3497bf52bde221.png" alt="netflix-font" border="0"/>
                        </Link>

                        <Link to='/browse'> 
                            <button className='paymentSignInButton'> Sign In </button> 
                        </Link>
                    </div>

                    <div className='paymentField'>
                        <div className='freeTrial'>
                            Enjoy your first month.<p>It's free.</p>
                        </div>

                        <div>
                            <h2>Set up your payment.</h2>
                        </div>

                        <input className='emailInput' placeholder='Name' />

                        <input className='passwordInput' placeholder='Credit Card Number' />

                        <Link to='/browse'> 
                            <button className='continueButton'> START YOUR MEMBERSHIP </button>  
                        </Link>
                    </div>
            </div>
        )
    }
}

export default Payment;