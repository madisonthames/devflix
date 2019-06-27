import React, {Component} from 'react';
import './_app.scss'
import './reset.css'
import routes from './routes';
import Login from './components/Login/Login';


class App extends Component {
  render() {
    return (
      <div>
        {routes}
      </div>
    );
  }
}

export default App;
