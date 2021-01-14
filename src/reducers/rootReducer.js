import actionTypes from "./actionTypes"
/* eslint-disable default-case */
const initState = {
    actUser: {},
    token: {},
    isLoggedIn: false,
    logInSuccess: true,
    users: [{
        id: "1",
        name: "paul",
        phone: "046548",
        eMail: "me@you.we",
        groups: ["admin", "users"]
    },
    {
        id: "2",
        name: "ingrid",
        phone: "6488431",
        eMail: "superman@batman.spider",
        groups: ["users"]
    },
    {
        id: "3",
        name: "Ewald",
        phone: "4554654",
        eMail: "ewald@elektrischerwald.de",
        groups: ["users"]
    }],
    gigs: []
}

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN:
            return { ...state, actUser: action.user, isLoggedIn: action.success, logInSuccess: action.success };
        case actionTypes.SET_USER_DATA:
            console.log(action)
            let editedUsers = [...state.users]
            let foundUser = editedUsers.findIndex(user => user.id === action.payload.id)
            if (foundUser === -1) { editedUsers.push(action.payload) } else { editedUsers[foundUser] = action.payload }
            let newState = state.actUser.id === action.payload.id ?
                {
                    ...state,
                    actUser: { ...state.actUser, ...action.payload },
                    users: editedUsers
                } : {
                    ...state,
                    users: editedUsers
                }
            return newState;

        case actionTypes.SET_GIG:
            let editedGigs = [...state.gigs]
            let foundGig = editedGigs.findIndex(gig => gig.id === action.editedGig.id)
            if (foundGig === -1) { editedGigs.push(action.editedGig) } else { editedGigs[foundGig] = action.editedGig }
            return {
                ...state,
                gigs: [...editedGigs]
            }

        case actionTypes.SET_GIGS:
            console.log(action)
            return {
                ...state,
                gigs: action.payload
            }
        case actionTypes.SET_USERS:
            return {
                ...state,
                users: action.payload
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                actUser: {},
                isLoggedIn: false,
                loginSuccess: true
            }
    }
    return state
}

export default rootReducer;