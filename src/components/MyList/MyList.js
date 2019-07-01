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
            user: [],
            movie: [],
            cast1: [],
            cast2: [],
            cast3: [],
            isHidden: true,
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

    deleteFromList = id => {
        axios
          .delete(`/api/delete/${id}`)
          .then(response => {
            this.getList();
            this.setState({list: response.data})
           })
      };
    

    render() {
        const { list } = this.state;
        return (
            <section>
                < Header />

            <div className='my-list'>
                <h1>My List</h1>

                    <div className='my-list-row'>
                        {list.map((listMovie, index) => (
                            
                                <div className='movie'>
                                    {console.log(listMovie)}
                                        <div className='movie--image'>
                                            <img src={(`https://image.tmdb.org/t/p/w500/${listMovie.backdrop}`)} ></img>
                                            <p>{listMovie.title}</p>  
                                            <i class="fas fa-minus-circle" onClick={() => this.deleteFromList(listMovie.movie_id)}></i>
                                        </div>
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