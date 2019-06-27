import React, {Component} from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import {logout} from '../../ducks/reducer';

class Header extends Component {
    constructor() {
        super();
        this.state = {
            color: 'none',
            accountMenuStatus: 'accountDropDownMenu',
            notifications: 'notificationDropDown',
            loggedOut: false
          }
    }
          listenScrollEvent = e => {
            if (window.scrollY > 30) {
              this.setState({color: '#141414'})
            } else {
              this.setState({color: 'none'})
            }
          }

          handleClick = () => {
            if
            (this.state.accountMenuStatus === 'active') {
              this.setState({accountMenuStatus: 'unactive'})
            } else {
              this.setState({accountMenuStatus: 'active'})
            }
          }

          notificationHandleClick = () => {
            if
            (this.state.notifications === 'active') {
              this.setState({notifications: 'unactive'})
            } else {
              this.setState({notifications: 'active'})
            }
          }

          logout() {
            this.props.logout().then(response => {
              this.setState({loggedOut: true})
            })
          }
        
          componentDidMount() {
            window.addEventListener('scroll', this.listenScrollEvent)
          }
    
    render() {

        const {loggedOut} = this.state;

        if (loggedOut) {
            return  <Redirect to='/'/>
          }

        return (
            <header className='header' style={{background: this.state.color}}>
                <div className='headerLeftSection'>
                    <div>
                        <img src="https://fontmeme.com/permalink/190624/077d286cb67bd13d5d3497bf52bde221.png" alt="netflix-font" border="0"/>
                    </div>

                    <div className='pageLinks'>
                        <Link to='/browse' style={{textDecoration:'none'}}> <button>Home</button> </Link>
                        <Link to='/browse/genre/all' style={{textDecoration:'none'}}> <button>Movies</button> </Link>
                        <Link to='/browse/my-list' style={{textDecoration:'none'}}> <button>My List</button> </Link>
                    </div>
                </div>

                <div className='headerRightSection'>
                    
                    <i class="fas fa-search"></i>
                    <i id='notification' class="fas fa-bell"></i>
                            {/* <div className='notification-drop-down-list'>
                                <p>No notifications.</p>
                            </div> */}
                    <div>
                        <img src='https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png'></img>
                        <i id='downArrow' class="fas fa-sort-down" onClick={this.handleClick}></i>
                        <div id='drop-down-menu' className={this.state.accountMenuStatus + ' accountDropDownMenu'}>
                              <div className='account-drop-down-list'>
                                    <div className='column'>
                                        <button>Account Info</button> 
                                        <button onClick={() => this.logout()}>Log Out</button>
                                    </div>
                            </div>
                        </div>
                    </div>

                </div>
            </header>
        )
    }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}



export default connect(mapStateToProps, {logout})(Header);