import React, {Component} from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';

class Video extends Component {
    constructor() {
        super();
        this.state = {
            video: []
        }
    }

    componentDidMount() {
        const { match: { params } } = this.props;

        axios.get(`/api/browse/play/${params.id}`)
          .then(({ data: video }) => {
      
            this.setState({ video: video.results[0] });
          });
      }

    render() {

        const { video } = this.state;

        return (
            <div className='fullVideo'>
                <iframe src={`https://www.youtube.com/embed/${video.key}`} 
                    className='video'
                    width="100%"
                    height="100%">
                </iframe>
            </div>

        )
    }
}

export default Video;