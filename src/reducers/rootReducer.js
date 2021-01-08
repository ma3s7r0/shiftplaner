/* eslint-disable default-case */
const initState = {
    actUser : "",
    password : "",
    token : {},
    isLoggedIn : false,
    users: [{
        id: "1",
        name: "paul",
        hash: "'0357513deb903a056e74a7e475247fc1ffe31d8be4c1d4a31f58dd47ae484100'",
        phone: "046548",
        eMail: "me@you.we"
    },
    {
        id: "2",
        name: "ingrid",
        hash: "'0357513deb903a056e74a7e475247fc1ffe31d8be4c1d4a31f58dd47ae484100'",
        phone: "6488431",
        eMail: "superman@batman.spider"
    }],
    events: [{
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
            let returnStatement = (typeof foundUser !== 'undefined' && action.password === foundUser.password) ? 
            {   ...state,
                user: action.user,
                password: action.password,
                isLoggedIn : true } :
            {   ...state,
                isLoggedIn : false }
            return returnStatement;

    }
    return state
}

export default rootReducer;