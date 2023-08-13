let productsList = JSON.parse(localStorage.getItem("productsList")) ?? [];

//pagination
let itemsPerPage = 32;
let totalPages = Math.ceil(productsList.length / itemsPerPage)

//render page button
function renderPage() {
    let pageInner = "";
    for (let i = 0; i < totalPages; i++) {
        pageInner += `<li onclick=activePage(${i + 1}) class="pagination__pageNumber">${i + 1}</li>`
    }
    document.getElementById("producList__pagination__page").innerHTML = pageInner
}
renderPage()
//active Page highlight
let currentPage = 1;
let start;
let end;
function activePage(active) {
    currentPage = active;
    let pages = document.getElementsByClassName("pagination__pageNumber");
    for (let i = 0; i < pages.length; i++) {
        if (i == active - 1) {
            pages[i].classList.add("active__page");
        } else {
            pages[i].classList.remove("active__page");
        }
    }
    startEnd(active)
    //if active = 1 hidden previous button
    if (currentPage == 1) {
        document.getElementById("producList__pagination__pre-btn").style.visibility = "hidden"
    } else {
        document.getElementById("producList__pagination__pre-btn").style.visibility = "visible"
    }
    //if active = totalPages hidden next button
    if (currentPage == totalPages) {
        document.getElementById("producList__pagination__next-btn").style.visibility = "hidden"
    } else {
        document.getElementById("producList__pagination__next-btn").style.visibility = "visible"
    }
    window.scrollTo({
        top: 0,
        behavior: `smooth`
    })
}

//caculator render products index
function startEnd(current) {
    start = (current - 1) * itemsPerPage;
    end = current * itemsPerPage;
    renderProduct(productsList)
}

activePage(1)

//previous page button
function previousPage() {
    currentPage = --currentPage;
    activePage(currentPage);
    renderProduct(productsList);
}

function nextPage() {
    currentPage = ++currentPage;
    activePage(currentPage);
    renderProduct(productsList);
}

//render products
function renderProduct(arrProducts) {
    let renderInner = "";
    let innerTotal = 0;
    for (let i = 0; i < arrProducts.length; i++) {
        if (i >= start && i < end) {
            innerTotal++
            renderInner +=
                `
            <div class="product">
                <div class="imgContainer">
                    <img id="img_${arrProducts[i].id[0]}" class="product__Img" src="${arrProducts[i].productImg[0]}" alt="">
                    <img id="img_${arrProducts[i].id[1]}" class="product__Img display" src="${arrProducts[i].productImg[1]}" alt="">
                </div>
                <div class="detailBox">
                    <p class="product__bestSellerText">${arrProducts[i].introduceText}</p>
                    <p class="product__name">${arrProducts[i].productName}</p>
                </div>
                <div class="buttonBox">
                    <div class="sizeButtonBox__container">
                        ${createSizeButton(arrProducts[i])}
                    </div>
                    <button class="statusButtonBox">
                        ${checkStatus(arrProducts[i])}
                    </button>
                </div>
            </div>
            `
        }
    }
    //show total quantity of product in user cart
    if (localStorage.getItem("CheckLogin")) {
        let usersList = JSON.parse(localStorage.getItem("usersList"));
        let userCart = usersList.find(user=>user.id == localStorage.getItem("CheckLogin")).cart;
        document.getElementById("cartBox__totalProducts").innerText = userCart.reduce((result,nextItem)=>{return result + nextItem.quantity},0)
    };
    document.getElementById("total").innerText = `${innerTotal} PRODUCTS`
    document.getElementById("productContainer").innerHTML = renderInner;
    
}
renderProduct(productsList)


//create size button
function createSizeButton(product){
    let createSizeButtonInner="";
    if(product.size.length>1){
        createSizeButtonInner =
        `
        <button id="sizebtn_${product.id[0]}" onclick="displayBySize(${product.id[0]})" class="sizeButton">${product.size[0]} oz</button>
        <button id="sizebtn_${product.id[1]}" onclick="displayBySize(${product.id[1]})" class="sizeButton">${product.size[1]} oz</button>
        `;
    }else{
        createSizeButtonInner =
        `
        <button id="sizebtn_${product.id}" onclick="displayBySize(${product.id})" class="sizeButton">${product.size} oz</button>
        `
    }
    
    return createSizeButtonInner
}

//create status and add to bag button
function checkStatus(product) {
    let addToBagButtonInner = "";
    let productStatus = product.status;
    if (productStatus == "Available"){
        if (product.size.length>1) {
            for (let i=0 ; i<product.size.length ; i++) {
                addToBagButtonInner +=
                `
                <div id="addToBagButton_${product.id[i]}" class="addToBag" onclick="addToBag(${product.id[i]})">
                    <p>Add To Bag</p>
                    <div class="priceContainer">
                        <div>
                            <p id="price${product.id[i]}">${product.price[i]}</p>
                        </div>
                        <p class="display" id="price${product.id[i]}">${product.price[i]}</p>
                    </div>
                </div>
                `
            } 
            return addToBagButtonInner
        }else {
            addToBagButtonInner =
            `
            <div id="addToBagButton_${product.id}" class="addToBag" onclick="addToBag(${product.id})">
                <p>Add To Bag</p>
                <div class="priceContainer">
                    <div>
                        <p id="price${product.id}">${product.price}</p>
                    </div>
                    <p class="display" id="price${product.id}">${product.price}</p>
                </div>
            </div>
            `
        }
        return addToBagButtonInner
    }if(productStatus == "Full Detail"){
        addToBagButtonInner = /* thiếu link */
        `
        <a id="addToBagButton_${product.id}" class="addToBag link" href=""> 
            <p>See Full Detail</p>
            <div class="priceContainer">
                <div>
                    <p id="price${product.id}">${product.price}</p>
                </div>
                <p class="display" id="price${product.id}">${product.price}</p>
            </div>
        </a>
        `
        return addToBagButtonInner
    }if(productStatus == "Sold Out"){
        addToBagButtonInner =
        `
            <div id="addToBagButton_${product.id}" class="Notify-Me" onclick="soldOutAlert()">
                <p>Sold Out</p>
            </div>
        `
        return addToBagButtonInner
    }if(productStatus == "Notify Me"){
        addToBagButtonInner =/* thiếu chức năng */
        `
            <div id="addToBagButton_${product.id}" class="Notify-Me" onclick="notifyMe()">
                <p>Notify Me</p>
            </div>
        `
        return addToBagButtonInner
    }
    
}

//alert for which product was sold out
function soldOutAlert() {
    alert("this product was sold out!")
}

//function click size button detail will change by product size
function displayBySize(ProductId) {
    for (const i in productsList) {
        if (productsList[i].id.length >1) {
            for (const j in productsList[i].id) {
                if (productsList[i].id[j]==ProductId) {
                    document.getElementById(`img_${ProductId}`).style.display="block";
                    document.getElementById(`addToBagButton_${ProductId}`).style.display="";
                    hiddenBySize(productsList[i],ProductId);
                    return;
                }
            }
        }   
    }
}

//hidden which info isn't the info of choosing size
function hiddenBySize(item,ProductId){
    for (const i in item.id) {
        if (item.id[i]!=ProductId) {
            document.getElementById(`img_${item.id[i]}`).style.display="none";
            document.getElementById(`addToBagButton_${item.id[i]}`).style.display="none";
        }
    }
}

//make the default hidden detail for each product
for (const x in productsList) {
    if (productsList[x].size.length>1) {
        hiddenBySize(productsList[x],productsList[x].id[0])
    }
}

//check user was login yet
function checkLogin() {
    let usersList = JSON.parse(localStorage.getItem("usersList"));
    let nameDisplay = document.getElementById("userDetailName");
    let avatarDisplay = document.getElementById("userDetailImg");
    if (localStorage.getItem("CheckLogin")) {
        let CheckLogin = localStorage.getItem("CheckLogin");
        document.getElementById("login_icon").style.display = "none";
        document.getElementById("logout_icon").style.display = "block";
        nameDisplay.style.display = "block";
        nameDisplay.innerText = "Hi," + (usersList.find(item => item.id == CheckLogin).fistName)
        avatarDisplay.style.display = "block"
        avatarDisplay.src = usersList.find(item => item.id == CheckLogin).avatar;
    } else {
        document.getElementById("login_icon").style.display = "block";
        document.getElementById("logout_icon").style.display = "none";
        document.getElementById("userDetailName").style.display = "none";
        document.getElementById("userDetailImg").style.display = "none";
    }

}
checkLogin()

//log out and clear CheckLogin storage
function logout() {
    localStorage.removeItem("CheckLogin")
    checkLogin()
}

//add product to user cart then render again
function addToBag(id) {
    let usersList = JSON.parse(localStorage.getItem("usersList"));
   if(localStorage.getItem("CheckLogin")){
    //find user cart
    let checkLogin=localStorage.getItem("CheckLogin");
    let userCart=usersList.find(user => user.id == checkLogin).cart;
    if (checkLogin == null) {
        alert("Should login before add product to cart!")
        return;
    }else{
        //find product detail
        for (let i=0 ; i < productsList.length ; i++) {
            //for which product have 2 size above
            if (productsList[i].id.length>1) {
                for (let j=0 ; j< productsList[i].id.length ;j++ ) {
                    if (productsList[i].id[j]==id) {
                        let buyingProduct={
                            id:productsList[i].id[j],
                            productImg:productsList[i].productImg[j],
                            introduceText:productsList[i].introduceText,
                            productName:productsList[i].productName,
                            status:productsList[i].status,
                            rating:productsList[i].rating,
                            size:productsList[i].size[j],
                            price:productsList[i].price[j],
                            quantity:1
                        }
                        let result= userCart.filter(item =>{
                            return item.id == id
                        })
                        if(result.length==0){
                            userCart.push(buyingProduct)
                            localStorage.setItem("usersList",JSON.stringify(usersList))
                            renderProduct(productsList)
                            return;
                        }else{
                            let inCart = userCart.find(item=> item.id == id)
                            inCart.quantity+=1
                            localStorage.setItem("usersList",JSON.stringify(usersList))
                            renderProduct(productsList)
                            return;
                        }
                    }
                }
            }else if(productsList[i].id == id){
                let product = productsList.find(item => item.id == id) || {}
                let buyingProduct={
                    id:product.id,
                    productImg:product.productImg,
                    introduceText:product.introduceText,
                    productName:product.productName,
                    status:product.status,
                    rating:product.rating,
                    size:product.size,
                    price:product.price,
                    quantity:1
                }
            let result= userCart.filter(item =>{
                return item.id == id
            })
            if(result.length==0){
                userCart.push(buyingProduct)
                localStorage.setItem("usersList",JSON.stringify(usersList))
                renderProduct(productsList)
                return
            }else{
                let inCart = userCart.find(item=> item.id == id)
                inCart.quantity+=1
                localStorage.setItem("usersList",JSON.stringify(usersList))
                renderProduct(productsList)
                return
            }
            }
        }
    }  
    }
}


//item Sort by Price or rating
let PriceSortFlag=false;
function sortByPrice() {
    let productList= JSON.parse(localStorage.getItem("productsList"));
    if(PriceSortFlag){
        let productSort= productList.sort((a,b)=>{
            return a.price-b.price
        })
        console.log("11111",productSort);
    }else{
        let productSort= productList.sort((a,b)=>{
            return b.price-a.price
        })
        console.log("222222",productSort);
    }
    PriceSortFlag=!PriceSortFlag;
    renderProduct(productList)   
}

function sortByRate() {
    let productList= JSON.parse(localStorage.getItem("productsList"));
        let productSort= productList.sort((a,b)=>{
            return b.rating-a.rating
        })
        console.log(productSort);
    renderProduct(productList)
}

//remove input accent and upper case when search
function removeAccentLowerCase(str) {
    return str.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();
}

//search product by name 
function search() {
    let allProduct = [...JSON.parse(localStorage.getItem("productsList"))]
    let searchInput = document.getElementById("search_input").value;
    allProduct = allProduct.filter(item => removeAccentLowerCase(item.productName).includes(removeAccentLowerCase(searchInput)))
    renderProduct(allProduct)
}

//hidden search input
function search_input_display() {
    document.getElementById("search_input").classList.toggle("expanded")
}