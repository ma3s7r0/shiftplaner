import { Box, Button, Card, FormControlLabel, makeStyles, MenuItem, Paper, Radio, RadioGroup, Select, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import actionTypes from '../reducers/actionTypes';
import mapStateToProps from '../reducers/tools/mapStateToProps';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: theme.spacing(2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));



function Gig(props) {
  const classes = useStyles();
  const [actGig, setActGig] = useState(props.gigs[props.gigId])
  const [actShift, setActShift] = useState("0")
  const [selUser, setSelUser] = useState("0")
  const gun = (userId) => userId !== "" && typeof userId !== "undefined" && props.users.find(user => user.id === userId).name

  useEffect(() => setSelUser(actGig.shifts[actShift].selUserId), [actGig.shifts, actShift])
    
  function handleInput(event) {
    setActGig(prevData => {
      return {
        ...prevData,
        [event.target.name]: event.target.value
      }
    }
    )
  }

  const getUserIndex = (userId) => actGig.shifts[actShift].availUserId.indexOf(userId)

  function handleShiftInput(event) {
    setActGig(prevData => {
      return {
        ...prevData,       
        shifts: [
          ...prevData.shifts,
          {
            ...prevData.shifts[actShift],
            [event.target.name]: event.target.value
          }
        ]
      }
    }
    )
  }

  function handleRadio(event) {
    let newShifts = [...actGig.shifts]
    let oldShift = {...actGig.shifts[actShift]}
    console.log(oldShift)
    newShifts[actShift] = {...oldShift, selUserId: event.target.value}
    console.log(...newShifts)
    setActGig(prevData => {
      return {
        ...prevData,       
        shifts: [...newShifts]
      }
    }
    )
  }

  function submitForm(event) {
      event.preventDefault()
      props.setGig(actGig)
      props.closePopover()          
  }

  function resetForm(event) {
    event.preventDefault()
    setActGig(props.gigs[props.gigId])
  }

  return (
    <form onSubmit={e => submitForm(e)} onReset={e => resetForm(e)} noValidate autoComplete="off" className={classes.container}>   
      <TextField variant="outlined" label="Titel" value={actGig.title} onChange={e => handleInput(e)} name={"title"} />
      <TextField
        id="datetime-local"
        label="Next appointment"
        type="datetime-local"
        value={actGig.start}
        onChange={handleInput}
        name={"start"}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Select variant="outlined" label="Shicht" value={actShift} onChange={e => setActShift(e.target.value)}>
        {actGig.shifts.map((shift, index) => <MenuItem value={index}>{shift.shiftType}</MenuItem> )}
      </Select>
      <TextField variant="outlined" label="Schichstart" value={actGig.shifts[actShift].start} onChange={e => handleShiftInput(e)} name={"start"}/>
      <RadioGroup aria-label="Mitarbeiter" name="selUserId" value={actGig.shifts[actShift].selUserId} onChange={e => handleRadio(e)}>
        {actGig.shifts[actShift].availUserId.map((userId) => 
        <FormControlLabel value={userId} control={<Radio />} label={gun(userId)} checked={userId === actGig.shifts[actShift].selUserId} />
        )}
      </RadioGroup>
      
      {/* {actGig.shifts[actShift].availUserId.map((userId, index) => (
      <Radio
        checked={userId === actGig.shifts[actShift].selUserId}
        onChange={e => handleRadio(e)}
        value={actGig.shifts[actShift].selUserId}
        name={userId}
        label={gun(userId)}
        inputProps={{ 'aria-label': 'A' }}
      />
      ))} */}
      <Button type="submit">Ändern</Button><Button type="reset">Reset</Button>
    </form>



  );
}

function mapDispatchToProps(dispatch, props) {
  return {
    ...props,
    setGig: (actGig) => dispatch( {type: actionTypes.SET_GIGS, editedGig: actGig})
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Gig);