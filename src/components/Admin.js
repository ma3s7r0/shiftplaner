import React from 'react';
import { connect } from 'react-redux';
import mapStateToProps from '../reducers/tools/mapStateToProps';

function Admin(props) {

    if (!props.actUser.groups.includes("admin")) {
        return `User ${props.actUser.name} is not member of the admin group.`
    }
    return (
        <div>
            
        </div>
    );
}

export default connect(mapStateToProps) (Admin);