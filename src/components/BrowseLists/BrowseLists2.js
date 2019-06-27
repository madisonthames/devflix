import React, {Component} from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {getUser} from '../../ducks/reducer';


class BrowseLists2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comedy2: [],
            action: [],
            documentary: [],
            romance: [],
            mystery: [],
            family: [],
            music: [],
            thriller: [],
            popular2: [],
            tv: [],
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
        .get("/api/comedy2")
        .then(response => {
            this.setState({ comedy2: response.data.comedy2.results, loggedIn: true, user: response.data.user });
        })
        .catch(error => {
            if(error.response.status === 401) {
                this.setState({ loggedIn: false })
            }
            this.setState({ error: "Oops, please try again."})
        });

        axios
        .get("/api/action")
        .then(response => {
            this.setState({ action: response.data.results });
        })
        .catch(error => {
            this.setState({ error: "Oops, please try again."})
        });

        axios
        .get("/api/documentary")
        .then(response => {
            this.setState({ documentary: response.data.results });
        })
        .catch(error => {
            this.setState({ error: "Oops, please try again."})
        });

        axios
        .get("/api/romance")
        .then(response => {
            this.setState({ romance: response.data.results });
        })
        .catch(error => {
            this.setState({ error: "Oops, please try again."})
        });

        axios
        .get("/api/popular2")
        .then(response => {
            this.setState({ popular2: response.data.results });
        })
        .catch(error => {
            this.setState({ error: "Oops, please try again."})
        });

        axios
        .get("/api/mystery")
        .then(response => {
            this.setState({ mystery: response.data.results });
        })
        .catch(error => {
            this.setState({ error: "Oops, please try again."})
        });

        axios
        .get("/api/family")
        .then(response => {
            this.setState({ family: response.data.results });
        })
        .catch(error => {
            this.setState({ error: "Oops, please try again."})
        });

        axios
        .get("/api/tv")
        .then(response => {
            this.setState({ tv: response.data.results });
        })
        .catch(error => {
            this.setState({ error: "Oops, please try again."})
        });

        axios
        .get("/api/music")
        .then(response => {
            this.setState({ music: response.data.results });
        })
        .catch(error => {
            this.setState({ error: "Oops, please try again."})
        });

        axios
        .get("/api/thriller")
        .then(response => {
            this.setState({ thriller: response.data.results });
        })
        .catch(error => {
            this.setState({ error: "Oops, please try again."})
        });

    }



    render() {
        const {comedy2, action, documentary, romance, mystery, family, music, thriller, popular2, tv, loggedIn, user} = this.state;

        if(!loggedIn) {
            return <Redirect to='/auth/login'/>
        }
        return (
            <div className='fullBrowse'>

                <section>
                    <h1>Action</h1>

                    <div className='listRow'>
                            {action.map((actionMovie, index) => (
                                    <div className='movie'>
                                        <Link to={`/browse/play/${actionMovie.id}`} style={{textDecoration:'none'}}>

                                            <div className='movie--image'>
                                                <img src={(`https://image.tmdb.org/t/p/w500/${actionMovie.backdrop_path}`)} ></img>
                                                <p>{actionMovie.title}</p>  

                                            </div>
                                        </Link>
                                            <i class="fas fa-plus-circle" onClick={() => this.addToList(actionMovie)}></i>    

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
                            {comedy2.map((comedy2Movie, index) => (
                                    <div className='movie'>
                                        <Link to={`/browse/play/${comedy2Movie.id}`} style={{textDecoration:'none'}}>

                                            <div className='movie--image'>
                                                <img src={(`https://image.tmdb.org/t/p/w500/${comedy2Movie.backdrop_path}`)} ></img>
                                                <p>{comedy2Movie.title}</p>  

                                            </div>
                                        </Link>
                                            <i class="fas fa-plus-circle" onClick={() => this.addToList(comedy2Movie)}></i>    

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
                    <h1>Romance</h1>

                    <div className='listRow'>
                            {romance.map((romanceMovie, index) => (
                                    <div className='movie'>
                                        <Link to={`/browse/play/${romanceMovie.id}`} style={{textDecoration:'none'}}>

                                            <div className='movie--image'>
                                                <img src={(`https://image.tmdb.org/t/p/w500/${romanceMovie.backdrop_path}`)} ></img>
                                                <p>{romanceMovie.title}</p>  

                                            </div>
                                        </Link>
                                            <i class="fas fa-plus-circle" onClick={() => this.addToList(romanceMovie)}></i>    

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
                    <h1>Most Popular</h1>

                    <div className='listRow'>
                            {popular2.map((popular2Movie, index) => (
                                    <div className='movie'>
                                        <Link to={`/browse/play/${popular2Movie.id}`} style={{textDecoration:'none'}}>

                                            <div className='movie--image'>
                                                <img src={(`https://image.tmdb.org/t/p/w500/${popular2Movie.backdrop_path}`)} ></img>
                                                <p>{popular2Movie.title}</p>  

                                            </div>
                                        </Link>
                                            <i class="fas fa-plus-circle" onClick={() => this.addToList(popular2Movie)}></i>    

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
                    <h1>Movies Based on Music</h1>

                    <div className='listRow'>
                            {music.map((musicMovie, index) => (
                                    <div className='movie'>
                                        <Link to={`/browse/play/${musicMovie.id}`} style={{textDecoration:'none'}}>

                                            <div className='movie--image'>
                                                <img src={(`https://image.tmdb.org/t/p/w500/${musicMovie.backdrop_path}`)} ></img>
                                                <p>{musicMovie.title}</p>  

                                            </div>
                                        </Link>
                                            <i class="fas fa-plus-circle" onClick={() => this.addToList(musicMovie)}></i>    

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

                <section>
                    <h1>Thrillers</h1>

                    <div className='listRow'>
                            {thriller.map((thrillerMovie, index) => (
                                    <div className='movie'>
                                        <Link to={`/browse/play/${thrillerMovie.id}`} style={{textDecoration:'none'}}>

                                            <div className='movie--image'>
                                                <img src={(`https://image.tmdb.org/t/p/w500/${thrillerMovie.backdrop_path}`)} ></img>
                                                <p>{thrillerMovie.title}</p>  

                                            </div>
                                        </Link>
                                            <i class="fas fa-plus-circle" onClick={() => this.addToList(thrillerMovie)}></i>    

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
                    <h1>Documentary</h1>

                    <div className='listRow'>
                            {documentary.map((documentaryMovie, index) => (
                                    <div className='movie'>
                                        <Link to={`/browse/play/${documentaryMovie.id}`} style={{textDecoration:'none'}}>

                                            <div className='movie--image'>
                                                <img src={(`https://image.tmdb.org/t/p/w500/${documentaryMovie.backdrop_path}`)} ></img>
                                                <p>{documentaryMovie.title}</p>  

                                            </div>
                                        </Link>
                                            <i class="fas fa-plus-circle" onClick={() => this.addToList(documentaryMovie)}></i>    

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
                    <h1>Mysteries</h1>

                    <div className='listRow'>
                            {mystery.map((mysteryMovie, index) => (
                                    <div className='movie'>
                                        <Link to={`/browse/play/${mysteryMovie.id}`} style={{textDecoration:'none'}}>

                                            <div className='movie--image'>
                                                <img src={(`https://image.tmdb.org/t/p/w500/${mysteryMovie.backdrop_path}`)} ></img>
                                                <p>{mysteryMovie.title}</p>  

                                            </div>
                                        </Link>
                                            <i class="fas fa-plus-circle" onClick={() => this.addToList(mysteryMovie)}></i>    

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
                    <h1>Made for TV</h1>

                    <div className='listRow'>
                            {tv.map((tvMovie, index) => (
                                    <div className='movie'>
                                        <Link to={`/browse/play/${tvMovie.id}`} style={{textDecoration:'none'}}>

                                            <div className='movie--image'>
                                                <img src={(`https://image.tmdb.org/t/p/w500/${tvMovie.backdrop_path}`)} ></img>
                                                <p>{tvMovie.title}</p>  

                                            </div>
                                        </Link>
                                            <i class="fas fa-plus-circle" onClick={() => this.addToList(tvMovie)}></i>    

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
  
  
  
  export default connect(mapStateToProps, {getUser})(BrowseLists2);