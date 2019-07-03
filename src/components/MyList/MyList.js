import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Header from '../Header/Header';
import {connect} from 'react-redux';
import {getUser} from '../../ducks/reducer';

class MyList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            user: [],
            movie: [],
            cast1: [],
            cast2: [],
            cast3: [],
            isInList: false,
            loggedIn: true,
            isHidden: true,
            hiddenGenre: ''
        }
    }

    componentDidMount() {
        this.props.getUser()
        this.getList();
    }

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

    checkList(id) {
        return this.state.list.filter((item) => id == item.movie_id)
    }

    render() {
        const { list, isInList } = this.state;
        return (
            <section>
                < Header />

            <div className='my-list'>
                <h1>My List</h1>

                    <div className='my-list-row'>
                        {list.map((listMovie, index) => (
                            
                                <div className='movie'>
                                        <div className='movie--image' onClick={() => this.toggleHidden(listMovie.movie_id, 'list')}>
                                            <img src={(`https://image.tmdb.org/t/p/w500/${listMovie.backdrop}`)} ></img>
                                            <p>{listMovie.title}</p>  
                                        </div>
                                </div>

                        ))}
                    </div>

                    <div>
                        {!this.state.isHidden && this.state.hiddenGenre === 'list' &&
                                    <div className='movie-details-list'>
                                        <div className='details-info-list'>
                                            <div className='top'>
                                                <h2>{this.state.movie.title}</h2>
                                                <div className='time'>
                                                    <sub>{this.changeDate(this.state.movie.release_date)}</sub>
                                                    <sub>1h 57m</sub>
                                                </div>
                                            </div>

                                            <div className='overview-list'>
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
            </div>
        </section>
        )
    }
}

function mapStateToProps(state) {
    return {
      user: state.user
    }
  }
  
  
  
  export default connect(mapStateToProps, {getUser})(MyList);