import { Box, Button, makeStyles, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { logIn } from '../reducers/actions';
import mapStateToProps from '../reducers/tools/mapStateToProps';


const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
        align: 'center'
      },
    },
  }));


function Login(props) {
  const [username, setUserName] = useState();
  const classes = useStyles(); 
  

    return (
    <Box className="loginWrapper">       
        <form className={classes.root} noValidate autoComplete="off" onSubmit={e => {
            e.preventDefault()
            props.onLogin(username)
            }}>
            {props.logInSuccess ?
                <TextField label="Username"  variant="outlined" onChange={e => setUserName(e.target.value)}/> :
                <TextField label="Username" error  variant="outlined" onChange={e => setUserName(e.target.value)} helperText="Username not found"/>
            }
{/*             <label>
                <p>Password</p>
                <input type="password" onChange={e => setPassword(e.target.value)}/>
            </label> */}
            <br></br><Button type="submit" variant="contained">Submit</Button>
        </form>
    </Box>
    );
}


function mapDispatchToProps(dispatch, props) {
    return {
        ...props,
        onLogin: username => {dispatch(logIn(username))}
		}
    }
  
  

export default connect(mapStateToProps, mapDispatchToProps) (Login);