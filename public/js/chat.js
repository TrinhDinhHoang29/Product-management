var form = document.getElementById('form');
var input = document.getElementById('input');
const bodyChat = document.querySelector(".inner-body");
//upload file preview
const upload = new FileUploadWithPreview.FileUploadWithPreview('upload-images',{
    multiple:true,
    maxFileCount:6//Số lượng hình ảnh
});

//end upload file preview
form.addEventListener('submit', function(e) {
    e.preventDefault();
    const content = input.value;
    const images = upload.cachedFileArray;
    if (content||images.length>0) {
    socket.emit('CLIENT_SEND_MESSAGE',{
        content:content,
        images:images
    });
    input.value = '';
    }
    upload.resetPreviewPanel();
});



socket.on('SEVER_SEND_MESSAGE', function(data) {
    const innerBody = document.querySelector(".inner-body");
    const element = document.createElement("div");
    let text = "";
    const myId = document.querySelector("[myId]").getAttribute("myId");
    
    if(data.customer_id==myId){
        element.classList="inner-outgoing";
    }else{
        element.classList="inner-incoming";
        text+=`<div class="inner-name"> ${data.fullName}</div> `;
    }
    socket.emit("CLIENT_SEND_TYPING","clear");
    if(data.content)
        text += `<div class="inner-content"> ${data.content}</div> `;
    if(data.images.length>0){
        text+=`<div class="inner-images">`
        data.images.forEach(image => {
            text+=`<img src="${image}" width="90px">`
        });
        text+=`</div>`
    }
    element.innerHTML = text;
    innerBody.appendChild(element);
    bodyChat.scrollTop = bodyChat.scrollHeight;                   
});
if(bodyChat){
    bodyChat.scrollTop = bodyChat.scrollHeight;
}


//Icon chat 
  const showIcon = document.querySelector(".showIcon");
  if(showIcon){
    showIcon.addEventListener("click",()=>{
        const classHidden = document.querySelector(".button-icon");
        classHidden.classList.toggle("hidden");
        
    })
  }
  document.querySelector('emoji-picker').addEventListener('emoji-click', event => {
    const inputChat = document.querySelector("#input");
    socket.emit("CLIENT_SEND_TYPING","showTyping");
    clearTimeout(typingRemove);
    typingRemove= setTimeout(()=>{
        socket.emit("CLIENT_SEND_TYPING","clear");
      },3000);     inputChat.value+=event.detail.unicode;
    inputChat.setSelectionRange(inputChat.value.length,inputChat.value.length);
    inputChat.focus();
});
//end Icon chat
//TYPING
const inputChat = document.querySelector("#input");
if (inputChat){
    var typingRemove;
    inputChat.addEventListener("keyup",()=>{
        socket.emit("CLIENT_SEND_TYPING","showTyping");
        clearTimeout(typingRemove);
        typingRemove= setTimeout(()=>{
            socket.emit("CLIENT_SEND_TYPING","clear");
          },3000); 
    })
     
}


socket.on('SEVER_SEND_TYPING', function(objTyping) {
    const myId = document.querySelector("[myId]").getAttribute("myId");
    const innerBody = document.querySelector(".inner-body");
    const elementTyping = document.createElement("div");

    if(objTyping.customer_id!=myId){
        elementTyping.classList = "inner-incoming typing";
        let text = "";
        text+=`<div class="inner-name"> ${objTyping.fullName}</div> `;
        text += `<div class="inner-typing inner-content">...</div> `;
        elementTyping.innerHTML = text;
        if(objTyping.content=="clear"&&document.querySelector(".inner-typing")){
            const typing = document.querySelector(".typing");
            typing.remove();
        }
    }
    if(!document.querySelector(".inner-typing")&&objTyping.content!="clear"){
        innerBody.appendChild(elementTyping);
    }
    bodyChat.scrollTop = bodyChat.scrollHeight;
});

//END TYPING
const gallery = new Viewer(document.querySelector('.inner-body'));
