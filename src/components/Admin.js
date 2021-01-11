import MaterialTable from 'material-table';
import React from 'react';
import { connect } from 'react-redux';
import mapStateToProps from '../reducers/tools/mapStateToProps';

function Admin(props) {

    if (!props.actUser.groups.includes("admin")) {
        return `User ${props.actUser.name} is not member of the admin group.`
    }
    return (
        <div style={{ maxWidth: '100%' }}>
        <MaterialTable
          columns={[
            { title: 'Username', field: 'name' },
            { title: 'Phone', field: 'phone', type: 'numeric' },
            { title: 'eMail', field: 'eMail'}
          ]}
          data={props.users}
          title="Demo Title"
        />
        </div>
    );
}

export default connect(mapStateToProps) (Admin);