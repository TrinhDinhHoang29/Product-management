const productQuantity = document.querySelectorAll("[product-quantity]");
if(productQuantity){
    productQuantity.forEach(input=>{
        input.addEventListener("change",()=>{
            const productId = input.getAttribute("product-quantity");
            const productValue = input.value;
            window.location.href = `/cart/updateQuantity/${productId}/${productValue}`;
        })
    });
}