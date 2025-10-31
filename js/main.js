// 引入資料並宣告常用變數
import data from "../products-data.js";
let AllProductsData = [];
AllProductsData = data;
let SeriesSelected = AllProductsData;

const PageSelect = document.getElementById("page-select");
const SeriesSelect = document.getElementById("series-select");
const ProductList = document.getElementById("product-list");
let ItemsPerPage = 6;
let CurrentPage = 1;

// function 區

// 功能：根據頁數決定渲染資料
function showPage(CurrentPage) {
  const StartIndex = (CurrentPage - 1) * ItemsPerPage;
  const EndIndex = StartIndex + ItemsPerPage;
  const PageData = SeriesSelected.slice(StartIndex, EndIndex);
  renderProductsList(PageData);
}

// 功能：渲染產品列表
function renderProductsList(DataToShow) {
  let CardsHTML = ""; //每次渲染都要先清空原顯示的商品項目，否則會一直疊加
  DataToShow.forEach(function (item) {
    CardsHTML = CardsHTML + ProductCard(item); //持續累加到最後一筆
    // console.log(item);
  });
  ProductList.innerHTML = CardsHTML;
}

// 製作商品卡

function ProductCard(CardToShow) {
  let Card = `<li>
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

// 設定每頁顯示品項數量

function setItemsPerPage() {
  if (window.innerWidth < 769) {
    ItemsPerPage = 3;
  } else {
    ItemsPerPage = 6;
  }
}

// 事件監聽區

// 判讀當前頁數

PageSelect.addEventListener("click", function (event) {
  const PageValue = event.target.closest("button")?.value;
  let TargetPage = CurrentPage;
  if (!PageValue) {
    return;
  }

  if (PageValue === "prev") {
    TargetPage = TargetPage - 1;
  } else if (PageValue === "next") {
    TargetPage = TargetPage + 1;
  } else {
    TargetPage = parseInt(PageValue);
  }

  const TotalPages = Math.ceil(SeriesSelected.length / ItemsPerPage);

  if (TargetPage < 1) {
    TargetPage = 1;
  }
  if (TargetPage > TotalPages) {
    TargetPage = TotalPages;
  }
  if (TargetPage !== CurrentPage) {
    CurrentPage = TargetPage;
    showPage(CurrentPage);
  }
});

// 判讀視窗大小

window.addEventListener("resize", function () {
  setItemsPerPage();
  showPage(CurrentPage);
});

// 判讀選擇類別

SeriesSelect.addEventListener("click", function (event) {
  let TargetBtn = event.target;
  let SeriesBtns = SeriesSelect.querySelectorAll('button');
  SeriesBtns.forEach(btn=>{
    btn.classList.remove('active')
  });

  let SeriesValue = TargetBtn.value;
  TargetBtn.classList.add('active');
  if (!SeriesValue) {
    return;
  }
  if (SeriesValue === "所有甜點") {
    SeriesSelected = AllProductsData;
  }
  else {
    SeriesSelected = AllProductsData.filter(function (product) {
      return product.series === SeriesValue;
    });
  }
  showPage(CurrentPage);
});

// 執行區

showPage(CurrentPage);
