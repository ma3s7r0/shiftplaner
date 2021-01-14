import { Button, makeStyles, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import actionTypes from '../reducers/actionTypes';
import mapStateToProps from '../reducers/tools/mapStateToProps';

function Profile(props) {

    const useStyles = makeStyles((theme) => ({
        root: {
          '& .MuiTextField-root': {
            margin: theme.spacing(2),
            width: '25ch',
          },
        },
      }));
    
    //if a userToEdit is passed via props, the on is used, anytime else the actual user
    const [formData, setFormData] = useState(props.userToEdit||{...props.actUser})
    const [error, setError] = useState(false)
    const classes = useStyles();


    function handleInput(event) {

        setFormData( prevData => {return {
            ...prevData,
            [event.target.name]: event.target.value
        }}
        )
    }

    function submitForm(event) {
        event.preventDefault()
        if (formData.name !== "" || typeof formData.name === 'undefined') {
            setError(false)
            props.setUserData(formData)
            typeof props.closePopover !== 'undefined' && props.closePopover()
         } else {setError(true)};
    }

    function resetForm(event) {
        event.preventDefault()
        setFormData(props.userToEdit||props.actUser)
    }

    return (
        <div>
            <h2>Profile</h2>
            <form onSubmit={e => submitForm(e)} onReset={e => resetForm(e)} className={classes.root} noValidate autoComplete="off">
                {error ? 
                <TextField error variant="outlined" label="Username" value={formData.name} onChange={e => handleInput(e)} name={"name"} helperText="Empty username is restricted" /> 
                : <TextField variant="outlined" label="Username" value={formData.name} onChange={e => handleInput(e)} name={"name"}/>}
                <TextField  variant="outlined" label="Phone" value={formData.phone} onChange={e => handleInput(e)} name={"phone"}/>
                <TextField  variant="outlined" label="eMail" value={formData.eMail} onChange={e => handleInput(e)} name={"eMail"}/>
                <Button type="submit">Ändern</Button><Button type="reset">Reset</Button>
            </form>
        </div>
    );
}
function mapDispatchToProps(dispatch, props) {
    return {
        ...props,
        setUserData: (newUserData) => dispatch( {type: actionTypes.SET_USER_DATA, newUserData: newUserData})
    }

}

export default connect(mapStateToProps, mapDispatchToProps) (Profile);