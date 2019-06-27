import React, {Component} from 'react';
import axios from 'axios';
import Featured from '../Featured/Featured';
import { Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {getUser} from '../../ducks/reducer';



class BrowseLists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popular: [],
            nineties: [],
            comedy: [],
            drama: [],
            family: [],
            video: [],
            loggedIn: true,
            user: []
        }
    }

    addToList(movie) {
        axios
        .post("/api/mylist", movie)
        .then(response => {
            alert('Saved to your list!');
        })
    }

    componentDidMount() {
        this.props.getUser()

        axios
        .get("/api/popular")
        .then(response => {
            this.setState({ popular: response.data.popular.results, loggedIn: true, user: response.data.user });
        }).then(() => {
            axios
            .get("/api/nineties")
            .then(response => {
                this.setState({ nineties: response.data.results });
            })
            .catch(error => {
                this.setState({ error: "Oops, nineties please try again."})
            });
    
            axios
            .get("/api/drama")
            .then(response => {
                this.setState({ drama: response.data.results });
            }).catch(error => {
                this.setState({ error: "Oops, drama please try again."})
            });
    
            axios
            .get("/api/family")
            .then(response => {
                this.setState({ family: response.data.results });
            })
            .catch(error => {
                this.setState({ error: "Oops, family please try again."})
            });
    
            axios
            .get("/api/comedy")
            .then(response => {
                this.setState({ comedy: response.data.results });
            })
            .catch(error => {
                this.setState({ error: "Oops, comedy please try again."})
            });
        })
        .catch(error => {
            if(error.response.status === 401) {
                this.setState({ loggedIn: false, error: "You are not logged in."})
            }
            this.setState({ error: "Oops, popular please try again."})
        });
    }

    render() {
        const {popular, nineties, comedy, drama, family, video, loggedIn, user} = this.state;

            if(!loggedIn) {
                return <Redirect to='/auth/login'/>
            }
        return (
            <div className='fullBrowse'>

                <section>
                    <h1>Most Popular</h1>

                    <div className='listRow'>
                            {popular.map((popularMovie, index) => (
                                    <div className='movie'>
                                        <Link to={`/browse/play/${popularMovie.id}`} style={{textDecoration:'none'}}>

                                            <div className='movie--image'>
                                                <img src={(`https://image.tmdb.org/t/p/w500/${popularMovie.backdrop_path}`)} ></img>
                                                <p>{popularMovie.title}</p>  

                                            </div>
                                        </Link>
                                            <i class="fas fa-plus-circle" onClick={() => this.addToList(popularMovie)}></i>    

                                        {/* <div className='movie--text'>
                                            <img src={(`https://image.tmdb.org/t/p/w500/${popularMovie.backdrop_path}`)} ></img>
                                            <p>{popularMovie.title}</p>   
                                            <div className='icon-group'> 
                                                <i class="fas fa-play-circle"></i>
                                                <i class="fas fa-plus-circle"></i>
                                                <i id='down' class="fas fa-angle-down"></i>
                                            </div>
                                        </div> */}
                                    </div>

                            ))}
                    </div>
                </section>

                <section>
                    <h1>Best of the 90s</h1>

                    <div className='listRow'>
                            {nineties.map((ninetiesMovie, index) => (
                                    <div className='movie'>
                                        <Link to={`/browse/play/${ninetiesMovie.id}`} style={{textDecoration:'none'}}>

                                            <div className='movie--image'>
                                                <img src={(`https://image.tmdb.org/t/p/w500/${ninetiesMovie.backdrop_path}`)} ></img>
                                                <p>{ninetiesMovie.title}</p>  

                                            </div>
                                        </Link>
                                            <i class="fas fa-plus-circle" onClick={() => this.addToList(ninetiesMovie)}></i>    

                                        {/* <div className='movie--text'>
                                            <img src={(`https://image.tmdb.org/t/p/w500/${popularMovie.backdrop_path}`)} ></img>
                                            <p>{popularMovie.title}</p>   
                                            <div className='icon-group'> 
                                                <i class="fas fa-play-circle"></i>
                                                <i class="fas fa-plus-circle"></i>
                                                <i id='down' class="fas fa-angle-down"></i>
                                            </div>
                                        </div> */}
                                    </div>

                            ))}
                    </div>
                </section>

                <section>
                    <h1>Comedies</h1>

                    <div className='listRow'>
                            {comedy.map((comedyMovie, index) => (
                                    <div className='movie'>
                                        <Link to={`/browse/play/${comedyMovie.id}`} style={{textDecoration:'none'}}>

                                            <div className='movie--image'>
                                                <img src={(`https://image.tmdb.org/t/p/w500/${comedyMovie.backdrop_path}`)} ></img>
                                                <p>{comedyMovie.title}</p>  

                                            </div>
                                        </Link>
                                            <i class="fas fa-plus-circle" onClick={() => this.addToList(comedyMovie)}></i>    

                                        {/* <div className='movie--text'>
                                            <img src={(`https://image.tmdb.org/t/p/w500/${popularMovie.backdrop_path}`)} ></img>
                                            <p>{popularMovie.title}</p>   
                                            <div className='icon-group'> 
                                                <i class="fas fa-play-circle"></i>
                                                <i class="fas fa-plus-circle"></i>
                                                <i id='down' class="fas fa-angle-down"></i>
                                            </div>
                                        </div> */}
                                    </div>

                            ))}
                    </div>
                </section>

                <section>
                    <h1>Dramas</h1>

                    <div className='listRow'>
                            {drama.map((dramaMovie, index) => (
                                    <div className='movie'>
                                        <Link to={`/browse/play/${dramaMovie.id}`} style={{textDecoration:'none'}}>

                                            <div className='movie--image'>
                                                <img src={(`https://image.tmdb.org/t/p/w500/${dramaMovie.backdrop_path}`)} ></img>
                                                <p>{dramaMovie.title}</p>  

                                            </div>
                                        </Link>
                                            <i class="fas fa-plus-circle" onClick={() => this.addToList(dramaMovie)}></i>    

                                        {/* <div className='movie--text'>
                                            <img src={(`https://image.tmdb.org/t/p/w500/${popularMovie.backdrop_path}`)} ></img>
                                            <p>{popularMovie.title}</p>   
                                            <div className='icon-group'> 
                                                <i class="fas fa-play-circle"></i>
                                                <i class="fas fa-plus-circle"></i>
                                                <i id='down' class="fas fa-angle-down"></i>
                                            </div>
                                        </div> */}
                                    </div>

                            ))}
                    </div>
                </section>

                <section>
                    <h1>For the Family</h1>

                    <div className='listRow'>
                            {family.map((familyMovie, index) => (
                                    <div className='movie'>
                                        <Link to={`/browse/play/${familyMovie.id}`} style={{textDecoration:'none'}}>

                                            <div className='movie--image'>
                                                <img src={(`https://image.tmdb.org/t/p/w500/${familyMovie.backdrop_path}`)} ></img>
                                                <p>{familyMovie.title}</p>  

                                            </div>
                                        </Link>
                                            <i class="fas fa-plus-circle" onClick={() => this.addToList(familyMovie)}></i>    

                                        {/* <div className='movie--text'>
                                            <img src={(`https://image.tmdb.org/t/p/w500/${popularMovie.backdrop_path}`)} ></img>
                                            <p>{popularMovie.title}</p>   
                                            <div className='icon-group'> 
                                                <i class="fas fa-play-circle"></i>
                                                <i class="fas fa-plus-circle"></i>
                                                <i id='down' class="fas fa-angle-down"></i>
                                            </div>
                                        </div> */}
                                    </div>

                            ))}
                    </div>
                </section>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
      user: state.user
    }
  }
  
  
  
  export default connect(mapStateToProps, {getUser})(BrowseLists);