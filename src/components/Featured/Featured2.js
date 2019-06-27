import React, {Component} from 'react';

class Featured2 extends Component {
    render() {
        return (
            <main>
                <div className='movie-poster2'>
            
                </div>

                <div className='featured2FullInfo'>
                    <h1>Guardians</h1>
                    <h2>of the Galaxy</h2>

                    <div className='buttonsRow'>
                        <button className='button'> <i id='icons' class="fas fa-play"></i> <p id='buttonText'>Play</p></button>
                        <button className='button'> <i id='icons' class="fas fa-plus"></i> <p id='buttonText'>My List</p></button>
                        <button className='button'> <i id='layerIcon' class="fas fa-layer-group"></i> <p id='buttonText'>More Info</p></button>
                    </div>

                    <div>
                        <h4>A group of intergalactic criminals must pull together to stop a fanatical warrior with plans to purge the universe.</h4>
                    </div>
                </div>
            </main>
        )
    }
}

export default Featured2;