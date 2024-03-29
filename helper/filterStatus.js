module.exports = (query)=>{
    let filterStatus = [
        {
            name:"Tất cả",
            status:"",
            class:"active"
        },
        {
            name:"Hoạt động",
            status:"active",
            class:""
        },
        {
            name:"Dừng hoạt động",
            status:"unactive",
            class:""
        }
    ]

    //let find = {deleted:true};
    if(query.status)
        {
            filterStatus.forEach(element=>{
                element.class="";
                if(element.status==query.status)
                    element.class="active";
            })
        }
    return filterStatus;

}