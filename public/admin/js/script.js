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