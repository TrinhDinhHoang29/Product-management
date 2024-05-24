//button status start

const filterStatus = document.querySelectorAll("[filter-status]");
if(filterStatus){
    filterStatus.forEach(element=>{
        element.addEventListener("click",()=>{
            let url = new URL(window.location.href);
            const status = element.getAttribute("status");
            if(status==""){
                url.searchParams.delete("status");
            }else{
                url.searchParams.set("status",status);
            }
            window.location.href = url.href;
        })
    })
}


//button status end


// form search start =================================

const formSearch = document.querySelector("#form-search");
    if(formSearch)
    {
        let url = new URL(window.location.href);
        formSearch.addEventListener("submit",(e)=>{
            e.preventDefault();//Không load lại trang khi submit

            const keyword=e.target.elements.keyword.value;//lấy ra giá trị của element có name keyword trên thanh url 
            if(keyword){
                url.searchParams.set("keyword",keyword);//gán giá trị của nó lên thanh url
            }
            else{
                url.searchParams.delete("keyword");//nếu keyword không có giá trị thì xóa name keyword trên url
            }
            window.location.href = url.href; //gán url nãy giờ đã thêm giá trị lên thanh url hiện tại
        });
    }



//form search end


//pagination start ---------------
const buttonsPagination = document.querySelectorAll("[button-pagination]");
if(buttonsPagination){
    let url = new URL(window.location.href);
    buttonsPagination.forEach(element=>{
        element.addEventListener("click",()=>{
            url.searchParams.set("page",element.getAttribute("button-pagination"));
            console.log(element.getAttribute("button-pagination"));
            window.location.href = url.href;
        })
    })
}


//pagination end --------------------



// checkbox-multi start -----------------------------------
const checkboxMulti = document.querySelector("[checkbox-multi]");
if(checkboxMulti){
    const checkboxAll = checkboxMulti.querySelector("input[name='checkAll']");
    const checkboxIds = checkboxMulti.querySelectorAll("input[name='id']");
    checkboxAll.addEventListener("click",()=>{
        if(checkboxAll.checked)
            {
                checkboxIds.forEach(item=>{
                    item.checked=true;
                })
            }
        else
            {
                checkboxIds.forEach(item=>{
                    item.checked=false;
                })
            }
    });
    checkboxIds.forEach(item=>{
        item.addEventListener("click",()=>{
            const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;
            if(countChecked==checkboxIds.length)
                checkboxAll.checked=true;
            else
                checkboxAll.checked=false;
        })
    });
    
}
// checkbox-multi end -----------------------------------


// form change status multi start ------------------------
const formChangeMulti = document.querySelector("[form-change-multi]");
if(formChangeMulti){
        formChangeMulti.addEventListener("submit",(e)=>{
            e.preventDefault();
            const checkboxMulti = document.querySelector("[checkbox-multi]");
            const checkedboxIds = checkboxMulti.querySelectorAll("input[name='id']:checked");
            if(checkedboxIds.length>0){
                const ids=[];
                checkedboxIds.forEach(item=>ids.push(item.value));
                if(ids.length>0){
                    const inputIds = formChangeMulti.querySelector("input[name='ids']");
                    const selectedDeleteAll = e.target.elements.type.value;
                    inputIds.value = ids.join(", ");
                    if(selectedDeleteAll=="delete-all"){
                        const resultConfirm = window.confirm("bạn có muốn xóa không");
                        if(resultConfirm){
                            formChangeMulti.submit();
                        }
                    }else{
                    formChangeMulti.submit();
                    }
                }
            }
        })
    

}

// form change status multi end ------------------------


//checkbox restore start ----------------------------------
const restoreAll = document.querySelector("[restoreAll]");
if(restoreAll){
    const restoreIds = restoreAll.querySelector("input[name='restoreIds']");
    const restoreId = restoreAll.querySelectorAll("input[name='restoreId']");
    restoreIds.addEventListener("click",()=>{
        if(restoreIds.checked==true){
            restoreId.forEach(item=>{
                item.checked=true;
            })
        }
        else{
            restoreId.forEach(item=>{
                item.checked=false;
            })
        }
    });
    restoreId.forEach(item=>{
       item.addEventListener("click",()=>{
            const countRestoresChecked = restoreAll.querySelectorAll("input[name='restoreId']:checked").length;
            if(restoreId.length==countRestoresChecked){
                restoreIds.checked=true;
            }
            else
                restoreIds.checked=false;
        })
    })
}
//checkbox restore end ------------------------------------



//restore multi start ------------------------------------

const formRestoreMulti = document.querySelector("[form-restore-multi]")
if(formRestoreMulti){
    const restoreAll = document.querySelector("[restoreAll]");
        formRestoreMulti.addEventListener("submit",(e)=>{
            e.preventDefault();
            const productRestoresChecked = restoreAll.querySelectorAll("input[name='restoreId']:checked");
            if(productRestoresChecked.length>0){
            const ids = [];
            const inputRestore= formRestoreMulti.querySelector("input[name='allIdRestore']");
            productRestoresChecked.forEach(item=>{
                ids.push([item.value]);
            })
            inputRestore.value = ids.join(", ");
            formRestoreMulti.submit();
            }
        })
    

}

//restore multi end -------------------------------------

// show alert -----------------------
const showAlert = document.querySelector("[show-alert]");
if(showAlert){
    const dataTime =parseInt( showAlert.getAttribute("data-time"));
    setTimeout(()=>{
        showAlert.classList.add("alert-hidden");
   },dataTime);
   setTimeout(()=>{
    document.querySelector(".messages-success").remove();
},dataTime+2000);
   
}
//end alert--------------------------


//preview start ----------------------------------------
const uploadImages = document.querySelector("[upload-image]");
if(uploadImages){
    const uploadImagesInput = document.querySelector("[upload-image-input]");
    const uploadImagesPreview = document.querySelector("[upload-image-preview]");
    if(uploadImagesInput){
        uploadImagesInput.addEventListener("change",(e)=>{
            const files = e.target.files[0];
            uploadImagesPreview.src = URL.createObjectURL(files);
        })
    }
}

//preview end ------------------------------------------


//close img  start ------------------------
const closeImage = document.querySelector("[close-image-upload]");
if(closeImage){
    closeImage.addEventListener("click",()=>{
        const uploadImagesInput = document.querySelector("[upload-image-input]");
        const uploadImagesPreview = document.querySelector("[upload-image-preview]");
        if(uploadImagesInput.value){
            uploadImagesInput.value="";
            uploadImagesPreview.src="";
        }
    })
}
//close img end ---------------------------


//sort start -------------------------------------
const sort = document.querySelector("[sort]");
if(sort){
    const sortSelect = document.querySelector("[sort-select]");
    const url = new URL(window.location.href);
    const urlKeySort = url.searchParams.get("keySort");
    const urlValueSort = url.searchParams.get("valueSort");
    if(urlKeySort&&urlValueSort){
        sortSelect.value = urlKeySort+"-"+urlValueSort;
    }
    sortSelect.addEventListener("change",(e)=>{
    const stringSort = e.target.value;
    const [keySort,valueSort] = stringSort.split("-");
    url.searchParams.set("keySort",keySort);
    url.searchParams.set("valueSort",valueSort);
    window.location.href = url.href;
    })
}
//sort end -------------------------------------



