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
            best: [],
            bradPitt: [],
            familyThrowbacks: [],
            family: [],
            video: [],
            movie: [],
            cast1: [],
            cast2: [],
            cast3: [],
            list: [],
            isInList: false,
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
            this.state.list.push(response.data[0])
            this.setState({ isInList: this.checkList(movie.id).length > 0 })
        })
    }

    deleteFromList = id => {
        axios
          .delete(`/api/delete/${id}`)
          .then(response => {
              console.log(response)
            this.setState({list: response.data})
            this.setState({ isInList: this.checkList(id).length > 0})
           })
      };

    getList = () => {
        axios
        .get("/api/mylist")
        .then(response => {
          this.setState({ list: response.data });
        }).catch(error => {
            this.setState({ error: "Oops, please try again."})
        }
            )
    };


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
            this.setState({ cast: response.data.cast[0].name, cast2: response.data.cast[1].name, cast3: response.data.cast[2].name })
        })
        console.log(this.state.list);
        this.setState({ isInList: this.checkList(id).length > 0})
    }

    changeDate(str) {
        let newStr = str.split('')
        newStr.splice(4, 6)
        return newStr.join('')
    }

    // fixGenres(arr) {
    //     let newArr = arr.split('')
    //     return newArr.join(',')
    // }

    checkList(id) {
        return this.state.list.filter((item) => id == item.movie_id)
    }

    componentDidMount() {
        this.props.getUser()
        this.getList();

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
            .get('/api/browse/bradpitt')
            .then(response => {
                this.setState({ bradPitt: response.data.results });
            })
            .catch(error => {
                this.setState({ error: "Oops, nineties please try again."})
            });

            axios
            .get('/api/browse/familythrowbacks')
            .then(response => {
                this.setState({ familyThrowbacks: response.data.results });
            })
            .catch(error => {
                this.setState({ error: "Oops, nineties please try again."})
            });

            axios
            .get("/api/browse/best")
            .then(response => {
                this.setState({ best: response.data.results });
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
        const {popular, nineties, comedy, drama, family, bradPitt, loggedIn, best, isInList, familyThrowbacks} = this.state;
        console.log(this.state.movie)
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
                                                {popularMovie.backdrop_path ?
                                                    <img src={(`https://image.tmdb.org/t/p/w500/${popularMovie.backdrop_path}`)} ></img>  
                                                :
                                                    <img src='https://cdn.traileraddict.com/images/errors/noposter.jpg'></img> 
                                                }
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
                                                <button id='list' onClick={() => isInList ? this.deleteFromList(this.state.movie.id) : this.addToList(this.state.movie)}> 
                                                <i className={`fas ${isInList ? 'fa-minus' : 'fa-plus'}`}></i> 
                                                <h4>My List</h4> </button>
                                            </div>

                                            <div className='cast'>
                                                <em> <b>Starring:</b> {this.state.cast}, {'  '} {this.state.cast2}, {'  '} {this.state.cast3} </em>
                                                <b>Genres: {this.state.movie.genres.map((genre, index) => (
                                                        <em>{`${genre.name + ' '}`}</em>  
                                            ))}</b>
                                            </div>

                                        </div>


                                        <div className='drop-image' style={{backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${this.state.movie.backdrop_path})`}}>
                                            <i class="fas fa-times" onClick={() => this.toggleHidden(this.state.movie.id)}></i>
                                        </div>

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
                                                {ninetiesMovie.backdrop_path ?
                                                    <img src={(`https://image.tmdb.org/t/p/w500/${ninetiesMovie.backdrop_path}`)} ></img>  
                                                :
                                                    <img src='https://cdn.traileraddict.com/images/errors/noposter.jpg'></img> 
                                                }
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
                                                <button id='list' onClick={() => isInList ? this.deleteFromList(this.state.movie) : this.addToList(this.state.movie)}> 
                                                <i className={`fas ${isInList ? 'fa-minus' : 'fa-plus'}`}></i> 
                                                <h4>My List</h4> </button>
                                            </div>

                                            <div className='cast'>
                                                <em> <b>Starring:</b> {this.state.cast}, {'  '} {this.state.cast2}, {'  '} {this.state.cast3} </em>
                                                <b>Genres: {this.state.movie.genres.map((genre, index) => (
                                                        <em>{`${genre.name + ' '}`}</em>  
                                            ))}</b>
                                            </div>

                                        </div>


                                        <div className='drop-image' style={{backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${this.state.movie.backdrop_path})`}}>
                                            <i class="fas fa-times" onClick={() => this.toggleHidden(this.state.movie.id)}></i>
                                        </div>

                                    </div>
                                }  
                        </div>
                </section>

                {/* <section>
                    <h1>Blockbuster Movies</h1>

                    <div className='popular2ListRow'>
                            {best.map((bestMovie, index) => (
                                    <div className='movie'>
                                            <div className='movie--image' onClick={() => this.toggleHidden(bestMovie.id, 'best')}>
                                                <img src={(`https://image.tmdb.org/t/p/w500/${bestMovie.poster_path}`)} ></img>
                                            </div>
                                    </div>

                            ))}
                    </div>

                    <div>
                    {!this.state.isHidden && this.state.hiddenGenre === 'best' &&
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
                                                <button id='list' onClick={() => isInList ? this.deleteFromList(this.state.movie.id) : this.addToList(this.state.movie)}> 
                                                <i className={`fas ${isInList ? 'fa-minus' : 'fa-plus'}`}></i> 
                                                <h4>My List</h4> </button>
                                        </div>

                                        <div className='cast'>
                                                <em> <b>Starring:</b> {this.state.cast}, {'  '} {this.state.cast2}, {'  '} {this.state.cast3} </em>
                                                <b>Genres: {this.state.movie.genres.map((genre, index) => (
                                                        <em>{`${genre.name + ' '}`}</em>  
                                            ))}</b>
                                        </div>

                                    </div>


                                    <div className='drop-image' style={{backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${this.state.movie.backdrop_path})`}}>
                                        <i class="fas fa-times" onClick={() => this.toggleHidden(this.state.movie.id)}></i>
                                    </div>

                                </div>
                            }  
                    </div>
                </section> */}


                <section>
                    <h1>Comedies</h1>

                    <div className='listRow'>
                            {comedy.map((comedyMovie, index) => (
                                    <div className='movie'>
                                            <div className='movie--image' onClick={() => this.toggleHidden(comedyMovie.id, 'comedy')}>
                                                {comedyMovie.backdrop_path ?
                                                    <img src={(`https://image.tmdb.org/t/p/w500/${comedyMovie.backdrop_path}`)} ></img>  
                                                :
                                                    <img src='https://cdn.traileraddict.com/images/errors/noposter.jpg'></img> 
                                                }
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
                                                <button id='list' onClick={() => isInList ? this.deleteFromList(this.state.movie) : this.addToList(this.state.movie)}> 
                                                <i className={`fas ${isInList ? 'fa-minus' : 'fa-plus'}`}></i> 
                                                <h4>My List</h4> </button>
                                            </div>

                                            <div className='cast'>
                                                <em> <b>Starring:</b> {this.state.cast}, {'  '} {this.state.cast2}, {'  '} {this.state.cast3} </em>
                                                <b>Genres: {this.state.movie.genres.map((genre, index) => (
                                                        <em>{`${genre.name + ' '}`}</em>  
                                            ))}</b>
                                            </div>

                                        </div>


                                        <div className='drop-image' style={{backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${this.state.movie.backdrop_path})`}}>
                                            <i class="fas fa-times" onClick={() => this.toggleHidden(this.state.movie.id)}></i>
                                        </div>

                                    </div>
                                }  
                        </div>
                </section>

                {/* <section>
                    <h1>Throwbacks for the Kids</h1>

                    <div className='listRow'>
                            {familyThrowbacks.map((familyThrowbackMovie, index) => (
                                    <div className='movie'>
                                            <div className='movie--image' onClick={() => this.toggleHidden(familyThrowbackMovie.id, 'familyThrowbacks')}>
                                                {familyThrowbackMovie.backdrop_path ?
                                                    <img src={(`https://image.tmdb.org/t/p/w500/${familyThrowbackMovie.backdrop_path}`)} ></img>  
                                                :
                                                    <img src='https://cdn.traileraddict.com/images/errors/noposter.jpg'></img> 
                                                }
                                                <p>{familyThrowbackMovie.title}</p>  
                                            </div> 
                                    </div>

                            ))}
                    </div>
                        <div>
                        {!this.state.isHidden && this.state.hiddenGenre === 'familyThrowbacks' &&
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
                                                <button id='list' onClick={() => isInList ? this.deleteFromList(this.state.movie) : this.addToList(this.state.movie)}> 
                                                <i className={`fas ${isInList ? 'fa-minus' : 'fa-plus'}`}></i> 
                                                <h4>My List</h4> </button>
                                            </div>

                                            <div className='cast'>
                                                <em> <b>Starring:</b> {this.state.cast}, {'  '} {this.state.cast2}, {'  '} {this.state.cast3} </em>
                                                <b>Genres: {this.state.movie.genres.map((genre, index) => (
                                                        <em>{`${genre.name + ' '}`}</em>  
                                            ))}</b>
                                            </div>

                                        </div>


                                        <div className='drop-image' style={{backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${this.state.movie.backdrop_path})`}}>
                                            <i class="fas fa-times" onClick={() => this.toggleHidden(this.state.movie.id)}></i>
                                        </div>

                                    </div>
                                }  
                        </div>
                </section> */}

                {/* <section>
                    <h1>Starring Brad Pitt</h1>

                    <div className='listRow'>
                            {bradPitt.map((pittMovie, index) => (
                                    <div className='movie'>
                                            <div className='movie--image' onClick={() => this.toggleHidden(pittMovie.id, 'bradPitt')}>
                                                {pittMovie.backdrop_path ?
                                                    <img src={(`https://image.tmdb.org/t/p/w500/${pittMovie.backdrop_path}`)} ></img>  
                                                :
                                                    <img src='https://cdn.traileraddict.com/images/errors/noposter.jpg'></img> 
                                                }
                                                <p>{pittMovie.title}</p>  
                                            </div> 
                                    </div>

                            ))}
                    </div>
                        <div>
                        {!this.state.isHidden && this.state.hiddenGenre === 'bradPitt' &&
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
                                                <button id='list' onClick={() => isInList ? this.deleteFromList(this.state.movie) : this.addToList(this.state.movie)}> 
                                                <i className={`fas ${isInList ? 'fa-minus' : 'fa-plus'}`}></i> 
                                                <h4>My List</h4> </button>
                                            </div>

                                            <div className='cast'>
                                                <em> <b>Starring:</b> {this.state.cast}, {'  '} {this.state.cast2}, {'  '} {this.state.cast3} </em>
                                                <b>Genres: {this.state.movie.genres.map((genre, index) => (
                                                        <em>{`${genre.name + ' '}`}</em>  
                                            ))}</b>
                                            </div>

                                        </div>


                                        <div className='drop-image' style={{backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${this.state.movie.backdrop_path})`}}>
                                            <i class="fas fa-times" onClick={() => this.toggleHidden(this.state.movie.id)}></i>
                                        </div>

                                    </div>
                                }  
                        </div>
                </section> */}

                <section>
                    <h1>Dramas</h1>

                    <div className='listRow'>
                            {drama.map((dramaMovie, index) => (
                                    <div className='movie'>
                                            <div className='movie--image' onClick={() => this.toggleHidden(dramaMovie.id, 'drama')}>
                                                {dramaMovie.backdrop_path ?
                                                    <img src={(`https://image.tmdb.org/t/p/w500/${dramaMovie.backdrop_path}`)} ></img>  
                                                :
                                                    <img src='https://cdn.traileraddict.com/images/errors/noposter.jpg'></img> 
                                                }
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
                                                <button id='list' onClick={() => isInList ? this.deleteFromList(this.state.movie) : this.addToList(this.state.movie)}> 
                                                <i className={`fas ${isInList ? 'fa-minus' : 'fa-plus'}`}></i> 
                                                <h4>My List</h4> </button>
                                            </div>

                                            <div className='cast'>
                                                <em> <b>Starring:</b> {this.state.cast}, {'  '} {this.state.cast2}, {'  '} {this.state.cast3} </em>
                                                <b>Genres: {this.state.movie.genres.map((genre, index) => (
                                                        <em>{`${genre.name + ' '}`}</em>  
                                            ))}</b>
                                            </div>

                                        </div>


                                        <div className='drop-image' style={{backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${this.state.movie.backdrop_path})`}}>
                                            <i class="fas fa-times" onClick={() => this.toggleHidden(this.state.movie.id)}></i>
                                        </div>

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
                                                <button id='list' onClick={() => isInList ? this.deleteFromList(this.state.movie) : this.addToList(this.state.movie)}> 
                                                <i className={`fas ${isInList ? 'fa-minus' : 'fa-plus'}`}></i> 
                                                <h4>My List</h4> </button>
                                            </div>

                                            <div className='cast'>
                                                <em> <b>Starring:</b> {this.state.cast}, {'  '} {this.state.cast2}, {'  '} {this.state.cast3} </em>
                                                <b>Genres: {this.state.movie.genres.map((genre, index) => (
                                                        <em>{`${genre.name + ' '}`}</em>  
                                            ))}</b>
                                            </div>

                                        </div>


                                        <div className='drop-image' style={{backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${this.state.movie.backdrop_path})`}}>
                                            <i class="fas fa-times" onClick={() => this.toggleHidden(this.state.movie.id)}></i>
                                        </div>

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