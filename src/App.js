import './App.css';
import IsoCtrl from './pages/isoCtrl/isoCtrl';
import NavBar from './components/navBar/navBar'



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
