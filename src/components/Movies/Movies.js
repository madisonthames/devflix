import React, {Component} from 'react';
import Header2 from '../Header/Header2'
import BrowseLists2 from '../BrowseLists/BrowseLists2';
import Featured2 from '../Featured/Featured2';

class Movies extends Component {
    render() {
        return (
            <div>
                < Header2 />
                < Featured2 />
                < BrowseLists2 />
            </div>
        )
    }
}

export default Movies;