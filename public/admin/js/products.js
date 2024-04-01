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


//delete Item start ----------------------------
const deleteItems= document.querySelectorAll("[button-deleteItem]");
if(deleteItems.length>0){
    deleteItems.forEach(item=>{
        item.addEventListener("click",()=>{
            if(window.confirm("Bạn chất chắn muốn xóa")){
            const id = item.getAttribute("id-deleteItem");
            const formDeleteItem = document.querySelector("#form-deleteItem");
            const pathDelete = formDeleteItem.getAttribute("data-path");
            const action = pathDelete+"/"+id;
            formDeleteItem.action = action+"?_method=DELETE";
            formDeleteItem.submit();  
            }
            
        })
    })
}
//delete Item end ----------------------------

//Restore products start ----------------------
const buttonProductsRestore = document.querySelectorAll("[button-restore-product]")
if(buttonProductsRestore.length>0){
    buttonProductsRestore.forEach(item=>{
        item.addEventListener("click",()=>{
            const idProductRestore = item.getAttribute("id-restore");
            const formRestore = document.querySelector("#formRestore");
            const pathRestore = formRestore.getAttribute("data-path");
            const action = pathRestore+"/"+ idProductRestore;
            formRestore.action = action+"?_method=PATCH";
            formRestore.submit();
        })
    })
}

//Restore products end ------------------------