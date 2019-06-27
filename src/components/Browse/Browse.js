import React, {Component} from 'react';
import Header from '../Header/Header';
import Featured from '../Featured/Featured';
import BrowseLists from '../BrowseLists/BrowseLists';

class Browse extends Component {
    render() {
        return (
            <div>
                < Header />
                < Featured />
                < BrowseLists />
            </div>
        )
    }
}

export default Browse;