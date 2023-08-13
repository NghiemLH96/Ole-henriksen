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
        nameDisplay.innerText = (usersList.find(item => item.id == CheckLogin).fistName) + (usersList.find(item => item.id == CheckLogin).lastName);
        avatarDisplay.style.display = "block"
        avatarDisplay.src = usersList.find(item => item.id == CheckLogin).avatar;
    } else {
        alert("you should to login first before access shopping cart")
        window.location.href = "../index.html"
    }

}
checkLogin()

/* render product in cart */
let userCart = usersList.find(user => user.id == localStorage.getItem("CheckLogin")).cart;
function renderCartProduct() {
    if (localStorage.getItem("CheckLogin")) {
        let userCartInner = "";
        let sumaryInner="";
        for (let i = 0; i < userCart.length; i++) {
            userCartInner +=
                `
            <tr>
                <td>${i+1}</td>
                <td class="tbody__imgContainer"><img class="tbody__productImg" src=".${userCart[i].productImg}" alt=""></td>
                <td >${userCart[i].productName}</td>
                <td >${userCart[i].size}</td>
                <td >${userCart[i].price} /pc</td>
                <td >
                <button onclick="adjustQuantity(${userCart[i].id},'-')" class="tbody__adjustBtn">-</button>
                ${userCart[i].quantity}
                <button onclick="adjustQuantity(${userCart[i].id},'+')" class="tbody__adjustBtn">+</button>
                </td>
                <td >${userCart[i].quantity*userCart[i].price}</td>
                <td><button onclick="deleteItem(${userCart[i].id})" class="tbody__deleteBtn">Delete</button></td>
            </tr>
            `
        }
        sumaryInner =
        `
            <th colspan="4">Total Item:  ${userCart.reduce((result,nextItem)=>{
                return result + nextItem.quantity
            },0)}</th>
            <th colspan="4">Total Cost:  ${userCart.reduce((result,nextItem)=>{
                return result + (nextItem.quantity*nextItem.price)
            },0)}</th>
        `
        document.getElementById("renderProductTable__tfoot").innerHTML=sumaryInner;
        document.getElementById("renderProductTable__tbody").innerHTML=userCartInner;
    }
}
renderCartProduct()


/* delete product in user cart */
function deleteItem(productId){
    if (confirm("Do you submit to remove this product?")) {
        userCart=userCart.filter(item => item.id != productId);
        usersList=usersList.map(user =>{
            if(user.id == localStorage.getItem("CheckLogin")){
                user.cart = userCart
                return user
            }
            return user
        })
        renderCartProduct()
        console.log(usersList);
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
    renderCartProduct()
}