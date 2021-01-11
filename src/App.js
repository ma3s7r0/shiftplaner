import { Button, Menu, MenuItem } from '@material-ui/core';
import { useState } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Admin from './components/Admin';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Profile from './components/Profile';
import mapStateToProps from './reducers/tools/mapStateToProps';

function App(props) {

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  if (!props.isLoggedIn) {
    return <Login />
  }

  return (
    <div className="App">
      <h1>ShiftPlaner</h1>

      <BrowserRouter>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} name="profileLink">
        {props.actUser.name}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}><Link to="/profile">Profile</Link></MenuItem>
        <MenuItem onClick={handleClose}><Link to="/logout">Log out</Link></MenuItem>
      </Menu>

        {/* <Link to="/profile"><div class="profileLink">Profile</div></Link> */}
        <Switch>
          <Route path="/" exact>
            <Dashboard />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/logout" render={() => {
            props.logout()
            return <Redirect to="/"/>
            }
          }/>
            

        </Switch>
      </BrowserRouter>
    </div>

  );
}



function mapDispatchToProps(dispatch, props) {
  return {
    ...props,
    logout: () => dispatch( { type: "LOGOUT" } )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
