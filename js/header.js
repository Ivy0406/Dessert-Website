// 宣告變數
const menuBtn = document.querySelector('.menu-btn');
const menuList = document.getElementById('menu-list');


// 事件監聽區

// 點擊漢堡按鈕跳出選項清單
menuBtn.addEventListener("click",function(){
    menuList.classList.toggle("hidden");
});

menuList.addEventListener("click",function(){
    menuList.classList.add("hidden");
});

