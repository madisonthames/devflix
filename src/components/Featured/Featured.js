import React, {Component} from 'react';

class Featured extends Component {
    render() {
        return (
            <main>
                <div className='movie-poster'></div>

                <div className='fullInfo'>
                    <h1 className='title'>Lala</h1>
                    <h1 className='title'>Land</h1>

                    <div className='buttonsRow'>
                        <button className='button'> <i class="fas fa-play"></i> <p>Play</p> </button>
                        <button className='button'> <i class="fas fa-plus"></i> <p>My List</p> </button>
                        <button className='button'> <i class="fas fa-layer-group"></i> <p>More Info</p> </button>
                    </div>

                    <div className='description'>
                        <h4>While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.</h4>
                    </div>
                </div>
            </main>
        )
    }
}

export default Featured;