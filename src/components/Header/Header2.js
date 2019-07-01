import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Header2 extends Component {
    constructor() {
        super();
        this.state = {
            color: 'none',
            accountMenuStatus: 'account-drop-down-menu',
            genreMenuStatus: 'genreDropDownMenu'
          }
    }
          listenScrollEvent = event => {
            if (window.scrollY > 30) {
              this.setState({color: '#141414'})
            } else {
              this.setState({color: 'none'})
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
                        <i class="fas fa-search"/>

                        <i id='notification' class="fas fa-bell"></i>

                        <div>
                        <img src='https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png'></img>
                        <i id='downArrow' class="fas fa-sort-down" onClick={this.accountHandleClick}></i>
                        <div id='drop-down-menu' className={this.state.accountMenuStatus + ' account-drop-down-menu'}>
                              <div className='account-drop-down-list'>
                                    <div className='column'>
                                        <button>Account Info</button> 
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

export default Header2;