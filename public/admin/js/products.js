// change-status start
const changeStatus = document.querySelectorAll("[button-change-status]");
if(changeStatus.length>0){
    changeStatus.forEach(button =>{
        button.addEventListener("click",()=>{
            const id =button.getAttribute("id-change");
            const status = button.getAttribute("status-change");
            const statusChange = status=="active"?"unactive":"active";
            const formChangeStatus = document.querySelector("#formChangeStatus");
            const dataPath = formChangeStatus.getAttribute("data-path");
            const action = dataPath+ `/${statusChange}/${id}?_method=PATCH`;
            formChangeStatus.action = action;
            formChangeStatus.submit();
        })
    })
}
// change-status end 