import React from 'react';
import { connect } from 'react-redux';
import mapStateToProps from '../reducers/tools/mapStateToProps';

function Gig(props) {

    const actGig = props.gigs[props.gigId]

    return (
        <div className='GigWrapper' key={props.gigs[props.gigId]}>
          <h3>{actGig.title} am {actGig.start.toLocaleTimeString()}</h3>
          <table>
            <thead>
              <tr>
                <th>Schichtstart</th>
                <th>Schichttyp</th>
                <th>Mitarbeiter</th>
              </tr>
            </thead>  
            <tbody>
                {actGig.shifts.map((shift, shiftIndex) => (
                  <tr>
                    <td>+{shift.start}</td>
                    <td>{shift.shiftType}</td>
                    <td>{shift.userId !== "" && props.users.find(u => u.id === shift.userId).name}</td>
                    <td><input type='checkbox' 
                      disabled={!(shift.userId ==="" || shift.userId === props.actUser.id)} 
                      onClick={(e) => props.changeShift(props.gigId, shiftIndex, e.target.checked)                      }
                      defaultChecked={shift.userId === props.actUser.id}
                      /></td>
                 </tr>
                  )
                )}
            </tbody>
          </table>  
        </div>
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