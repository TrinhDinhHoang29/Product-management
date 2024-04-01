//button status start

// const buttonStatus = document.querySelectorAll("[status-button]");
// if(buttonStatus.length>0){
//     buttonStatus.forEach(element=>{
//         element.addEventListener("click",()=>{
//             element.setAttribute("class","active");
//         }
//         );
//     })
// }


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
                    inputIds.value = ids.join(", ");
                    formChangeMulti.submit();
                }
            }
        })
    

}


// form change status multi end ------------------------