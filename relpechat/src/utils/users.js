const users = []

// add users, remove user , get user, and remove in room


const adduser = ({id, username, room}) => {
    // clean data
    // username = username.trim().toLowerCase()
    // room = room.trim().toLowerCase()

    ///////// validate the data
    if (!username || !room){
        return {
            error: "username and room name is required"

        }
    }
    // check for existing for user

    const existinguser = users.find((user)=>{
        return user.room === room && user.username===username
    })
    //////validate username
    if (existinguser) {
        return{
            error: "username is use"

        }
    }


    //store user data
    const user = {id, username, room }

    users.push(user)
    return { user }
}
const removeUser = (id) => {
    const index = users.findIndex((user) => user.id===id)
    if(index !== -1) {
        return users.splice(index, 1)[0]
    }
}

const getUser = (id) => {
    return ( 
        users.find((user) => user.id===id) 
        )
}
const getuserinroom = (room) => {
    room = room.trim().toLowerCase()
    return users.filter((user) => user.room===room) 
        
}


module.exports ={
    adduser,
    removeUser,
    getUser,
    getuserinroom 

    

}