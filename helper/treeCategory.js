module.exports = function createTree(arr,parentId=''){
    const tree=[];
    arr.forEach(element => {
        if(element.parentId===parentId){
            const newItem = element;
            const childItem = createTree(arr,newItem.id);
            if(childItem.length>0){
                newItem.childItem = childItem;
            }
         tree.push(newItem); 
        }
    });
    return tree;
}