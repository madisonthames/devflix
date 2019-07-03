import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header2 from '../Header/Header2';

class Genre extends Component {
    constructor(props) {
        super(props);
        this.state = {
            featured: [],
            popular: [],
            nineties: [],
            twoThousands: [],
            trending: [],
            top: [],
            movie: [],
            cast1: [],
            cast2: [],
            cast3: [],
            boxOffice: [],
            list: [],
            loggedIn: true,
            user: [],
            isHidden: true,
            hiddenGenre: '',
        }
        this.toggleHidden = this.toggleHidden.bind(this);
        this.changeDate = this.changeDate.bind(this);
        this.getMovies = this.getMovies.bind(this);
    }

    addToList(movie) {
        axios
        .post("/api/mylist", movie)
        .then(response => {
            alert('Saved to your list!');
        })
    }

    getMovies() {
        const { match: { params } } = this.props;

        axios.get(`/api/browse/genre/popular/${params.id}`)
        .then(({ data: popular }) => {
            console.log(popular)
          this.setState({ featured: popular.results[0]});
        });

        axios.get(`/api/browse/genre/popular/${params.id}`)
          .then(({ data: popular }) => {
              console.log(popular)
            this.setState({ popular: popular.results});
          });

        axios.get(`/api/browse/genre/nineties/${params.id}`)
        .then(({ data: nineties }) => {
            this.setState({ nineties: nineties.results});
        });

        axios.get(`/api/browse/genre/top/${params.id}`)
        .then(({ data: top }) => {
    
            this.setState({ top: top.results});
        });

        axios.get(`/api/browse/genre/2000s/${params.id}`)
        .then(({ data: twoThousands }) => {
    
            this.setState({ twoThousands: twoThousands.results});
        });

        axios.get(`/api/browse/genre/trending/${params.id}`)
        .then(({ data: trending }) => {
    
            this.setState({ trending: trending.results});
        });

        axios.get(`/api/browse/genre/box-office/${params.id}`)
        .then(({ data: boxOffice }) => {
    
            this.setState({ boxOffice: boxOffice.results});
        });
    }

    componentDidMount() {
        this.getMovies();
      }

    componentDidUpdate(prevProps) {
        const { match: { params: genreId } } = this.props;

        const prevGenreId = prevProps.match.params

        if (prevGenreId !== genreId) {
            this.getMovies(genreId);
            }

    }

    addToList(movie) {
        axios
        .post("/api/mylist", movie)
        .then(response => {
            alert('Saved to your list!');
        })
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

    checkList(id) {
        return this.state.list.filter((item) => id == item.movie_id)
    }


    render() {
        const {featured, popular, nineties, twoThousands, trending, top, boxOffice, isInList} = this.state;

        return (
           
            <div className='full-genre'>
                < Header2 />
                <div className='full-featured' style={{backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${featured.backdrop_path})`}}>
                <div className='genre-featured'>
                    
                    <div className='full-info'>
                                <div className='title-box'>
                                    <h2 className='title'>{featured.title}</h2>
                                </div>
                                

                                <div className='buttonsRow'>
                                                <Link to={`/browse/play/${this.state.movie.id}`} style={{textDecoration:'none'}}> <button > <i class="fas fa-play"></i> <span>Play</span>  </button> </Link>
                                                <button  onClick={() => isInList ? this.deleteFromList(this.state.movie.id) : this.addToList(this.state.movie)}> 
                                                <i className={`fas ${isInList ? 'fa-minus' : 'fa-plus'}`}></i> 
                                                <span>My List</span> </button>
                                </div>

                                <div className='overview-box'>
                                    <p>{featured.overview}</p>
                                </div>
                    </div>

                </div>

            <div className='fullBrowse'>

            <section>
                    <h1>Best at the Box Office</h1>

                    <div className='listRow'>
                            {boxOffice.map((boxOfficeMovie, index) => (
                                    <div className='movie'>
                                            <div className='movie--image' onClick={() => this.toggleHidden(boxOfficeMovie.id, 'boxOffice')}>
                                                {boxOfficeMovie.backdrop_path ?
                                                    <img src={(`https://image.tmdb.org/t/p/w500/${boxOfficeMovie.backdrop_path}`)} ></img>  
                                                :
                                                    <img src='https://cdn.traileraddict.com/images/errors/noposter.jpg'></img> 
                                                }
                                                <p>{boxOfficeMovie.title}</p>  
                                            </div>
                                    </div>
                            ))}
                    </div>

                    <div>
                    {!this.state.isHidden && this.state.hiddenGenre === 'boxOffice' &&
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
                    <h1>90s Favorites</h1>

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
                    <h1>Trending Now</h1>

                    <div className='listRow'>
                            {trending.map((trendingMovie, index) => (
                                    <div className='movie'>
                                            <div className='movie--image' onClick={() => this.toggleHidden(trendingMovie.id, 'trending')}>
                                                {trendingMovie.backdrop_path ?
                                                    <img src={(`https://image.tmdb.org/t/p/w500/${trendingMovie.backdrop_path}`)} ></img>  
                                                :
                                                    <img src='https://cdn.traileraddict.com/images/errors/noposter.jpg'></img> 
                                                }
                                                <p>{trendingMovie.title}</p>  
                                            </div>
                                    </div>

                            ))}
                    </div>

                    <div>
                    {!this.state.isHidden && this.state.hiddenGenre === 'trending' &&
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
                    <h1>Most on Devflix</h1>

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
                    <h1>Best Rated in the 2000s</h1>

                    <div className='listRow'>
                            {twoThousands.map((twoThousandsMovie, index) => (
                                    <div className='movie'>
                                            <div className='movie--image' onClick={() => this.toggleHidden(twoThousandsMovie.id, 'twoThousands')}>
                                                {twoThousandsMovie.backdrop_path ?
                                                    <img src={(`https://image.tmdb.org/t/p/w500/${twoThousandsMovie.backdrop_path}`)} ></img>  
                                                :
                                                    <img src='https://cdn.traileraddict.com/images/errors/noposter.jpg'></img> 
                                                }
                                                <p>{twoThousandsMovie.title}</p>  
                                            </div>
                                    </div>

                            ))}
                    </div>

                    <div>
                    {!this.state.isHidden && this.state.hiddenGenre === 'twoThousands' &&
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
                    <h1>Top Picks</h1>

                    <div className='listRow'>
                            {top.map((topMovie, index) => (
                                    <div className='movie'>
                                            <div className='movie--image' onClick={() => this.toggleHidden(topMovie.id, 'top')}>
                                                {topMovie.backdrop_path ?
                                                    <img src={(`https://image.tmdb.org/t/p/w500/${topMovie.backdrop_path}`)} ></img>  
                                                :
                                                    <img src='https://cdn.traileraddict.com/images/errors/noposter.jpg'></img> 
                                                }
                                                <p>{topMovie.title}</p>  
                                            </div>
                                    </div>

                            ))}
                    </div>

                    <div>
                    {!this.state.isHidden && this.state.hiddenGenre === 'top' &&
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
            </div>
            </div>
        </div>
        )
    }
}

export default Genre;