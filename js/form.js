// 載入資料並宣告常用變數
import data from "../area.js";
let AreaData = data;
const CitySelection = document.getElementById("city-selection");
const DistrictSelection = document.getElementById("district-selection");
let DefaultCity ="高雄市";
let DefaultDistrict = "新興區";


// function區

// 功能：根據縣市更新鄉鎮區選單

// @param {string} SelectedCity

function UpdateDistrictOptions (SelectedCity){
    DistrictSelection.innerHTML = "";
    if(SelectedCity){
        const District = AreaData[SelectedCity];
        District.forEach(item => {
            const PerDistrictOption = document.createElement("option");
            PerDistrictOption.value = item;
            PerDistrictOption.textContent = item;
            if(item === DefaultDistrict){
                PerDistrictOption.selected = true;
            }
            DistrictSelection.appendChild(PerDistrictOption);
        }); 
    }
    else{
        DistrictSelection.disabled = true;
        alert("請選擇一個縣市");
    };
}




// 事件監聽區

CitySelection.addEventListener("change",function(){
    let SelectedCity = CitySelection.value;
    UpdateDistrictOptions(SelectedCity);
    
})


// 執行

UpdateDistrictOptions(DefaultCity);