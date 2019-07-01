const axios = require('axios');
const { API_KEY } = process.env

//functions
const getPopular = (req, res) => {
    if (req.session.user) {
        axios
        .get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&page=2`)
        .then(response => {
            res.status(200).json({popular: response.data, user: req.session.user})
        })
    }
    else{
        res.status(401).json('Please log in to view movies.')
    }
  };

const getNineties = (req, res) => {
    axios
    .get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1&release_date.gte=1990&release_date.lte=1999`)
    .then(response => {
        res.status(200).json(response.data)
    })
};

const getComedy = (req, res) => {
    axios
    .get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=3&release_year.gte=2010&release_year.lte=2018&vote_average.gte=6&with_genres=35`)
    .then(response => {
        res.status(200).json(response.data) 
    })
}

const getDrama = (req, res) => {
    axios
    .get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1&release_year.gte=2010&release_year.lte=2018&vote_average.gte=8&with_genres=18`)
    .then(response => {
        res.status(200).json(response.data)
    })
}

const getKids = (req, res) => {
    axios
    .get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&certification_country=US&certification.lte=G&sort_by=popularity.desc`)
    .then(response => {
        res.status(200).json(response.data)
    })
}

const getAction = (req, res) => {
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=3&release_year.gte=2010&release_year.lte=2018&vote_average.gte=7&with_genres=28`)
    .then(response => {
        res.status(200).json(response.data)
    })
}

const getComedy2 = (req, res) => {
    if (req.session.user) {
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=2&release_year.gte=2000&release_year.lte=2018&with_genres=35`)
        .then(response => {
            res.status(200).json({comedy2: response.data, user: req.session.user})
        })
    } else{
        res.status(401).json('Please log in to view movies.')
    }
}

const getDocumentary = (req, res) => {
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=2&release_year.gte=2000&release_year.lte=2018&with_genres=99`)
    .then(response => {
        res.status(200).json(response.data)
    })
}

const getRomance = (req, res) => {
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=3&release_year.gte=2000&release_year.lte=2018&with_genres=10749`)
    .then(response => {
        res.status(200).json(response.data)
    })
}

const getMystery = (req, res) => {
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=3&release_year.gte=2000&release_year.lte=2018&with_genres=9648`)
    .then(response => {
        res.status(200).json(response.data)
    })
}

const getFamily = (req, res) => {
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=3&release_year.gte=2000&release_year.lte=2018&with_genres=10751`)
    .then(response => {
        res.status(200).json(response.data)
    })
}

const getMusic = (req, res) => {
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=3&release_year.gte=2000&release_year.lte=2018&with_genres=10402`)
    .then(response => {
        res.status(200).json(response.data)
    })
}

const getThriller = (req, res) => {
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=3&release_year.gte=2000&release_year.lte=2018&with_genres=53`)
    .then(response => {
        res.status(200).json(response.data)
    })
}

const getTV = (req, res) => {
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=4&release_year.gte=2000&release_year.lte=2018&with_genres=10770`)
    .then(response => {
        res.status(200).json(response.data)
    })
}

const getPopular2 = (req, res) => {
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`)
    .then(response => {
        res.status(200).json(response.data)
    })
}

const getVideos = (req, res) => {
    axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}/videos?api_key=${API_KEY}&language=en-US`)
    .then(response => {
        res.status(200).json(response.data)
    })
}

const getGenrePopular = (req, res) => {
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1&with_genres=${req.params.id}`)
    .then(response => {
        res.status(200).json(response.data)
    })
}

const getGenre90s = (req, res) => {
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1&with_genres=${req.params.id}&release_date.gte=1990&release_date.lte=1999`)
    .then(response => {
        res.status(200).json(response.data)
    })
}

const getGenre00s = (req, res) => {
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1&with_genres=${req.params.id}&release_date.gte=2000&release_date.lte=2009`)
    .then(response => {
        res.status(200).json(response.data)
    })
}

const getGenreTrendingNow = (req, res) => {
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=5&with_genres=${req.params.id}&release_date.gte=2018`)
    .then(response => {
        res.status(200).json(response.data)
    })
}

const getGenreTopPicks = (req, res) => {
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=10&with_genres=${req.params.id}`)
    .then(response => {
        res.status(200).json(response.data)
    })
}

const getBoxOfficeTop = (req, res) => {
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1&with_genres=${req.params.id}&sort_by=revenue.desc`)
    .then(response => {
        res.status(200).json(response.data)
    })
}

const getMovieDetails = (req, res) => {
    axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${API_KEY}&language=en-US`)
    .then(response => {
        res.status(200).json(response.data)
    })
}

const getStars = (req, res) => {
    axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}/credits?api_key=${API_KEY}`)
    .then(response => {
        res.status(200).json(response.data)
    })
}

const getLala = (req, res) => {
    axios.get(`https://api.themoviedb.org/3/movie/313369?api_key=${API_KEY}&language=en-US`)
    .then(response => {
        res.status(200).json(response.data)
    })
}

const getGuardians = (req, res) => {
    axios.get(`https://api.themoviedb.org/3/movie/118340?api_key=${API_KEY}&language=en-US`)
    .then(response => {
        res.status(200).json(response.data)
    })
}

const getResults = (req, res) => {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${req.query.input}&page=1&include_adult=false`)
    .then(response => {
        res.status(200).json(response.data)
    })
}

//exports
module.exports = {
    getPopular,
    getNineties,
    getComedy,
    getDrama,
    getKids,
    getAction,
    getComedy2,
    getDocumentary,
    getRomance,
    getMystery,
    getFamily,
    getMusic,
    getThriller,
    getTV,
    getPopular2,
    getVideos,
    getGenrePopular,
    getGenre90s,
    getGenre00s,
    getGenreTrendingNow,
    getGenreTopPicks,
    getBoxOfficeTop,
    getMovieDetails,
    getStars,
    getLala,
    getGuardians,
    getResults
}

