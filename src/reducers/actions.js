import axios from 'axios';
import config from '../config.json';
import actionTypes from './actionTypes';


const baseURL = `http://${config.server}:${config.port}`

export const logIn = (user) => {
    return (dispatch, getState) => {
        let { users } = getState()
        let foundUser = users.find(u => u.name === user)
        let success = (typeof foundUser !== 'undefined')
        dispatch({ type: actionTypes.LOGIN, success: success, user: foundUser })
    }
};

export const setGig = (newGig) => {
    return (dispatch) => {
        if (typeof newGig.id === 'undefined') {
            axios.post(`${baseURL}/gigs`, newGig)
                .then(res => {
                    dispatch({ type: actionTypes.SET_GIG, editedGig: res.data })
                })
                .catch((error) => {
                    console.log(error)
                })
        } else {
            const gigId = newGig.id
            axios.put(`${baseURL}/gigs/${gigId}`, newGig)
                .then(res => {
                    dispatch({ type: actionTypes.SET_GIG, editedGig: res.data })
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
};

export const setShift = (gigId, shiftIndex, checked) => {
    return (dispatch, getState) => {
    const prevState = getState()
    let newGig= prevState.gigs[gigId]
    if (checked) {
        newGig.shifts[shiftIndex].availUserId.push(prevState.actUser.id)
    } else { newGig.shifts[shiftIndex].availUserId = newGig.shifts[shiftIndex].availUserId.filter(userId => userId !== prevState.actUser.id) }
    dispatch(setGig(newGig))
    }
};

export const setUser = (newUser) => {
    return (dispatch) => {
        if (typeof newUser.id === 'undefined') {
            axios.post(`${baseURL}/users`, newUser)
                .then(res => {
                    dispatch({ type: actionTypes.SET_USER_DATA, payload: res.data })
                })
                .catch((error) => {
                    console.log(error)
                })
        } else {
            const userId = newUser.id
            axios.put(`${baseURL}/users/${userId}`, newUser)
                .then(res => {
                    dispatch({ type: actionTypes.SET_USER_DATA, payload: res.data })
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
};

export const loadGigs = () => {
    return (dispatch) => {
        axios.get(`${baseURL}/gigs`,)
            .then(res => {
                dispatch({ type: actionTypes.SET_GIGS, payload: res.data })
            })
            .catch((error) => {
                console.log(error)
            })

    }
};

export const loadUsers = () => {
    return (dispatch) => {
        axios.get(`${baseURL}/users`,)
            .then(res => {
                dispatch({ type: actionTypes.SET_USERS, payload: res.data })
            })
            .catch((error) => {
                console.log(error)
            })

    }
};