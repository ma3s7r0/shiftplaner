import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStateToProps from '../reducers/tools/mapStateToProps';

function Profile(props) {

    const [formData, setFormData] = useState({...props.actUser})


    function handleInput(event) {
        setFormData( prevData => {return {
            ...prevData,
            [event.target.name]: event.target.value
        }}
        )
    }

    function submitForm(event) {
        event.preventDefault()
        props.setUserData(formData)
    }

    function resetForm(event) {
        event.preventDefault()
        setFormData(props.actUser)
    }

    return (
        <div>
            {console.log("actUser: ", props.actUser)}
            {console.log("user in state:", props.users)}
            <h2>Profile</h2>
            <form onChange={e => handleInput(e)} onSubmit={e => submitForm(e)} onReset={e => resetForm(e)}>
                <label>Username
                <input type="text" value={formData.name} name="name"></input>
                </label>
                <label>Phone
                <input type="text" value={formData.phone} name="phone"></input>
                </label>
                <label>eMail
                <input type="text" value={formData.eMail} name="eMail"></input>
                </label>
                <button type="submit">Ändern</button><button type="reset">Reset</button>
            </form>
        </div>
    );
}
function mapDispatchToProps(dispatch, props) {
    return {
        ...props,
        setUserData: (newUserData) => dispatch( {type: "SET_USER_DATA", newUserData: newUserData})
    }

}

export default connect(mapStateToProps, mapDispatchToProps) (Profile);