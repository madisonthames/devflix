import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Browse from './components/Browse/Browse';
import Payment from './components/Payment/Payment';
import Movies from './components/Movies/Movies';
import Video from './components/Video/Video';
import Genre from './components/Genre/Genre';
import Account from './components/Account/Account';
import MyList from './components/MyList/MyList';
import Search from './components/Search/Search';


export default (
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/auth/login' exact component={Login}/>
        <Route path='/auth/register' component={Register}/>
        <Route path='/payment' component={Payment}/>
        <Route path='/browse' exact component={Browse}/>
        <Route path='/browse/genre/all' exact component={Movies}/>
        <Route path='/browse/play/:id' exact component={Video} />
        <Route path='/browse/genre/:id' exact component={Genre}/>
        <Route path='/account' component={Account}/>
        <Route path='/browse/my-list' exact component={MyList}/>
        <Route path='/browse/results/:input' exact component={Search}/>
    </Switch>
)