var form = document.getElementById('form');
var input = document.getElementById('input');
const bodyChat = document.querySelector(".inner-body");

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
    socket.emit('CLIENT_SEND_MESSAGE', input.value);
    input.value = '';
    }
});
socket.on('SEVER_SEND_MESSAGE', function(msg) {
    const innerBody = document.querySelector(".inner-body");
    const element = document.createElement("div");
    let text = "";
    const myId = document.querySelector("[myId]").getAttribute("myId");
    if(msg.customer_id==myId){
        element.classList="inner-outgoing";
    }else{
        element.classList="inner-incoming";
        text+=`<div class="inner-name"> ${msg.fullName}</div> `;
    }
     text += `<div class="inner-content"> ${msg.content}</div> `;
    element.innerHTML = text;
    innerBody.appendChild(element);
    bodyChat.scrollTop = bodyChat.scrollHeight;

                    
});
if(bodyChat){
    bodyChat.scrollTop = bodyChat.scrollHeight;
}