

let productsList = JSON.parse(localStorage.getItem("productsList")) ?? [];
console.log(productsList);
//render Product
let renderInner = "";
let innerTotal=0;
function renderProduct(id) {
    
    for (let i = 0; i < productsList.length; i++) {

        renderInner +=
            `
            <div class="product">
                <div class="imgContainer">
                    <img id="img${productsList[i].id[0]}" class="product__Img" src="${productsList[i].productImg[0]}" alt="">
                    <img id="img${productsList[i].id[1]}" class="product__Img display" src="${productsList[i].productImg[1]}" alt="">
                </div>
                <div class="detailBox">
                    <p class="product__bestSellerText">${productsList[i].introduceText}</p>
                    <p class="product__name">${productsList[i].productName}</p>
                </div>
                <div class="buttonBox">
                    <div class="sizeButtonBox__container">${sizeButtonCreate(productsList[i])}</div>
                    <button class="statusButtonBox">${checkProductStatus(productsList[i])}</button>
                </div>
            </div>
        `
        innerTotal=i+1
    }
    document.getElementById("total").innerText=`${innerTotal} PRODUCTS`
    document.getElementById("productContainer").innerHTML = renderInner;
}
renderProduct(productsList.id)


function checkProductStatus(Product) {
    let addToBagButtonInner="";
    let productStatus = Product.status;
    
    if(productStatus=="Available"){
        addToBagButtonInner+=
        `
        <div class="addToBag">
            <p>Add To Bag</p>
            <div class="priceContainer">
                <div>
                <p id="price${Product.id[0]}">${Product.price[0]}</p>
                </div>
                <p class="display" id="price${Product.id[1]}">${Product.price[1]}</p>
            </div>
        </div>
        `
        return innerHTML=addToBagButtonInner;
    }if (productStatus=="Notify Me") {
        addToBagButtonInner+=
        `
        <div class="Notify-Me">
            <p>Notify Me</p>
        </div>
        `
        return innerHTML=addToBagButtonInner;
    }if (productStatus=="Full Detail") {
        addToBagButtonInner+=
        `
        <div id="seeFullDetail${Product.id}" class="addToBag">
            <p>See Full Detail</p>
            <div class="priceContainer">
                <div class="priceContructor">
                <p id="price${Product.id[0]}">${Product.price[0]}</p>
                <p class="originalPrice id="price${Product.id[0]}">${Product.originalPrice}</p>
                </div>
                <p class="display" id="price${Product.id[1]}">${Product.price[1]}</p>
            </div>
        </div>
        `
        return innerHTML=addToBagButtonInner;
    }if (productStatus=="Sold Out") {
        addToBagButtonInner+=
        `
        <div class="Notify-Me">
            <p>Sold Out</p>
        </div>
        `
        return innerHTML=addToBagButtonInner;
    }
}

function sizeButtonCreate(Product) {
    let sizeButtonInner = "";
    let productSize = Product.size;
    if (productSize.length == 1) {
        sizeButtonInner +=
            `
        <button class="sizeButton">${productSize[0]} oz</button>
        `
        return innerText = sizeButtonInner;
    } else if (productSize.length > 1) {
        for (let i = 0; i < productSize.length; i++) {
            sizeButtonInner +=
                `
       <button onclick="changeDetailbySize(${Product.id[i]})" class="sizeButton">${productSize[i]} oz</button>
       `
        }
        return innerHTML = sizeButtonInner;
    } else if(productSize.length == 0) {
        return innerHTML=""
    }
}

function changeDetailbySize(id){
    console.log(id);
    for (let i = 0; i < productsList.length; i++) {
        if(productsList[i].id.length>=2){
            let count=0;
            for (let j = 0; j < productsList[i].id.length; j++) {
                /* document.getElementById(`img${productsList[i].id[j]}`).classList.add("display");
                document.getElementById(`price${productsList[i].id[j]}`).classList.add("display"); */
                if(productsList[i].id[j]==id){
                    let idIndex=count;
                    if (idIndex==0) {
                        document.getElementById(`img${productsList[i].id[idIndex+1]}`).classList.add("display");
                        document.getElementById(`price${productsList[i].id[idIndex+1]}`).classList.add("display");
                        document.getElementById(`img${productsList[i].id[idIndex]}`).classList.remove("display");
                        document.getElementById(`price${productsList[i].id[idIndex]}`).classList.remove("display");
                    }if (idIndex==1) {
                        document.getElementById(`img${productsList[i].id[idIndex-1]}`).classList.add("display");
                        document.getElementById(`price${productsList[i].id[idIndex-1]}`).classList.add("display");
                        document.getElementById(`img${productsList[i].id[idIndex]}`).classList.remove("display");
                        document.getElementById(`price${productsList[i].id[idIndex]}`).classList.remove("display");
                    }
                    count=0;
                }
                count++
            }
        }      
    }
} 

function logout(){
    localStorage.removeItem("CheckLogin")
}

let usersList = JSON.parse(localStorage.getItem("usersList"));

function checkLogin() {
    let nameDisplay=document.getElementById("userDetailName");
    let avatarDisplay=document.getElementById("userDetailImg");
    if (localStorage.getItem("CheckLogin")) {
        console.log("11111");
        let CheckLogin= localStorage.getItem("CheckLogin");
        document.getElementById("login_icon").style.display="none";
        document.getElementById("logout_icon").style.display="block";
        nameDisplay.style.display="block";
        nameDisplay.innerText= (usersList.find(item => item.id == CheckLogin).fistName) + (usersList.find(item => item.id == CheckLogin).lastName);
        avatarDisplay.style.display="block"
        avatarDisplay.src= usersList.find(item => item.id == CheckLogin).avatar;
    }else{
        document.getElementById("login_icon").style.display="block";
        document.getElementById("logout_icon").style.display="none";
        document.getElementById("userDetailName").style.display="none";
        document.getElementById("userDetailImg").style.display="none";
    }

}
checkLogin()