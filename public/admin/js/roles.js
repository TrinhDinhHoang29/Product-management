
const btnUpdateRoles = document.querySelector("[btn-update-roles]");
if(btnUpdateRoles){
    btnUpdateRoles.addEventListener("click",()=>{
        let permission = [];
        const rows = document.querySelectorAll("[row]");
        rows.forEach((row,index)=>{
               const rolesId = row.querySelectorAll("input[roles-id]");
                if(rolesId.length>0){
                    rolesId.forEach((item)=>{
                        permission.push({id:item.value,permission:[]});
                    })
                }else{
                    const inputs = row.querySelectorAll("input[act]");
                    inputs.forEach((input,index) =>{
                        if(input.checked==true){
                           permission[index].permission.push(input.getAttribute("act")); 
                        }

                    })
                }    
        })
        const frmPermission = document.querySelector("[frm-permission]");
        const inputFrmPermission = frmPermission.querySelector("input");
        inputFrmPermission.value = JSON.stringify(permission);
        frmPermission.submit();
    })

}

const records = document.querySelector("[data-records]");
if(records){
    const dataRecords = JSON.parse(records.getAttribute("data-records"));
    dataRecords.forEach((record,index)=>{
        permission=record.permissions;
        permission.forEach((item)=>{
            const input = document.querySelectorAll(`input[act=${item}]`)[index];
            input.checked=true;
        })
    })
}