// 引入資料並抓取常用DOM

import data from "../products-data.js";
let AllProductsData = [];
AllProductsData = data;
let FiltedProduct = AllProductsData;


const SeriesSelect = document.getElementById("series-select");
const ProductListWeb = document.querySelector(".product-list-web"); 
const ProductListMobile = document.querySelector(".product-list-mobile")
let ItemsPerPage = 3;

// 初始狀態
RandomSelection(FiltedProduct);

// 設置監聽事件

// 得知哪一個類別被選中了，並啟動渲染功能
SeriesSelect.addEventListener("click", function (event) {
  let SeriesBtns = document.querySelectorAll("button");
  SeriesBtns.forEach((btn) => {
    btn.classList.remove("active");
  });
  // 因為remove一次只能作用一個item，所以要用forEach

  let TargetBtn = event.target.closest("button");
  let SeriesSelected = TargetBtn.value;
  TargetBtn.classList.add("active");

  FiltedProduct = AllProductsData.filter((product) => {
    return product.series === SeriesSelected;
  });

  RandomSelection(FiltedProduct);
});

// function 區

// 功能：根據系列篩選出的陣列資料隨機挑三筆
function RandomSelection(FiltedData) {
  let ArrayLength = FiltedData.length;
  let SelectedItem = []; //放不重複的索引值
  let DataToShow = []; //放產品物件

  // 當索引值陣列長度小於每頁顯示數量，就執行
  while (SelectedItem.length < ItemsPerPage) {
    let RandomItem = Math.floor(Math.random() * ArrayLength);
    if (!SelectedItem.includes(RandomItem)) {
      SelectedItem.push(RandomItem); //檢查若沒重複抽號就放進去索引值陣列
    }
  }

  SelectedItem.forEach((index) => {
    DataToShow.push(FiltedData[index]);
  }); //根據索引值陣列，逐一去產品列表取出物件資料放進DataToShow

  renderProductsList(DataToShow);
}

// 功能：渲染在商品列表區塊
function renderProductsList(DataToShow) {
  let CardsHTMLweb = ""; //每次渲染都要先清空原顯示的商品項目，否則會一直疊加
  let CardsHTMLmobile = ""
  DataToShow.forEach(function (item) {
    CardsHTMLweb = CardsHTMLweb + ProductCardWeb(item); //持續累加到最後一筆
    CardsHTMLmobile = CardsHTMLmobile + ProductCardMobile(item);
  });

  ProductListWeb.innerHTML = CardsHTMLweb;
  ProductListMobile.innerHTML = CardsHTMLmobile;
}

// 功能：製作商品卡片(網頁版)
function ProductCardWeb(CardToShow) {
  let Card = `<li class=" flex-1 max-w-[300px]">
      <figure class="relative">
          <div class="label absolute z-10 left-5">
                <span>${CardToShow.series}</span>
              </div>
              <img
                class="absolute z-10 right-5 top-[19px] hover:scale-150 cursor-pointer w-5"
                src="./images/baseline-favorite-border-empty.svg"
                alt="加入我的收藏"
              />
              <img
                class="h-[315px] w-full object-cover"
                src="${CardToShow.picture}" alt="${CardToShow.name}"
              />
            </figure>
            <figcaption class="flex">
              <p class="product-name">${CardToShow.name}</p>
              <p class="product-price">NT$${CardToShow.price}</p>
            </figcaption>
            <button class="lg-btn w-full">加入購物車</button>
          </li>`;
  // console.log(Card);

  return Card;
}

// 功能：製作商品卡片(行動版)
function ProductCardMobile(CardToShow) {
  let Card = `<li class="w-[315px] shrink-0 snap-start">
            <figure class="relative">
              <div class="label absolute z-10 left-5">
                <span>${CardToShow.series}</span>
              </div>
              <img
                class="absolute z-10 right-5 top-[19px] hover:scale-150 cursor-pointer w-5"
                src="./images/baseline-favorite-border-empty.svg"
                alt="加入我的收藏"
              />
              <img
                class="h-[315px] w-full object-cover"
                src="${CardToShow.picture}" alt="${CardToShow.name}"
              />
            </figure>
            <figcaption class="flex">
              <p class="product-name">${CardToShow.name}</p>
              <p class="product-price">NT$${CardToShow.price}</p>
            </figcaption>
            <button class="lg-btn w-full">加入購物車</button>
          </li>`;
  // console.log(Card);

  return Card;
}


