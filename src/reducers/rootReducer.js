/* eslint-disable default-case */
const initState = {
    user : "",
    password : "",
    token : {},
    isLoggedIn : false,
    users: [],
    events: []
}

const rootReducer = (state = initState, action) => {
    switch(action.type) {
        case "LOGIN":
        return {
            // TODO: add async server request for authentication
            ...state,
            user: action.user,
            password: action.password,
            isLoggedIn : true 
        }

    }
    return state
}

export default rootReducer