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
            user: [],
            popular: [],
            nineties: [],
            comedy: [],
            drama: [],
            family: [],
            video: [],
            movie: [],
            cast1: [],
            cast2: [],
            cast3: [],
            loggedIn: true,
            isHidden: true,
            hiddenGenre: ''
        }
        this.toggleHidden = this.toggleHidden.bind(this);
        this.changeDate = this.changeDate.bind(this);
    }

    addToList(movie) {
        axios
        .post("/api/mylist", movie)
        .then(response => {
            alert('Saved to your list!');
        })
    }


    toggleHidden(id, genre) {
        axios
        .get(`/api/browse/movie/${id}`)
        .then(response => {
            this.setState({ movie: response.data, isHidden: !this.state.isHidden, hiddenGenre: genre });
        })
        .catch(error => {
            this.setState({ error: "Oops, comedy please try again."})
        });

        axios
        .get(`/api/browse/movie/cast/${id}`)
        .then(response => {
            console.log(response.data.cast[0])
            this.setState({ cast: response.data.cast[0].name, cast2: response.data.cast[1].name, cast3: response.data.cast[2].name })
        })
    }

    changeDate(str) {
        let newStr = str.split('')
        newStr.splice(4, 6)
        return newStr.join('')
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
                                            <div className='movie--image' onClick={() => this.toggleHidden(popularMovie.id, 'popular')}>
                                                <img src={(`https://image.tmdb.org/t/p/w500/${popularMovie.backdrop_path}`)} ></img>
                                                <p>{popularMovie.title}</p>  
                                            </div>
                                    </div>

                            ))}
                    </div>

                    <div>
                    {!this.state.isHidden && this.state.hiddenGenre === 'popular' &&
                                <div className='movie-details'>
                                    <div className='details-info'>
                                        <div className='top'>
                                            <h2>{this.state.movie.title}</h2>
                                            <div className='time'>
                                                <sub>{this.changeDate(this.state.movie.release_date)}</sub>
                                                <sub>1h 57m</sub>
                                            </div>
                                        </div>

                                        <div className='overview'>
                                            <strong> {this.state.movie.overview} </strong>
                                        </div>

                                        <div className='buttons'>
                                            <Link to={`/browse/play/${this.state.movie.id}`} style={{textDecoration:'none'}}> <button id='play'> <i class="fas fa-play"></i> <h4>Play</h4>  </button> </Link>
                                            <button id='list' onClick={() => this.addToList(this.state.movie)}> <i class="fas fa-plus"></i> <h4>My List</h4> </button>
                                        </div>

                                        <div className='cast'>
                                            <em> <b>Starring:</b> {this.state.cast}, {'  '} {this.state.cast2}, {'  '} {this.state.cast3} </em>
                                            <em> <b>Genres:</b> {this.state.movie.genres[0].name}, {this.state.movie.genres[1].name}</em>
                                        </div>

                                    </div>

                                    <div className='drop-image' style={{backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${this.state.movie.backdrop_path})`}}/>

                                </div>
                            }  
                    </div>
                </section>

                <section>
                    <h1>Best of the 90s</h1>

                    <div className='listRow'>
                            {nineties.map((ninetiesMovie, index) => (
                                    <div className='movie'>
                                            <div className='movie--image' onClick={() => this.toggleHidden(ninetiesMovie.id, 'nineties')}>
                                                <img src={(`https://image.tmdb.org/t/p/w500/${ninetiesMovie.backdrop_path}`)} ></img>
                                                <p>{ninetiesMovie.title}</p>  
                                            </div> 
                                    </div>

                            ))}
                    </div>
                        <div>
                        {!this.state.isHidden && this.state.hiddenGenre === 'nineties' &&
                                    <div className='movie-details'>
                                        <div className='details-info'>
                                            <div className='top'>
                                                <h2>{this.state.movie.title}</h2>
                                                <div className='time'>
                                                    <sub>{this.changeDate(this.state.movie.release_date)}</sub>
                                                    <sub>1h 57m</sub>
                                                </div>
                                            </div>

                                            <div className='overview'>
                                                <strong> {this.state.movie.overview} </strong>
                                            </div>

                                            <div className='buttons'>
                                                <Link to={`/browse/play/${this.state.movie.id}`} style={{textDecoration:'none'}}> <button id='play'> <i class="fas fa-play"></i> <h4>Play</h4>  </button> </Link>
                                                <button id='list' onClick={() => this.addToList(this.state.movie)}> <i class="fas fa-plus"></i> <h4>My List</h4> </button>
                                            </div>

                                            <div className='cast'>
                                                <em> <b>Starring:</b> {this.state.cast}, {'  '} {this.state.cast2}, {'  '} {this.state.cast3} </em>
                                                <em> <b>Genres:</b> {this.state.movie.genres[0].name}, {this.state.movie.genres[1].name}</em>
                                            </div>

                                        </div>

                                        <div className='drop-image' style={{backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${this.state.movie.backdrop_path})`}}/>

                                    </div>
                                }  
                        </div>
                </section>

                <section>
                    <h1>Comedies</h1>

                    <div className='listRow'>
                            {comedy.map((comedyMovie, index) => (
                                    <div className='movie'>
                                            <div className='movie--image' onClick={() => this.toggleHidden(comedyMovie.id, 'comedy')}>
                                                <img src={(`https://image.tmdb.org/t/p/w500/${comedyMovie.backdrop_path}`)} ></img>
                                                <p>{comedyMovie.title}</p>  
                                            </div> 
                                    </div>

                            ))}
                    </div>
                        <div>
                        {!this.state.isHidden && this.state.hiddenGenre === 'comedy' &&
                                    <div className='movie-details'>
                                        <div className='details-info'>
                                            <div className='top'>
                                                <h2>{this.state.movie.title}</h2>
                                                <div className='time'>
                                                    <sub>{this.changeDate(this.state.movie.release_date)}</sub>
                                                    <sub>1h 57m</sub>
                                                </div>
                                            </div>

                                            <div className='overview'>
                                                <strong> {this.state.movie.overview} </strong>
                                            </div>

                                            <div className='buttons'>
                                                <Link to={`/browse/play/${this.state.movie.id}`} style={{textDecoration:'none'}}> <button id='play'> <i class="fas fa-play"></i> <h4>Play</h4>  </button> </Link>
                                                <button id='list' onClick={() => this.addToList(this.state.movie)}> <i class="fas fa-plus"></i> <h4>My List</h4> </button>
                                            </div>

                                            <div className='cast'>
                                                <em> <b>Starring:</b> {this.state.cast}, {'  '} {this.state.cast2}, {'  '} {this.state.cast3} </em>
                                                <em> <b>Genres:</b> {this.state.movie.genres[0].name}, {this.state.movie.genres[1].name}</em>
                                            </div>

                                        </div>

                                        <div className='drop-image' style={{backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${this.state.movie.backdrop_path})`}}/>

                                    </div>
                                }  
                        </div>
                </section>

                <section>
                    <h1>Dramas</h1>

                    <div className='listRow'>
                            {drama.map((dramaMovie, index) => (
                                    <div className='movie'>
                                            <div className='movie--image' onClick={() => this.toggleHidden(dramaMovie.id, 'drama')}>
                                                <img src={(`https://image.tmdb.org/t/p/w500/${dramaMovie.backdrop_path}`)} ></img>
                                                <p>{dramaMovie.title}</p>  
                                            </div> 
                                    </div>

                            ))}
                    </div>

                        <div>
                        {!this.state.isHidden && this.state.hiddenGenre === 'drama' &&
                                    <div className='movie-details'>
                                        <div className='details-info'>
                                            <div className='top'>
                                                <h2>{this.state.movie.title}</h2>
                                                <div className='time'>
                                                    <sub>{this.changeDate(this.state.movie.release_date)}</sub>
                                                    <sub>1h 57m</sub>
                                                </div>
                                            </div>

                                            <div className='overview'>
                                                <strong> {this.state.movie.overview} </strong>
                                            </div>

                                            <div className='buttons'>
                                                <Link to={`/browse/play/${this.state.movie.id}`} style={{textDecoration:'none'}}> <button id='play'> <i class="fas fa-play"></i> <h4>Play</h4>  </button> </Link>
                                                <button id='list' onClick={() => this.addToList(this.state.movie)}> <i class="fas fa-plus"></i> <h4>My List</h4> </button>
                                            </div>

                                            <div className='cast'>
                                                <em> <b>Starring:</b> {this.state.cast}, {'  '} {this.state.cast2}, {'  '} {this.state.cast3} </em>
                                                <em> <b>Genres:</b> {this.state.movie.genres[0].name}, {this.state.movie.genres[1].name}</em>
                                            </div>

                                        </div>

                                        <div className='drop-image' style={{backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${this.state.movie.backdrop_path})`}}/>

                                    </div>
                                }  
                        </div>
                </section>

                <section>
                    <h1>For the Family</h1>

                    <div className='listRow'>
                            {family.map((familyMovie, index) => (
                                    <div className='movie'>
                                            <div className='movie--image' onClick={() => this.toggleHidden(familyMovie.id, 'family')}>
                                                <img src={(`https://image.tmdb.org/t/p/w500/${familyMovie.backdrop_path}`)} ></img>
                                                <p>{familyMovie.title}</p>  
                                            </div> 
                                    </div>

                            ))}
                    </div>

                        <div>
                        {!this.state.isHidden && this.state.hiddenGenre === 'family' &&
                                    <div className='movie-details'>
                                        <div className='details-info'>
                                            <div className='top'>
                                                <h2>{this.state.movie.title}</h2>
                                                <div className='time'>
                                                    <sub>{this.changeDate(this.state.movie.release_date)}</sub>
                                                    <sub>1h 57m</sub>
                                                </div>
                                            </div>

                                            <div className='overview'>
                                                <strong> {this.state.movie.overview} </strong>
                                            </div>

                                            <div className='buttons'>
                                                <Link to={`/browse/play/${this.state.movie.id}`} style={{textDecoration:'none'}}> <button id='play'> <i class="fas fa-play"></i> <h4>Play</h4>  </button> </Link>
                                                <button id='list' onClick={() => this.addToList(this.state.movie)}> <i class="fas fa-plus"></i> <h4>My List</h4> </button>
                                            </div>

                                            <div className='cast'>
                                                <em> <b>Starring:</b> {this.state.cast}, {'  '} {this.state.cast2}, {'  '} {this.state.cast3} </em>
                                                <em> <b>Genres:</b> {this.state.movie.genres[0].name}, {this.state.movie.genres[1].name}</em>
                                            </div>

                                        </div>

                                        <div className='drop-image' style={{backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${this.state.movie.backdrop_path})`}}/>

                                    </div>
                                }  
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