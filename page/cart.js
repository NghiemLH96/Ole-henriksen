let usersList = JSON.parse(localStorage.getItem("usersList"))

/* check user already login yet */
function checkLogin() {
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
        alert("you should to login first before access shopping cart")
        window.location.href = "../index.html"
    }

}
checkLogin()

/* render product in cart */
let userCarts = usersList.find(user => user.id == localStorage.getItem("CheckLogin")).cart;
function renderCartProduct(cartProducts) {
    if (localStorage.getItem("CheckLogin")) {
        let userCartInner = "";
        let sumaryInner="";
        for (let i = 0; i < cartProducts.length; i++) {
            userCartInner +=
                `
            <tr>
                <td>${i+1}</td>
                <td class="tbody__imgContainer"><img class="tbody__productImg" src=".${cartProducts[i].productImg}" alt=""></td>
                <td >${cartProducts[i].productName}</td>
                <td >${cartProducts[i].size} oz</td>
                <td >${cartProducts[i].price} /pc</td>
                <td >
                <button onclick="adjustQuantity(${cartProducts[i].id},'-')" class="tbody__adjustBtn">-</button>
                ${cartProducts[i].quantity}
                <button onclick="adjustQuantity(${cartProducts[i].id},'+')" class="tbody__adjustBtn">+</button>
                </td>
                <td >${cartProducts[i].quantity*cartProducts[i].price}</td>
                <td><button onclick="deleteItem(${cartProducts[i].id})" class="tbody__deleteBtn">Delete</button></td>
            </tr>
            `
        }
        //show total quantity of products in user cart
        let userCart = usersList.find(user=>user.id == localStorage.getItem("CheckLogin")).cart;
        document.getElementById("cartBox__totalProducts").innerText = userCart.reduce((result,nextItem)=>{return result + nextItem.quantity},0)
        //show sumary of tfoot
        sumaryInner =
        `
            <th colspan="4">Total Item:  ${cartProducts.reduce((result,nextItem)=>{
                return result + nextItem.quantity
            },0)}</th>
            <th colspan="4">Total Cost:  ${cartProducts.reduce((result,nextItem)=>{
                return result + (nextItem.quantity*nextItem.price)
            },0)}</th>
        `
        document.getElementById("renderProductTable__tfoot").innerHTML=sumaryInner;
        document.getElementById("renderProductTable__tbody").innerHTML=userCartInner;
    }
}
renderCartProduct(userCarts)


/* delete product in user cart */
function deleteItem(productId){
    if (confirm("Do you submit to remove this product?")) {
        userCarts=userCarts.filter(item => item.id != productId);
        usersList=usersList.map(user =>{
            if(user.id == localStorage.getItem("CheckLogin")){
                user.cart = userCarts
                return user
            }
            return user
        })
        renderCartProduct(userCarts)
        localStorage.setItem("usersList",JSON.stringify(usersList));
    }else{
        return;
    }
}

/* update product in cart */
function adjustQuantity(productId,type) {
    let user = usersList.find(user => user.id == localStorage.getItem("CheckLogin"))
    let product = user.cart.find(product => product.id == productId)
    if (type == '-') {
        if (product.quantity>1) {
            product.quantity-=1;
        }else{
            deleteItem(productId)
        }
    }else{
        product.quantity+=1;
    }
    localStorage.setItem("usersList",JSON.stringify(usersList))
    renderCartProduct(userCarts)
}

//log out and clear CheckLogin storage
function logout() {
    localStorage.removeItem("CheckLogin")
    window.location.href="../index.html"
}

//remove accent and uppercase of search input
function removeAccentLowerCase(str) {
    return str.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();
}

//search product by name
function search() {
    let userCarts = [...usersList.find(user => user.id == localStorage.getItem("CheckLogin")).cart];
    let searchInput = document.getElementById("search_input").value;
    userCarts = userCarts.filter(item => removeAccentLowerCase(item.productName).includes(removeAccentLowerCase(searchInput)))
    renderCartProduct(userCarts)
}

//hidden search input
function search_input_display() {
    document.getElementById("search_input").classList.toggle("expanded")
}

//check out user cart
function checkOut(){
    let checkOutOrders = JSON.parse(localStorage.getItem("checkOutOrders")) || [];
    let user = usersList.find(user => user.id == localStorage.getItem("CheckLogin"))
    let checkOutCart = {...user}
    if (checkOutCart.cart.length) {
        checkOutCart.orderId = new Date()*Math.random()
        checkOutOrders.push(checkOutCart)
        localStorage.setItem("checkOutOrders",JSON.stringify(checkOutOrders))
        user.cart = [];
        localStorage.setItem("usersList",JSON.stringify(usersList));
        renderCartProduct(user.cart)
    }
}