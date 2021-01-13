import { makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Popover } from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStateToProps from '../reducers/tools/mapStateToProps';
import Gig from './Gig';
import GigAdmin from './GigAdmin';

const useStyles = makeStyles({
  table: {

    width: 'auto'
  },
  tableContainer: {
    width: 'auto',
    tableLayout: 'auto'
  }
});


function Admin(props) {

  const [anchorEl, setAnchorEl] = useState(null);
  const [actGigId, setActGigId] = useState(0);

  const handleClick = (event, index) => {
    setActGigId(index)
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const classes = useStyles();
  //GetUserName from id
  const gun = (userId) => userId !== "" && typeof userId !== "undefined" && props.users.find(user => user.id === userId).name

  if (!props.actUser.groups.includes("admin")) {
    return `User ${props.actUser.name} is not member of the admin group.`
  }
  return (
    <>
      <h3>Users</h3>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="User" fixedHeader={false}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>eMail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.users.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.eMail}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <h3>Gigs</h3>
      <TableContainer component={Paper} >
        <Table className={classes.table} aria-label="Gigs" fixedHeader={false} >
          <TableHead>
            <TableRow>

              <TableCell>Veranstaltungs-Name</TableCell>
              <TableCell>Doors Open</TableCell>
              <TableCell>
                <TableCell>Schichttyp</TableCell>
                <TableCell>Start-Zeitpunkt</TableCell>
                <TableCell>Zugewiesener MA</TableCell>
                <TableCell>Verfügbare MA</TableCell>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.gigs.map((row, index) => (
              <TableRow key={row.id} onClick={(event) => handleClick(event, index)}>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.start.toLocaleString()}</TableCell>
                <TableCell>{row.shifts.map(shift =>
                  <TableRow >
                    <TableCell>{shift.shiftType}</TableCell>
                    <TableCell>{shift.start}</TableCell>
                    <TableCell>{gun(shift.selUserId)}</TableCell>
                    <TableCell>{shift.availUserId.map(userId =>
                      <TableRow>
                        <TableCell>{gun(userId)}</TableCell>
                      </TableRow>)}
                    </TableCell>
                  </TableRow>)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
      >
        <GigAdmin gigId={actGigId} closePopover={handleClose} />
      </Popover>
    </>);
}


export default connect(mapStateToProps)(Admin);