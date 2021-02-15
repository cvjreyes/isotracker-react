import './App.css';
import IsoCtrl from './pages/isoCtrl/isoCtrl';



function App() {
  return (
    <div className="App">
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
