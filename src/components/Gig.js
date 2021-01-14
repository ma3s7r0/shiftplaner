import { Box, Card, Paper } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import mapStateToProps from '../reducers/tools/mapStateToProps';
import convertDate from './tools/convertDate';

function Gig(props) {

    const actGig = props.gigs[props.gigId]
    const gun = (userId) => userId !== "" && typeof userId !== "undefined" && props.users.find(user => user.id === userId).name

    return (
      <Card key={props.gigs[props.gigId].id} elevation={17}>
          <center><h3>{actGig.title} am {convertDate(actGig.start).toLocaleTimeString()}</h3></center>
          <table>
            <thead>
              <tr>
                <th>Schichtstart</th>
                <th>Schichttyp</th>
                <th>ausgew. Mitarbeiter</th>
                <th>verf. Mitarbeiter</th>
              </tr>
            </thead>  
            <tbody>
                {actGig.shifts.map((shift, shiftIndex) => (
                  <tr>
                    <td>+{shift.start}</td>
                    <td>{shift.shiftType}</td>
                    <td>{gun(shift.selUserId)}</td>
                    <td>{shift.availUserId.map(userId =>                 
                      <tr>
                        <td>{gun(userId)}</td>
                      </tr>)}
                    </td>
                    <td><input type='checkbox' 
                      disabled={shift.selUserId === props.actUser.id} 
                      onClick={(e) => props.changeShift(props.gigId, shiftIndex, e.target.checked)                      }
                      defaultChecked={shift.availUserId.includes(props.actUser.id)}
                      /></td>
                 </tr>
                  )
                )}
            </tbody>
          </table>  
        </Card>
    );
}

function mapDispatchToProps(dispatch, props) {
  return {
    ...props,
    changeShift: (gigId, shiftIndex, checked) => {
      dispatch( { type: "CHANGE_SHIFT", gigId: gigId, shiftIndex: shiftIndex, checked: checked} )
    }
  }

}

export default connect(mapStateToProps, mapDispatchToProps) (Gig);