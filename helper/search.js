module.exports = (query)=>{
    let objectSearch = {
        keyword:'',
    }
    if(query.keyword){
        objectSearch.keyword = query.keyword;
        objectSearch.regex = new RegExp(objectSearch.keyword,"i");/// i để k phân biệt chữ hoa chữ thường
    }
    return objectSearch;
}