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
        return (
            <main>
                <div className='movie-poster2'>
            
                </div>

                <div className='featured2FullInfo'>
                    <h1>Guardians</h1>
                    <h2>of the Galaxy</h2>

                    <div className='buttonsRow2'>
                        <Link to={`/browse/play/${this.state.movie.id}`} style={{textDecoration:'none'}}> <button className='button'> <i id='icons' class="fas fa-play"></i> <p id='buttonText'>Play</p></button> </Link>
                        <button className='button' onClick={() => this.addToList(this.state.movie)}> <i id='icons' class="fas fa-plus"></i> <p id='buttonText'>My List</p></button>
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