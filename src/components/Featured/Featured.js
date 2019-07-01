import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUser} from '../../ducks/reducer';

class Featured extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: [],
            loggedIn: true,
            user: [],
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
        .get('/api/lala')
        .then(response => {
            this.setState({ movie: response.data });
        })
        .catch(error => {
            this.setState({ error: "Oops, comedy please try again."})
        });
    }
    render() {
        return (
            <main>
                <div className='movie-poster'></div>

                <div className='fullInfo'>
                    <h1 className='title'>Lala</h1>
                    <h1 className='title'>Land</h1>

                    <div className='buttonsRow'>
                        <Link to={`/browse/play/${this.state.movie.id}`} style={{textDecoration:'none'}}> <button className='button'> <i class="fas fa-play"></i> <p>Play</p> </button> </Link>
                        <button className='button' onClick={() => this.addToList(this.state.movie)}> <i class="fas fa-plus"></i> <p>My List</p> </button>
                    </div>

                    <div className='description'>
                        <h4>While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.</h4>
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
  
  
  
  export default connect(mapStateToProps, {getUser})(Featured);