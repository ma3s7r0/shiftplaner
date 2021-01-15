import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, makeStyles, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStateToProps from '../reducers/tools/mapStateToProps';
import SaveIcon from '@material-ui/icons/Save';
import { setUser } from '../reducers/actions';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(2),
        width: '25ch',
      },
    },
    button: {
        margin: theme.spacing(2),
    },
    container: {
        margin: theme.spacing(2),
    }      
    }));


function Profile(props) {
    
    //if a userToEdit is passed via props, the on is used, anytime else the actual user
    const [formData, setFormData] = useState(props.userToEdit||{...props.actUser})
    const [isAdmin, setIsAdmin] = useState(formData.groups.includes('admin'))
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
        console.log(isAdmin)
        let newGroups = new Set([...formData.groups])
        newGroups = isAdmin ? newGroups.add('admin') : [...formData.groups].filter(group => group !== 'admin')
        let newUser = {...formData, groups: [...newGroups]}
        console.log(newGroups)
        // only set new record if name not empty and not already existing
        if (formData.name !== "" && typeof formData.name !== 'undefined' && !props.users.find(user => user.name === formData.name && user.id !== formData.id)) {
            setError(false)
            props.onSetUserData(newUser)
            typeof props.closePopover !== 'undefined' && props.closePopover()
         } else {setError(true)};
    }

    function resetForm(event) {
        event.preventDefault()
        setFormData(props.userToEdit||props.actUser)
    }

    return (
        <div className={classes.container}>
            <h2>Profil</h2>
            <form onSubmit={e => submitForm(e)} onReset={e => resetForm(e)} className={classes.root} noValidate autoComplete="off">
                <FormControl component="fieldset">
                    <FormGroup column>
                        {error ? 
                        <TextField error variant="outlined" label="Username" value={formData.name} onChange={e => handleInput(e)} name={"name"} helperText="Username is empty or already in use" /> 
                        : <TextField variant="outlined" label="Username" value={formData.name} onChange={e => handleInput(e)} name={"name"}/>}
                        <br /><TextField  variant="outlined" label="Phone" value={formData.phone} onChange={e => handleInput(e)} name={"phone"}/>
                        <br /><TextField  variant="outlined" label="eMail" value={formData.eMail} onChange={e => handleInput(e)} name={"eMail"}/>
                        { typeof props.userToEdit !== 'undefined' &&  <><br /><FormControlLabel classeName={classes.checkbox} control={<Checkbox variant="outlined" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} name={"isAdmin"}/>} label="Admin" /></>}
                        <br />
                        <FormGroup row>
                            <Button startIcon={<SaveIcon />} className={classes.button} type="submit" variant="contained" color="primary">Ändern</Button>
                            <Button type="reset" variant="contained" color="secondary" className={classes.button}>Reset</Button>
                        </FormGroup>
                    </FormGroup>
                </FormControl>
            </form>
        </div>
    );
}
function mapDispatchToProps(dispatch, props) {
    return {
        ...props,
        onSetUserData: (newUser) => dispatch(setUser(newUser))
    }

}

export default connect(mapStateToProps, mapDispatchToProps) (Profile);