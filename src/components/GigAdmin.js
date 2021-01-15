import { Button, FormControlLabel, FormGroup, makeStyles, MenuItem, Radio, RadioGroup, Select, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStateToProps from '../reducers/tools/mapStateToProps';
import SaveIcon from '@material-ui/icons/Save';
import { setGig } from '../reducers/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: theme.spacing(2),
    '& .MuiTextField-root': {
      margin: theme.spacing(2),

    }
  },
  button: {
    margin: theme.spacing(2),
},
}));



function Gig(props) {
  const classes = useStyles();
  const [actGig, setActGig] = useState(props.gigs[props.gigId])
  const [actShift, setActShift] = useState("0")
  const gun = (userId) => userId !== "" && typeof userId !== "undefined" && props.users.find(user => user.id === userId).name

  function handleInput(event) {
    setActGig(prevData => {
      return {
        ...prevData,
        [event.target.name]: event.target.value
      }
    }
    )
  }

  function handleShiftInput(event) {
    let newShifts = [...actGig.shifts]
    let oldShift = { ...actGig.shifts[actShift] }
    console.log(oldShift)
    newShifts[actShift] = { ...oldShift, [event.target.name]: event.target.value }
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
    props.onSetGig(actGig)
    props.closePopover()
  }

  function resetForm(event) {
    event.preventDefault()
    setActGig(props.gigs[props.gigId])
  }

  return (
    <form onSubmit={e => submitForm(e)} onReset={e => resetForm(e)} noValidate autoComplete="off" className={classes.root}>
      <FormGroup column>
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
            //shrink: true,
          }}
          variant="outlined"
        />
        <Select variant="outlined" label="Shicht" value={actShift} onChange={e => setActShift(e.target.value)}>
          {actGig.shifts.map((shift, index) => <MenuItem value={index}>{shift.shiftType}</MenuItem>)}
        </Select>
        <FormGroup row label="Schicht">
          <TextField variant="outlined" label="Schichstart" value={actGig.shifts[actShift].start} onChange={e => handleShiftInput(e)} name={"start"} />
          <RadioGroup aria-label="Mitarbeiter" name="selUserId" value={actGig.shifts[actShift].selUserId} onChange={e => handleShiftInput(e)}>
            {actGig.shifts[actShift].availUserId.map((userId) =>
              <FormControlLabel value={userId} control={<Radio />} label={gun(userId)} checked={userId === actGig.shifts[actShift].selUserId} name="selUserId" />
            )}
          </RadioGroup>
        </FormGroup>
        <FormGroup row>
          <Button startIcon={<SaveIcon />} className={classes.button} type="submit" variant="contained" color="primary">Ändern</Button>
          <Button type="reset" variant="contained" color="secondary" className={classes.button}>Reset</Button>
        </FormGroup>
      </FormGroup>
    </form>



  );
}

function mapDispatchToProps(dispatch, props) {
  return {
    ...props,
    onSetGig: (actGig) => dispatch(setGig(actGig))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Gig);