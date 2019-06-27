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
            boxOffice: [],
            loggedIn: true,
            user: []
        }

        this.getMovies = this.getMovies.bind(this);
    }
    // 313369

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




    render() {
        const {featured, popular, nineties, twoThousands, trending, top, boxOffice} = this.state;

        return (
           
            <div className='full-genre'>
                < Header2 />
                <div className='full-featured' style={{backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${featured.backdrop_path})`}}>
                <div className='genre-featured'>
                    
                    <div className='full-info'>
                       
                                <h2 className='title'>{featured.title}</h2>

                                <div className='buttonsRow'>
                                    <button className='button'> <i class="fas fa-play"></i> <p>Play</p> </button>
                                    <button className='button'> <i class="fas fa-plus"></i> <p>My List</p> </button>
                                    <button className='button'> <i class="fas fa-layer-group"></i> <p>More Info</p> </button>
                                </div>
                    </div>

                </div>

            <div className='fullBrowse'>

            <section>
                    <h1>Best at the Box Office</h1>

                    <div className='listRow'>
                            {boxOffice.map((boxOfficeMovie, index) => (
                                    <div className='movie'>
                                        <Link to={`/browse/play/${boxOfficeMovie.id}`} style={{textDecoration:'none'}}>

                                            <div className='movie--image'>
                                                <img src={(`https://image.tmdb.org/t/p/w500/${boxOfficeMovie.backdrop_path}`)} ></img>
                                                <p>{boxOfficeMovie.title}</p>  

                                            </div>
                                        </Link>
                                            <i class="fas fa-plus-circle" onClick={() => this.addToList(boxOfficeMovie)}></i>    

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
                    <h1>90s Favorites</h1>

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
                    <h1>Trending Now</h1>

                    <div className='listRow'>
                            {trending.map((trendingMovie, index) => (
                                    <div className='movie'>
                                        <Link to={`/browse/play/${trendingMovie.id}`} style={{textDecoration:'none'}}>

                                            <div className='movie--image'>
                                                <img src={(`https://image.tmdb.org/t/p/w500/${trendingMovie.backdrop_path}`)} ></img>
                                                <p>{trendingMovie.title}</p>  

                                            </div>
                                        </Link>
                                            <i class="fas fa-plus-circle" onClick={() => this.addToList(trendingMovie)}></i>    

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
                    <h1>Most on Devflix</h1>

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
                    <h1>Best Rated in the 2000s</h1>

                    <div className='listRow'>
                            {twoThousands.map((twoThousandsMovie, index) => (
                                    <div className='movie'>
                                        <Link to={`/browse/play/${twoThousandsMovie.id}`} style={{textDecoration:'none'}}>

                                            <div className='movie--image'>
                                                <img src={(`https://image.tmdb.org/t/p/w500/${twoThousandsMovie.backdrop_path}`)} ></img>
                                                <p>{twoThousandsMovie.title}</p>  

                                            </div>
                                        </Link>
                                            <i class="fas fa-plus-circle" onClick={() => this.addToList(twoThousandsMovie)}></i>    

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
                    <h1>Top Picks</h1>

                    <div className='listRow'>
                            {top.map((topMovie, index) => (
                                    <div className='movie'>
                                        <Link to={`/browse/play/${topMovie.id}`} style={{textDecoration:'none'}}>

                                            <div className='movie--image'>
                                                <img src={(`https://image.tmdb.org/t/p/w500/${topMovie.backdrop_path}`)} ></img>
                                                <p>{topMovie.title}</p>  

                                            </div>
                                        </Link>
                                            <i class="fas fa-plus-circle" onClick={() => this.addToList(topMovie)}></i>    

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
            </div>
        </div>
        )
    }
}

export default Genre;