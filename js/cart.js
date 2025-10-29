// 宣告常用參數
const CartList = document.querySelector(".cart-list"); //因為有多組相同按鈕，無法用ID來抓DOM
let MaxQuantity = 5;
let MinQuantity = 1;



// 監聽事件

CartList.addEventListener("click",function(event){
    let ClickTarget = event.target
    let CartItem = ClickTarget.closest(".cart-item") //判斷點擊到哪個品項的按鈕
    let ProductInput = CartItem.querySelector('.item-quantity');
    let BtnPlus = CartItem.querySelector('button[value="next"]');
    let BtnMinus = CartItem.querySelector('button[value="prev"]');
    let CurrentQuantity = parseInt(ProductInput.value);
    
    if(ClickTarget.value === "prev"){
        CurrentQuantity = CurrentQuantity-1;
    }


    if(ClickTarget.value === "next"){
        CurrentQuantity = CurrentQuantity+1;
    }
   
    if(CurrentQuantity < MinQuantity){
        CurrentQuantity = MinQuantity;
        BtnMinus.disabled = true;
        BtnPlus.disabled =false;
    }
    if(CurrentQuantity > MaxQuantity){
        CurrentQuantity = MaxQuantity;
        BtnPlus.disabled = true;
        BtnMinus.disabled =false;
    }

    ProductInput.value = CurrentQuantity;
    
    
})

