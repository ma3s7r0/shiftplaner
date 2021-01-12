import React from 'react';
import { connect } from 'react-redux';
import mapStateToProps from '../reducers/tools/mapStateToProps';
import GigSmall from '../components/GigSmall';


function Dashboard({gigs}) {
    return (
        <div>
            <h2>Gigs</h2>
            {gigs.map((ev, index) => <GigSmall gigId={index}/>)}
        </div>
    );
}

function mapDispatchToProps(dispatch, props) {
    return {
        ...props,
        logIn: (user, pw) => {
			dispatch( { type: "LOGIN", user: user, pw: pw } )
		}
    }
  
  }


export default connect(mapStateToProps, mapDispatchToProps) (Dashboard);