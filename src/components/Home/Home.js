import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <div>
                <div className='homeHeader'>
                    <img src="https://fontmeme.com/permalink/190624/077d286cb67bd13d5d3497bf52bde221.png" alt="netflix-font" border="0"/>
                    
                    <Link to='/auth/login'> 
                        <button> Sign In </button> 
                    </Link>
                </div>

                
                <div className='homeText'>
                    <h1>SEE WHAT'S NEXT</h1>
                    <h2>WATCH ANYWHERE. CANCEL ANYTIME.</h2>
                </div>

                <div className='register'>
                    <Link to='/auth/register'> 
                        <button className='registerButton'> START YOUR FREE TRIAL <i id='arrow' class="fas fa-chevron-right"></i> </button>  
                    </Link>
                </div>
            </div>


        )
    }
}

export default Home;