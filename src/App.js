import { Button, makeStyles, Menu, MenuItem } from '@material-ui/core';
import { useState } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Link, NavLink, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Admin from './components/Admin';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Profile from './components/Profile';
import mapStateToProps from './reducers/tools/mapStateToProps';

const useStyles = makeStyles((theme) => ({
  root: {
        margin: theme.spacing(2),
  }      
  }));



function App(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  if (!props.isLoggedIn) {  
    return <div className={`App ${classes.root}`}><h1>ShiftPlaner</h1><br /><Login /></div>
  }

  return (
    <div className={`App ${classes.root}`}>
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
        <NavLink to="/"><MenuItem onClick={handleClose}>Home</MenuItem></NavLink>
        <NavLink to="/profile"><MenuItem onClick={handleClose}>Profile</MenuItem></NavLink>
        {props.actUser.groups.includes("admin") && <NavLink to="/admin"><MenuItem onClick={handleClose}>Admin</MenuItem></NavLink>}
        <Link to="/logout"><MenuItem onClick={handleClose}>Log out</MenuItem></Link>

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
