

const buttonAddFriends = document.querySelectorAll(".btn-add-friend");
if(buttonAddFriends.length>0){
    buttonAddFriends.forEach(buttonAddFriend=>{
        buttonAddFriend.addEventListener("click",(e)=>{
            const boxUser = buttonAddFriend.closest(".box-user");
            boxUser.classList.add("add");
            const idUserAdd = buttonAddFriend.getAttribute("id-user-add");
            socket.emit('CLIENT_ADD_FRIEND',idUserAdd);
        })
        
    })
}
const buttonCancelFriends = document.querySelectorAll(".btn-cancel-friend");
if(buttonCancelFriends.length>0){
    buttonCancelFriends.forEach(buttonAddFriend=>{
        buttonAddFriend.addEventListener("click",(e)=>{
            const boxUser = buttonAddFriend.closest(".box-user");
            boxUser.classList.remove("add");
            const idUserAdd = buttonAddFriend.getAttribute("id-user-cancel");
            socket.emit('CLIENT_CANCEL_ADD_FRIEND',idUserAdd);
        })
        
    })
}