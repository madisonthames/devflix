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
            accountMenuStatus: 'account-drop-down-menu',
            notificationMenuStatus: 'notification-drop-down-menu',
            loggedOut: false,
            value: '',
            redirect: false
          }

          this.handleChange = this.handleChange.bind(this);
          this.onSubmit = this.onSubmit.bind(this);
    }

          handleChange(e) {
            this.setState({ value: e.target.value });
            
          }

          onSubmit(e) {
            this.setState({ redirect: true })
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
            (this.state.notificationMenuStatus === 'active') {
              this.setState({notificationMenuStatus: 'unactive'})
            } else {
              this.setState({notificationMenuStatus: 'active'})
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

        const {loggedOut, redirect} = this.state;

        if (loggedOut) {
            return  <Redirect to='/'/>
          } else if (redirect) {
            return <Redirect to={`/browse/results/${this.state.value}`} />
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
                    
                    {/* <i class="fas fa-search"></i> */}

                    <input placeholder='Search'
                    type='text'
                    value={this.state.value}
                    onChange={this.handleChange}
                    ></input> <button className='go' onClick={this.onSubmit} type='submit'> <i class="fas fa-search"></i> </button>
                    <i id='notification' class="fas fa-bell" onClick={this.notificationHandleClick}></i>
                        <div className={this.state.notificationMenuStatus + ' notification-drop-down-menu'}>
                            <div className='notification-drop-down-list'> No new notifications.</div>
                        </div>

                    <div>
                        <img src='https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png'></img>
                        <i id='downArrow' class="fas fa-sort-down" onClick={this.handleClick}></i>
                            <div className={this.state.accountMenuStatus + ' account-drop-down-menu'}>
                                <div className='account-drop-down-list'>
                                      <div className='column'>
                                          <Link to='/account' style={{textDecoration:'none'}}> <button>Account Info</button> </Link>
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