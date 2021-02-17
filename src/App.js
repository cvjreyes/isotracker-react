import './App.css';
import IsoCtrl from './pages/isoCtrl/isoCtrl';
import Cover from './pages/cover/cover';
import { Switch, Route} from 'react-router-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import Home from './pages/home/home';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={IsoCtrl}></Route>
          <Route exact path="/home" component={Home}></Route>
          <Route exact path="/cover" component={Cover}></Route>
        </Switch>
      </Router>
  
    </div>
  );
}

export default App;
