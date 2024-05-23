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

const buttonAppceptAddFriends = document.querySelectorAll(".btn-appcept-add-friend");
if(buttonAppceptAddFriends.length>0){
    functionButtonAppceptAddFriends(buttonAppceptAddFriends);
}

const buttonCancelAppceptAddFriends = document.querySelectorAll(".btn-cancel-appcept-add-friend");
if(buttonCancelAppceptAddFriends.length>0){
    functionButtonCancelAppceptAddFriends(buttonCancelAppceptAddFriends);
}
const accepLength = document.querySelector("[accept-length]");
if(accepLength){
    const userId = accepLength.getAttribute("accept-length");
    socket.on('SERVER_RETURN_LENGTH_ACCEPT_FRIENDS', function(lengthAcceptFriends) {
        if(userId==lengthAcceptFriends.userId){
            accepLength.innerHTML = lengthAcceptFriends.lengthAcceptFriends; 
        }
    })
}
const boxParentAccept = document.querySelector("[box-parent-accept]");
if(boxParentAccept){
    socket.on('SERVER_RETURN_INFO_ACCEPT_FRIENDS', function(infoB) {
        const userId = boxParentAccept.getAttribute("box-parent-accept");
        if(userId==infoB.userId){  
            const div = document.createElement("div");
            div.classList.add("col-4");
            div.setAttribute("box-userId",infoB._id);
            div.innerHTML = `
            <div class="box-user">
              <div class="avatar"><img src="https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg" width="100px" alt=""/></div>
              <div class="user-info">
                <div class="user-info-name my-2">${infoB.fullName}</div>
                <div class="user-info-button my-2">
                  <button class="btn btn-appcept-add-friend btn-sm btn-primary" id-user-appcept-add=${infoB._id}>Chấp nhận</button>
                  <button class="btn btn-cancel-appcept-add-friend btn-sm btn-secondary mx-2" id-user-appcept-cancel=${infoB._id}>Xóa</button>
                </div>
              </div>
            </div>`;
            boxParentAccept.appendChild(div);     
            const buttonCancelAppceptAddFriends = document.querySelectorAll(".btn-cancel-appcept-add-friend");
            functionButtonCancelAppceptAddFriends(buttonCancelAppceptAddFriends);      
            const buttonAppceptAddFriends = document.querySelectorAll(".btn-appcept-add-friend");
            functionButtonAppceptAddFriends(buttonAppceptAddFriends);
        }
    })
    socket.on('SERVER_RETURN_CANCEL_INFO_ACCEPT_FRIENDS', function(infoB) {
        const userId = boxParentAccept.getAttribute("box-parent-accept");
        if(userId==infoB.userId){
            const boxParent = document.querySelector("[box-parent-accept]");
            const boxChild = document.querySelector(`[box-userId="${infoB._id}"]`);
            boxParent.removeChild(boxChild);            
        }
    })
}

// Hiển thị status online
const statusOnline = document.querySelectorAll(".inner-statusOnline");
if(statusOnline.length>0){
    socket.on("SERVER_RETURN_STATUS_ONLINE",(status)=>{
        statusOnline.forEach((element)=>{
            if(element.closest(".box-user").getAttribute("boxUserFriendId")==status)
                element.setAttribute("statusOnline","online");
        });
    });
}

// End Hiển thị status online

//Tắt realTime statusOnline

if(statusOnline.length>0){
    socket.on("SERVER_RETURN_STATUS_OFFLINE",(status)=>{
        statusOnline.forEach((element)=>{
            if(element.closest(".box-user").getAttribute("boxUserFriendId")==status)
                element.setAttribute("statusOnline","");
        });
    });
}

//end Tắt realTime statusOnline
function functionButtonCancelAppceptAddFriends(buttonCancelAppceptAddFriends){
    buttonCancelAppceptAddFriends.forEach(buttonCancelAppcept=>{
        buttonCancelAppcept.addEventListener("click",()=>{
            const idUserAdd = buttonCancelAppcept.getAttribute("id-user-appcept-cancel");
            const boxParent = document.querySelector("[box-parent-accept]");
            const boxChild = document.querySelector(`[box-userId="${idUserAdd}"]`);
            if(boxChild){
                boxParent.removeChild(boxChild);            
            }
            socket.emit('CLIENT_CANCEL_APPCEPT_ADD_FRIEND',idUserAdd);
        })
    })
}
function functionButtonAppceptAddFriends(buttonAppceptAddFriends){
    buttonAppceptAddFriends.forEach(buttonAppcept=>{
        buttonAppcept.addEventListener("click",()=>{
            const idUserAdd = buttonAppcept.getAttribute("id-user-appcept-add");
            const boxParent = document.querySelector("[box-parent-accept]");
            const boxChild = document.querySelector(`[box-userId="${idUserAdd}"]`);
            if(boxChild){
                boxParent.removeChild(boxChild);
            }
            socket.emit('CLIENT_APPCEPT_ADD_FRIEND',idUserAdd);
        })
    })

}


