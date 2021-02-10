import './App.css';
import Header from './components/header/header';
import IsoCtrl from './pages/isoCtrl/isoCtrl';
import UploadFiles from './pages/uploadFiles/uploadFiles';
import NavBar from './components/navBar/navBar'
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import NotFound from './pages/notFound/notFound';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <IsoCtrl/>
      {/*}
      <Router>
        <Switch>
          <Route exact path="/" component={IsoCtrl}></Route>
          <Route exact path="/upload" component={UploadFiles}></Route>
          <Route exact path="/404" component={NotFound}></Route>
          <Redirect to="/404"/>
        </Switch>
      </Router>
      */}
    </div>
  );
}

export default App;
