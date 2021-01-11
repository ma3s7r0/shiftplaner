/* eslint-disable default-case */
const initState = {
    actUser : {},
    token : {},
    isLoggedIn : false,
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
        start: new Date('December 17, 2021 03:30:00'),
        shifts: [
            {shiftType: "Kasse", userId: "1", start:"00:30"},
            {shiftType: "Theke1", userId: "2", start:"01:00"},
            {shiftType: "Theke2", userId: "3", start:"01:00"}
        ]
    }, {
        id: "2",
        title: "Blockflöten Rhapsodie Teil 2",
        start: new Date('December 18, 2021 03:30:00'),
        shifts: [
            {shiftType: "Kasse", userId: "1", start:"00:30"},
            {shiftType: "Theke1", userId: "2", start:"01:00"},
            {shiftType: "Theke2", userId: "", start:"01:00"}
        ]
    },{
        id: "3",
        title: "Tief im Flügel klebt ein Kaugummi",
        start: new Date('December 16, 2021 04:00:00'),
        shifts: [
            {shiftType: "Kasse", userId: "3", start:"00:15"},
            {shiftType: "Theke1", userId: "", start:"00:45"},
            {shiftType: "Theke2", userId: "2", start:"00:45"}
        ]
    },{
        id: "4",
        title: "Füße an der Decke",
        start: new Date('December 12, 2021 07:15:00'),
        shifts: [
            {shiftType: "Kasse", userId: "", start:"00:30"},
            {shiftType: "Theke1", userId: "", start:"01:00"},
            {shiftType: "Theke2", userId: "", start:"01:00"}
        ]
    }]
}

const rootReducer = (state = initState, action) => {
    switch(action.type) {
        case "LOGIN":            // TODO: add async server request for authentication
            let foundUser = state.users.find(u => u.name === action.user)
            console.log(foundUser)          
            let returnStatement = (typeof foundUser !== 'undefined') ? 
            {   ...state,
                actUser: foundUser,
                isLoggedIn : true } :
            {   ...state,
                isLoggedIn : false }
            return returnStatement;
        case "CHANGE_SHIFT": 
            let newGigs = [...state.gigs]
            console.log(action.checked)
            let newUserId = action.checked ? state.actUser.id : ""
            newGigs[action.gigId].shifts[action.shiftIndex].userId = newUserId         
            return {
            ...state,
            gigs: [...newGigs]
            };
        case "SET_USER_DATA" :
            let newUsers = [...state.users].map(user => user.id === state.actUser.id ? user = {...user, ...action.newUserData} : user)           
            return {
                ...state,
                actUser: {...state.actUser, ...action.newUserData},
                users: newUsers
            }
        case "LOGOUT" : 
            return {
                ...state,
                actUser: {},
                isLoggedIn: false
            }


            
    }
    return state
}

export default rootReducer;