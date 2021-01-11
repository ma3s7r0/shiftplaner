import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStateToProps from '../reducers/tools/mapStateToProps';


function Login(props) {
  const [username, setUserName] = useState();
  

    return (
        <form onSubmit={e => {
            e.preventDefault()
            props.logIn(username)
            console.log(props.actUser)
            }}>
            <label>
                <p>Username</p>
                <input type="text" onChange={e => setUserName(e.target.value)}/>
            </label>
{/*             <label>
                <p>Password</p>
                <input type="password" onChange={e => setPassword(e.target.value)}/>
            </label> */}
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    );
}


function mapDispatchToProps(dispatch, props) {
    return {
        ...props,
        logIn: (user) => {
			dispatch( { type: "LOGIN", user: user} )
		}
    }
  
  }
  

export default connect(mapStateToProps, mapDispatchToProps) (Login);