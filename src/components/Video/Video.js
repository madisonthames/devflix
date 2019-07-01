import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import VideoHeader from '../Header/VideoHeader';

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
                <div className='video-header'>
                    < VideoHeader />
                </div>

                <iframe src={`https://www.youtube.com/embed/${video.key}`} 
                    className='video'
                    width="100vw"
                    height="100vh">
                </iframe>
            </div>

        )
    }
}

export default Video;