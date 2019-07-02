require ('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');

const app = express() 

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env
const dataController = require('./controllers/data');
const listController = require('./controllers/listController');
const authCtrl = require('./controllers/authController');

const path = require('path');

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.use(express.json())

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}))

massive(CONNECTION_STRING)
    .then(db => {
        console.log('Database Connected')
        app.set('db', db)
    }).catch(err => {
        console.log(err)
    })


//get external API
app.get('/api/popular', dataController.getPopular)
app.get('/api/nineties', dataController.getNineties)
app.get('/api/comedy', dataController.getComedy)
app.get('/api/drama', dataController.getDrama)
app.get('/api/kids', dataController.getKids)
app.get('/api/action', dataController.getAction)
app.get('/api/comedy2', dataController.getComedy2)
app.get('/api/documentary', dataController.getDocumentary)
app.get('/api/romance', dataController.getRomance)
app.get('/api/mystery', dataController.getMystery)
app.get('/api/family', dataController.getFamily)
app.get('/api/music', dataController.getMusic)
app.get('/api/thriller', dataController.getThriller)
app.get('/api/tv', dataController.getTV)
app.get('/api/popular2', dataController.getPopular2)
app.get('/api/browse/play/:id', dataController.getVideos)
app.get('/api/browse/genre/popular/:id', dataController.getGenrePopular)
app.get('/api/browse/genre/nineties/:id', dataController.getGenre90s)
app.get('/api/browse/genre/2000s/:id', dataController.getGenre00s)
app.get('/api/browse/genre/trending/:id', dataController.getGenreTrendingNow)
app.get('/api/browse/genre/top/:id', dataController.getGenreTopPicks)
app.get('/api/browse/genre/box-office/:id', dataController.getBoxOfficeTop)
app.get('/api/browse/movie/:id', dataController.getMovieDetails)
app.get('/api/browse/movie/cast/:id', dataController.getStars)
app.get('/api/lala', dataController.getLala)
app.get('/api/guardians', dataController.getGuardians)
app.get('/api/browse/results/', dataController.getResults)

//get external API
app.get('/auth/user', authCtrl.getUser);
app.get('/api/mylist', listController.getList)

//post to DB
app.post('/auth/register', authCtrl.register);
app.post('/auth/login', authCtrl.login);
app.post('/auth/logout', authCtrl.logout);
app.post('/api/mylist', listController.addToList)

//delete from DB
app.delete('/api/delete/:id', listController.deleteFromList)

//put to DB
app.put('/auth/account/:username', authCtrl.updateUsername)



app.listen(SERVER_PORT, () => {
    console.log(`The server is listening on Port ${SERVER_PORT}`)
})