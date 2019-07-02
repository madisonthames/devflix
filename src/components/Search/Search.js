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
            results: [],
            loggedIn: true,
            user: [],
            poster: false
        }
    }

    getResults(input) {
        axios.get(`/api/browse/results/?input=${input}`)
          .then(( results ) => {
            this.setState(() => ({ results: results.data.results }));
          });
    }

    componentDidMount() {
        const { input } = this.props.match.params
        let joined = input.split(' ').join('%20')
        this.getResults(joined)
        console.log(joined)
    }

    render() {
        let input = this.props.match.params.input
        const { results } = this.state;

        function checkForPoster() {

        }

        return (
            <section>
                < Header />

            <div className='search'>
                <h1>Results</h1>

                    <div className='my-list-row'>
                        {results.map((resultMovie, index) => (
                            // if there is a movie path display else use other
                                <div className='movie'>
                                        <div className='movie--image'>

                                            if(resultMovie.backdrop_path !== null) {
                                                <img src={(`https://image.tmdb.org/t/p/w500/${resultMovie.backdrop_path}`)} ></img>
                                               
                                            } else {
                                                <img src='https://cdn.amctheatres.com/Media/Default/Images/noposter.jpg'></img> 
                                            }
                                        }
                                            <p>{resultMovie.title}</p>  
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