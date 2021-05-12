import './App.css';
import IsoCtrl from './pages/isoCtrl/isoCtrl';
import Welcome from './pages/welcome/welcome';
import { Switch, Route} from 'react-router-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import Home from './pages/home/home';
import Register from './pages/register/register';
import LoginPage from './pages/loginPage/loginPage';
require('dotenv').config();



function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
            <Route exact path="/" component={Welcome}></Route>
            <Route exact path="/isotracker" component={IsoCtrl}></Route>
            <Route exact path="/register" component={Register}></Route>
            <Route exact path="/login" component={LoginPage}></Route>
        </Switch>
      </Router>
  
    </div>
  );
}

export default App;
