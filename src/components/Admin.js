import { makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import mapStateToProps from '../reducers/tools/mapStateToProps';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


function Admin(props) {

  const classes = useStyles();

  if (!props.actUser.groups.includes("admin")) {
    return `User ${props.actUser.name} is not member of the admin group.`
  }
  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="User">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">eMail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.users.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.phone}</TableCell>
                <TableCell align="right">{row.eMail}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="Gigs">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Veranstaltungs-Name</TableCell>
              <TableCell align="right">Start-Zeitpunkt</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.gigs.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="right">{row.title}</TableCell>
                <TableCell align="right">{row.start.toLocaleString()}</TableCell>
                <TableCell align="right">{row.shifts.map(shift => 
                  <TableRow align="right">
                   {shift.toString()}
                  </TableRow>)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>);
}


export default connect(mapStateToProps)(Admin);