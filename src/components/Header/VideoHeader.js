import React from 'react';
import { Link } from 'react-router-dom';

function VideoHeader() {
    return (
        <div className='vid-header'>
            <img src="https://fontmeme.com/permalink/190624/077d286cb67bd13d5d3497bf52bde221.png" alt="netflix-font" border="0"/>
            <Link to='/browse' style={{textDecoration:'none'}}> <button> Back to Home </button> </Link>
        </div>
    )
}

export default VideoHeader;