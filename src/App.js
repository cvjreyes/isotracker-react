import './App.css';
import IsoCtrl from './pages/isoCtrl/isoCtrl';
import Welcome from './pages/welcome/welcome';
import { Switch, Route} from 'react-router-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import Home from './pages/home/home';
import Register from './pages/register/register';
import Login from './pages/login/login';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={IsoCtrl}></Route>
          <Route exact path="/home" component={Home}></Route>
          <Route exact path="/welcome" component={Welcome}></Route>
          <Route exact path="/register" component={Register}></Route>
          <Route exact path="/login" component={Login}></Route>
        </Switch>
      </Router>
  
    </div>
  );
}

export default App;
