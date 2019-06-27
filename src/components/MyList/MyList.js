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
            loggedIn: true,
            user: []
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
            console.log(response)
          this.setState({ list: response.data });
        }).catch(error => {
            console.log(error)
        }
            )
    };

    deleteFromList = id => {
        axios
          .delete(`/api/delete/${id}`)
          .then(response => {
            alert('This movie has been removed from your list.')
           })
      };
    



    render() {
        const { list } = this.state;
        console.log(list)
        return (
            <section>
                < Header />

            <div className='my-list'>
                <h1>My List</h1>

                    <div className='my-list-row'>
                        {list.map((listMovie, index) => (
                                <div className='movie'>
                                    <Link to={`/browse/play/${listMovie.movie_id}`} style={{textDecoration:'none'}}>

                                        <div className='movie--image'>
                                            <img src={(`https://image.tmdb.org/t/p/w500/${listMovie.backdrop}`)} ></img>
                                            <p>{listMovie.title}</p>  

                                        </div>
                                    </Link>

                                    {/* <div className='movie--text'>
                                        <img src={(`https://image.tmdb.org/t/p/w500/${listMovie.backdrop_path}`)} ></img>
                                        <p>{listMovie.title}</p>   
                                        <div className='icon-group'> 
                                            <i class="fas fa-play-circle"></i>
                                            <i class="fas fa-plus-circle"></i>
                                            <i id='down' class="fas fa-angle-down"></i>
                                        </div>
                                    </div> */}
                                </div>

                        ))}
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