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
            results: '',
            loggedIn: true,
            user: [],
        }
    }

    getResults(input) {
        axios.get(`/api/browse/results/?input=${input}`)
          .then(( results ) => {
            this.setState(() => ({ results }));
          });
    }

    componentDidMount() {
        const { input } = this.props.match.params
        let joined = input.split(' ').join('%20')
        this.getResults(joined)
    }

    render() {
        let input = this.props.match.params.input
        const { list } = this.state;
        return (
            <section>
                < Header />

            <div className='search'>
                <h1>Results</h1>

                    <div className='my-list-row'>
                        {/* {list.map((listMovie, index) => (
                            
                                <div className='movie'>
                                    {console.log(listMovie)}
                                        <div className='movie--image'>
                                            <img src={(`https://image.tmdb.org/t/p/w500/${listMovie.backdrop}`)} ></img>
                                            <p>{listMovie.title}</p>  
                                            <i class="fas fa-minus-circle" onClick={() => this.deleteFromList(listMovie.movie_id)}></i>
                                        </div>
                                </div>

                        ))} */}
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