import './App.css';
import IsoCtrl from './pages/isoCtrl/isoCtrl';
import Welcome from './pages/welcome/welcome';
import { Switch, Route} from 'react-router-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import Home from './pages/home/home';
import Register from './pages/register/register';
import LoginPage from './pages/loginPage/loginPage';
import { UserContext } from './components/userContext/userContext';
import {useState, useMemo, useEffect} from "react";

var prevRoles = "vacio";

function App() {

  const [roles, setRoles] = useState();
  const value = useMemo(()=> ({roles, setRoles}), [roles, setRoles]);

  return (
    <div className="App">
      <Router>
        <Switch>
          <UserContext.Provider value ={value}>
            <Route exact path="/" component={IsoCtrl}></Route>
            <Route exact path="/home" component={Home}></Route>
            <Route exact path="/welcome" component={Welcome}></Route>
            <Route exact path="/register" component={Register}></Route>
            <Route exact path="/login" component={LoginPage}></Route>
          </UserContext.Provider>
        </Switch>
      </Router>
  
    </div>
  );
}

export default App;
