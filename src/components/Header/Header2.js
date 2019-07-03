import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../../ducks/reducer';

class Header2 extends Component {
    constructor() {
        super();
        this.state = {
            color: 'none',
            accountMenuStatus: 'account-drop-down-menu',
            genreMenuStatus: 'genreDropDownMenu',
            notificationMenuStatus: 'notification-drop-down-menu',
            value: '',
            redirect: false,
            loggedOut: false,
            search: 'search-input', 
            icon: 'search-icon'
          }

          this.handleChange = this.handleChange.bind(this);
          this.onSubmit = this.onSubmit.bind(this);
          this.searchToggle = this.searchToggle.bind(this);
    }

          listenScrollEvent = event => {
            if (window.scrollY > 30) {
              this.setState({color: '#141414'})
            } else {
              this.setState({color: 'none'})
            }
          }

          searchToggle() {
            if
            (this.state.search === 'active') {
              this.setState({search: 'unactive', icon: 'active'})
            } else {
              this.setState({search: 'active', icon: 'unactive'})
            }
          }

          handleChange(e) {
            this.setState({ value: e.target.value });
          }


          onSubmit(e) {
            this.setState({ redirect: true })
          }

          handleClick = () => {
            if
            (this.state.accountMenuStatus === 'active') {
              this.setState({accountMenuStatus: 'unactive'})
            } else {
              this.setState({accountMenuStatus: 'active'})
            }
          }

          accountHandleClick = () => {
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

          genreHandleClick = () => {
            if
            (this.state.genreMenuStatus === 'active') {
              this.setState({genreMenuStatus: 'unactive'})
            } else {
              this.setState({genreMenuStatus: 'active'})
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
            <header className='header2' style={{background: this.state.color}}>
              <div className='header2top'>
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
                    
                    <i class="fas fa-search" className={this.state.icon + ' search-icon fas fa-search'} onClick={this.searchToggle}></i>

                    <div className={this.state.search + ' search-input'}>
                      <input
                      value={this.state.value}
                      onChange={this.handleChange}
                      ></input> <button className='go' onClick={this.onSubmit} type='submit'> <i class="fas fa-search"></i> </button>
                    </div>          

                    <i id='notification' class="fas fa-bell" onClick={this.notificationHandleClick}></i>
                        <div className={this.state.notificationMenuStatus + ' notification-drop-down-menu'}>
                            <div className='notification-drop-down-list'> No new notifications.</div>
                        </div>

                    <div className='account-box'>
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
                </div>

                <div className='header2bottom'>
                    <div className='bottomContent'>
                        <h1>Movies</h1>

                        <button onClick={this.genreHandleClick}>Genres <i class="fas fa-sort-down"></i></button>

                        <div id='drop-down-menu' className={this.state.genreMenuStatus + ' genreDropDownMenu'}>
                              <div className='drop-down-list'>
                                    <div className='column'>
                                      <Link to='/browse/genre/28' style={{color: 'inherit', textDecoration:'none'}}> <p>Action</p> </Link>
                                      <Link to='/browse/genre/12' style={{color: 'inherit', textDecoration:'none'}}> <p>Adventure</p> </Link>
                                      <Link to='/browse/genre/16' style={{color: 'inherit', textDecoration:'none'}}> <p>Animation</p> </Link>
                                      <Link to='/browse/genre/35' style={{color: 'inherit', textDecoration:'none'}}> <p>Comedy</p> </Link>
                                      <Link to='/browse/genre/80' style={{color: 'inherit', textDecoration:'none'}}> <p>Crime</p> </Link>
                                      <Link to='/browse/genre/99' style={{color: 'inherit', textDecoration:'none'}}> <p>Documentary</p> </Link>
                                    </div>

                                    <div className='column'>
                                      <Link to='/browse/genre/18' style={{color: 'inherit', textDecoration:'none'}}> <p>Drama</p> </Link>
                                      <Link to='/browse/genre/10751' style={{color: 'inherit', textDecoration:'none'}}> <p>Family</p> </Link>
                                      <Link to='/browse/genre/14' style={{color: 'inherit', textDecoration:'none'}}> <p>Fantasy</p> </Link>
                                      <Link to='/browse/genre/36' style={{color: 'inherit', textDecoration:'none'}}> <p>History</p> </Link>
                                      <Link to='/browse/genre/27' style={{color: 'inherit', textDecoration:'none'}}> <p>Horror</p> </Link>
                                      <Link to='/browse/genre/10402' style={{color: 'inherit', textDecoration:'none'}}> <p>Music</p> </Link>
                                    </div>

                                    <div className='column3'>
                                      <Link to='/browse/genre/9648' style={{color: 'inherit', textDecoration:'none'}}> <p>Mystery</p> </Link>
                                      <Link to='/browse/genre/10749' style={{color: 'inherit', textDecoration:'none'}}> <p>Romance</p> </Link>
                                      <Link to='/browse/genre/878' style={{color: 'inherit', textDecoration:'none'}}> <p>SciFi</p> </Link>
                                      <Link to='/browse/genre/10770' style={{color: 'inherit', textDecoration:'none'}}> <p>TV Movie</p> </Link>
                                      <Link to='/browse/genre/53' style={{color: 'inherit', textDecoration:'none'}}> <p>Thriller</p> </Link>
                                      <Link to='/browse/genre/10752' style={{color: 'inherit', textDecoration:'none'}}> <p>War</p> </Link>
                                    </div>
                                  <div>

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



export default connect(mapStateToProps, {logout})(Header2);