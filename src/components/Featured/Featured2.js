import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {getUser} from '../../ducks/reducer';
 
class Featured2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: [],
            loggedIn: true,
            user: [],
            list: [],
            isInList: false
        }
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

    checkList(id) {
        return this.state.list.filter((item) => id == item.movie_id)
    }

    componentDidMount() {
        this.props.getUser() 
        this.getList()

        axios
        .get('/api/guardians')
        .then(response => {
            console.log(response)
            this.setState({ movie: response.data });
        })
        .catch(error => {
            this.setState({ error: "Oops, comedy please try again."})
        });
    }
    render() {
        const {isInList} = this.state;

        return (
            <main>
                <div className='movie-poster2'>
            
                </div>

                <div className='featured2FullInfo'>
                    <h1>Guardians</h1>
                    <h2>of the Galaxy</h2>

                    <div className='buttonsRow2'>
                        <Link to={`/browse/play/${this.state.movie.id}`} style={{textDecoration:'none'}}> <button className='button'> <i id='icons' class="fas fa-play"></i> <span>Play</span></button> </Link>
                        <button className='button' onClick={() => isInList ? this.deleteFromList(this.state.movie.id) : this.addToList(this.state.movie)}> 
                            <i className={`fas ${isInList ? 'fa-minus' : 'fa-plus'}`}></i> 
                        <span>My List</span> </button>
                    </div>

                    <div>
                        <h4>A group of intergalactic criminals must pull together to stop a fanatical warrior with plans to purge the universe.</h4>
                    </div>
                </div>
            </main>
        )
    }
}

function mapStateToProps(state) {
    return {
      user: state.user
    }
  }
  
  
  
  export default connect(mapStateToProps, {getUser})(Featured2);