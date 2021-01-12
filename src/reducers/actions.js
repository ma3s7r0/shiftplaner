import actionTypes from './actionTypes';

  export const logIn = (user) => {
    return (dispatch, getState) => {
        let {users} = getState()
        let foundUser = users.find(u => u.name === user)
        let success = (typeof foundUser !== 'undefined')
        dispatch( { type: actionTypes.LOGIN, success: success,  user: foundUser} ) }     
  };