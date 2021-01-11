import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Profile from './components/Profile';
import mapStateToProps from './reducers/tools/mapStateToProps';

function App(props) {

  if(!props.isLoggedIn) {
    return <Login />
  }

  return (    
    <div className="App">
       <h1>ShiftPlaner</h1>
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <Dashboard />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>

  );
}

function mapDispatchToProps(dispatch) {
  return {
  }

}

export default connect(mapStateToProps, mapDispatchToProps) (App);
