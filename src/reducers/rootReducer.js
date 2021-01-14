import actionTypes from "./actionTypes"
/* eslint-disable default-case */
const initState = {
    actUser : {},
    token : {},
    isLoggedIn : false,
    logInSuccess : true,
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
    gigs: [{
        id: "1",
        title: "Blockflöten Rhapsodie",
        start: "2021-12-17T02:30:00.000",
        shifts: [
            {shiftType: "Kasse", selUserId: "1", availUserId: ["1", "2"], start:"00:30"},
            {shiftType: "Einlass", selUserId: "3", availUserId: ["3", "2"], start:"01:00"},
            {shiftType: "Theke1", selUserId: "2", availUserId: ["1", "2"], start:"01:00"},
            {shiftType: "Theke2", selUserId: "3", availUserId: ["1", "3"], start:"01:00"}
        ]
    }, {
        id: "2",
        title: "Blockflöten Rhapsodie Teil 2",
        start: "2021-12-18T03:30:00.000",
        shifts: [
            {shiftType: "Kasse", selUserId: "1", availUserId: ["1", "2"], start:"00:30"},
            {shiftType: "Theke1", selUserId: "2", availUserId: ["1", "2"], start:"01:00"},
            {shiftType: "Theke2", selUserId: "", availUserId: ["1", "3"], start:"01:00"}
        ]
    },{
        id: "3",
        title: "Tief im Flügel klebt ein Kaugummi",
        start: "2021-12-16T04:00:00.000",
        shifts: [
            {shiftType: "Kasse", selUserId: "3", availUserId: ["1", "2"], start:"00:15"},
            {shiftType: "Theke1", selUserId: "", availUserId: ["3", "2"], start:"00:45"},
            {shiftType: "Theke2", selUserId: "2", availUserId: ["1", "2"], start:"00:45"}
        ]
    },{
        id: "4",
        title: "Füße an der Decke",
        start: "2021-12-12T07:15:00.000",
        shifts: [
            {shiftType: "Kasse", selUserId: "", availUserId: [], start:"00:30"},
            {shiftType: "Theke1", selUserId: "", availUserId: [], start:"01:00"},
            {shiftType: "Theke2", selUserId: "", availUserId: ["1"], start:"01:00"}
        ]
    }]
}

const rootReducer = (state = initState, action) => {
    switch(action.type) {
        case actionTypes.LOGIN:
            return {...state, actUser: action.user, isLoggedIn : action.success, logInSuccess: action.success};
        case actionTypes.CHANGE_SHIFT: 
            let newGigs = [...state.gigs]
            if (action.checked) {
                newGigs[action.gigId].shifts[action.shiftIndex].availUserId.push(state.actUser.id)
            } else {newGigs[action.gigId].shifts[action.shiftIndex].availUserId = newGigs[action.gigId].shifts[action.shiftIndex].availUserId.filter(userId => userId !== state.actUser.id)}          
            return {
            ...state,
            gigs: [...newGigs]
            };
        case actionTypes.SET_USER_DATA :
            let newUsers = [...state.users].map(user => user.id === action.newUserData.id ? user = {...user, ...action.newUserData} : user)           
            let newState = state.actUser.id === action.newUserData.id ?
            {
                ...state,
                actUser: {...state.actUser, ...action.newUserData},
                users: newUsers
            } : {
                ...state,
                users: newUsers
            }
            return newState
        case actionTypes.SET_GIGS :
            let editedGigs = [...state.gigs].map((gig, index) => {
                return gig.id === action.editedGig.id ? action.editedGig : gig
            })
            return {
                ...state,
                gigs: [...editedGigs]
            }
        case actionTypes.LOGOUT : 
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