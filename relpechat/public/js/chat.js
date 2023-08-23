const socket = io()
//// Element 
const $msgform = document.querySelector("#form-msg");
const $msgforminput = document.querySelector("input");
const $msgformbutton = document.querySelector("button ");
const $locationbtn = document.querySelector('#send-location');
const $messages = document.querySelector('#messages');
const $roomName = document.querySelector('#room-title');
const $userslist = document.querySelector('#users');



//////Tempplate
const messageTemplate = document.querySelector('#message-template').innerHTML
const loactiontemplatemessage = document.querySelector('#locationmessage-template').innerHTML
const sidebartemplate = document.querySelector("#sidebar-template").innerHTML

/////optionns
const {username, room} = Qs.parse(location.search, { ignoreQueryPrefix: true})

socket.on('message', (message) =>{
    console.log(message)
    const html = Mustache.render(messageTemplate , {
       username:message.username,
       message: message.text,
       createdAt: moment (message.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
})
socket.on('locationMessage' , (message) => {
    console.log(message)
    const htmlObject = Mustache.render(loactiontemplatemessage, {
        username: message.username, 
        url: message.url,
        createdAt: moment(message.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', htmlObject);

})
socket.on('roomData' , ({ room, users}) => {
//    outputRoomName(room);
//    outputUsers(users)
   const html = Mustache.render(sidebartemplate , {
    room,
    users
   })
   document.querySelector('#sidebar').innerHTML=html
})




$msgform.addEventListener('submit' , (e) => {
    e.preventDefault()
    ///////////////////////////////////Disable the button code......
    $msgformbutton.setAttribute('disabled', 'disabled')

    const msg = e.target.elements.msg.value
    socket.emit('sendMessage' , msg , (error)=>{
        //////////enable the button..................
        $msgformbutton.removeAttribute('disabled')
        $msgforminput.value = ''
        $msgforminput.focus()

        if(error) {
            return console.log(error)
        }
        console.log(msg)
        console.log('the message was delievered')

    })
})
/////////////////////location code
$locationbtn.addEventListener('click', () =>{
    /////////disable location button
    // $locationbtn.setAttribute('disabled', 'disabled')
    if(!navigator.geolocation) {
        return alert('Geo location is not siported by your browser')

    }
    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendlocation' , {

            latitude:position.coords.latitude,
            longitude:position.coords.longitude

        } , () => {
            $locationbtn.removeAttribute('disabled')

            console.log('Shared Location')

        })
    })

})


// socket.on('CountedUpdate', (count)=>{

//     console.log('the count has been update', count)
// })

// document.querySelector("#increment").addEventListener("click", () => {
//     console.log("clicked");
//     socket.emit('increment')
// })


socket.emit('join', {username, room} ,(error) =>{
    alert(error)
    location.href='/'

})


//add room 
// function outputRoomName(room) {
//     roomName.innerText = room;

// }
// function outputUsers(users) {

//     userslist.innerHTML = ` ${users.map(user => `<li>user,username</li>`).json()}`;
    
// }