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
            romance: [],
            mystery: [],
            family: [],
            documentary: [],
            music: [],
            thriller: [],
            popular2: [],
            tv: [],
            loggedIn: true,
            user: [],
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
                                            <div className='movie--image' onClick={() => this.toggleHidden(actionMovie.id, 'action')}>
                                                {actionMovie.backdrop_path ?
                                                    <img src={(`https://image.tmdb.org/t/p/w500/${actionMovie.backdrop_path}`)} ></img>  
                                                :
                                                    <img src='https://cdn.traileraddict.com/images/errors/noposter.jpg'></img> 
                                                }
                                                <p>{actionMovie.title}</p> 
                                            </div>
                                    </div>

                            ))}
                    </div>

                    <div>
                    {!this.state.isHidden && this.state.hiddenGenre === 'action' &&
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
                            {comedy2.map((comedy2Movie, index) => (
                                    <div className='movie'>
                                            <div className='movie--image' onClick={() => this.toggleHidden(comedy2Movie.id, 'comedy2')}>
                                                {comedy2Movie.backdrop_path ?
                                                    <img src={(`https://image.tmdb.org/t/p/w500/${comedy2Movie.backdrop_path}`)} ></img>  
                                                :
                                                    <img src='https://cdn.traileraddict.com/images/errors/noposter.jpg'></img> 
                                                }
                                                <p>{comedy2Movie.title}</p>  
                                            </div>
                                    </div>
                            ))}
                    </div>

                    <div>
                    {!this.state.isHidden && this.state.hiddenGenre === 'comedy2' &&
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
                    <h1>Romance</h1>

                    <div className='listRow'>
                            {romance.map((romanceMovie, index) => (
                                    <div className='movie'>
                                            <div className='movie--image' onClick={() => this.toggleHidden(romanceMovie.id, 'romance')}>
                                                {romanceMovie.backdrop_path ?
                                                    <img src={(`https://image.tmdb.org/t/p/w500/${romanceMovie.backdrop_path}`)} ></img>  
                                                :
                                                    <img src='https://cdn.traileraddict.com/images/errors/noposter.jpg'></img> 
                                                }
                                                <p>{romanceMovie.title}</p>  
                                            </div>
                                    </div>

                            ))}
                    </div>

                    <div>
                    {!this.state.isHidden && this.state.hiddenGenre === 'romance' &&
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
                    <h1>Documentaries</h1>

                    <div className='listRow'>
                            {documentary.map((documentaryMovie, index) => (
                                    <div className='movie'>
                                            <div className='movie--image' onClick={() => this.toggleHidden(documentaryMovie.id, 'documentary')}>
                                                {documentaryMovie.backdrop_path ?
                                                    <img src={(`https://image.tmdb.org/t/p/w500/${documentaryMovie.backdrop_path}`)} ></img>  
                                                :
                                                    <img src='https://cdn.traileraddict.com/images/errors/noposter.jpg'></img> 
                                                }
                                                <p>{documentaryMovie.title}</p>  
                                            </div>
                                    </div>
                            ))}
                    </div>

                    <div>
                    {!this.state.isHidden && this.state.hiddenGenre === 'documentary' &&
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
                    <h1>Most Popular</h1>

                    <div className='listRow'>
                            {popular2.map((popular2Movie, index) => (
                                    <div className='movie'>
                                            <div className='movie--image' onClick={() => this.toggleHidden(popular2Movie.id, 'popular2')}>
                                                <img src={(`https://image.tmdb.org/t/p/w500/${popular2Movie.backdrop_path}`)} ></img>
                                                <p>{popular2Movie.title}</p>  
                                            </div>
                                    </div>

                            ))}
                    </div>

                    <div>
                    {!this.state.isHidden && this.state.hiddenGenre === 'popular2' &&
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
                    <h1>Movies Based on Music</h1>

                    <div className='listRow'>
                            {music.map((musicMovie, index) => (
                                    <div className='movie'>
                                            <div className='movie--image' onClick={() => this.toggleHidden(musicMovie.id, 'music')}>
                                                {musicMovie.backdrop_path ?
                                                    <img src={(`https://image.tmdb.org/t/p/w500/${musicMovie.backdrop_path}`)} ></img>  
                                                :
                                                    <img src='https://cdn.traileraddict.com/images/errors/noposter.jpg'></img> 
                                                }
                                                <p>{musicMovie.title}</p>  
                                            </div>
                                    </div>

                            ))}
                    </div>

                    <div>
                    {!this.state.isHidden && this.state.hiddenGenre === 'music' &&
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
                                                {familyMovie.backdrop_path ?
                                                    <img src={(`https://image.tmdb.org/t/p/w500/${familyMovie.backdrop_path}`)} ></img>  
                                                :
                                                    <img src='https://cdn.traileraddict.com/images/errors/noposter.jpg'></img> 
                                                }
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

                <section>
                    <h1>Thrillers</h1>

                    <div className='listRow'>
                            {thriller.map((thrillerMovie, index) => (
                                    <div className='movie'>
                                            <div className='movie--image' onClick={() => this.toggleHidden(thrillerMovie.id, 'thriller')}>
                                                {thrillerMovie.backdrop_path ?
                                                    <img src={(`https://image.tmdb.org/t/p/w500/${thrillerMovie.backdrop_path}`)} ></img>  
                                                :
                                                    <img src='https://cdn.traileraddict.com/images/errors/noposter.jpg'></img> 
                                                }
                                                <p>{thrillerMovie.title}</p>  

                                            </div>
                                    </div>

                            ))}
                    </div>

                    <div>
                    {!this.state.isHidden && this.state.hiddenGenre === 'thriller' &&
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
                    <h1>Mysteries</h1>

                    <div className='listRow'>
                            {mystery.map((mysteryMovie, index) => (
                                    <div className='movie'>
                                            <div className='movie--image' onClick={() => this.toggleHidden(mysteryMovie.id, 'mystery')}>
                                                {mysteryMovie.backdrop_path ?
                                                    <img src={(`https://image.tmdb.org/t/p/w500/${mysteryMovie.backdrop_path}`)} ></img>  
                                                :
                                                    <img src='https://cdn.traileraddict.com/images/errors/noposter.jpg'></img> 
                                                }
                                                <p>{mysteryMovie.title}</p>  
                                            </div>
                                    </div>

                            ))}
                    </div>

                    <div>
                    {!this.state.isHidden && this.state.hiddenGenre === 'mystery' &&
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
                    <h1>Made for TV</h1>

                    <div className='listRow'>
                            {tv.map((tvMovie, index) => (
                                    <div className='movie'>
                                            <div className='movie--image' onClick={() => this.toggleHidden(tvMovie.id, 'tv')}>
                                                {tvMovie.backdrop_path ?
                                                    <img src={(`https://image.tmdb.org/t/p/w500/${tvMovie.backdrop_path}`)} ></img>  
                                                :
                                                    <img src='https://cdn.traileraddict.com/images/errors/noposter.jpg'></img> 
                                                }
                                                <p>{tvMovie.title}</p>  
                                            </div>
                                    </div>

                            ))}
                    </div>

                    <div>
                    {!this.state.isHidden && this.state.hiddenGenre === 'tv' &&
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
  
  
  
  export default connect(mapStateToProps, {getUser})(BrowseLists2);