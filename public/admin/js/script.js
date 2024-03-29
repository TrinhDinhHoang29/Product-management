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

            const keyword=e.target.elements.keyword.value;
            if(keyword){
                url.searchParams.set("keyword",keyword);
            }
            else{
                url.searchParams.delete("keyword");
            }
            window.location.href = url.href;
        });
    }



//form search end
