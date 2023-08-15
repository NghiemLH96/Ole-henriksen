if (localStorage.getItem("CheckLogin")) {
    let UsersList = JSON.parse(localStorage.getItem("usersList"));
    let user = UsersList.find(item => item.id == localStorage.getItem("CheckLogin") )
    if (user.role == "1") {
        
    }else{
        alert("Only administrator can access admin page!")
        window.location.href="../index.html"
    }
}

function renderAdminInfo() {
    let adminInfo = JSON.parse(localStorage.getItem("usersList")).find(admin => admin.id == localStorage.getItem("CheckLogin"))
    let infoInner = 
    `
    <div class="adminInfoBox">
        <img class="adminInfoBox__avatar" src="${adminInfo.avatar}" alt="">
        <div class="adminInfoBox__Detail">
            <p>Admin ID: ${adminInfo.id}</p>
            <p>First name: ${adminInfo.fistName}</p>
            <p>Last name: ${adminInfo.lastName}</p>
            <p>Email address: ${adminInfo.email}</p>
        </div> 
    </div>
        
    `
    document.getElementsByClassName("working-container")[0].innerHTML=infoInner
}
changeWorkingPage("ADMIN INFO")

function renderUserManager(){
    let UsersList = JSON.parse(localStorage.getItem("usersList")) || [];
    let tableInner="";
    tableInner +=
    `
    <table class="userManagerTable" border="1px solid black">
        <thead id="userManagerTable__thead" class="userManagerTable__thead">
            <th>#</th>
            <th>ID</th>
            <th>Avatar</th>
            <th>Full Name</th>
            <th>Email Address</th>
            <th>Action</th>
        </thead>
        <tbody id="userManagerTable__tbody" class="userManagerTable__tbody"></tbody>
        <tfoot id="userManagerTable__tfoot" class="userManagerTable__tfoot">
            <td colspan="3">Total user</td>
            <td colspan="3">${UsersList.length}</td>
        </tfoot>
    </table>
    `
    let tbodyInner="";
    for (const i in UsersList) {
        tbodyInner+=
        `
        <tr>
            <td>${Number(i)+1}</td>
            <td>${UsersList[i].id}</td>
            <td class="userManagerTable__tbody__avatar"><img class="userManagerTable__userAvatar" src="${UsersList[i].avatar}" alt=""></td>
            <td>${UsersList[i].fistName} ${UsersList[i].lastName}</td>
            <td>${UsersList[i].email}</td>
            <td>
                <button id="upgradeAccount__btn${UsersList[i].id}" class="userManagerTable__buttonBox__button permissionAdjust" onclick="permissionAdjust(${UsersList[i].id})">Permission</button>
                <button id="block__btn${UsersList[i].id}" class="userManagerTable__buttonBox__button blockBtn" onclick="blockUser(${UsersList[i].id})">Block</button>
                <button id="unblock__btn${UsersList[i].id}" class="userManagerTable__buttonBox__button unblockBtn" style="display: none;" onclick="unblockUser(${UsersList[i].id})">Unblock</button>
                <button id="removeUser__btn${UsersList[i].id}" class="userManagerTable__buttonBox__button removeBtn" onclick="removeUser(${UsersList[i].id})">Remove</button>
            </td>
        </tr>
        `
    }
    document.getElementsByClassName("working-container")[0].innerHTML=tableInner;
    document.getElementById("userManagerTable__tbody").innerHTML=tbodyInner;
    for (const i in UsersList) {
    checkAccountStatus(UsersList[i].id)
    }
}

function renderProductManager() {
    let productsList= JSON.parse(localStorage.getItem("productsList"));
    let tableInner="";
    tableInner +=
    `
    <table class="userManagerTable" border="1px solid black">
        <thead id="userManagerTable__thead" class="userManagerTable__thead">
            <th>#</th>
            <th>ID</th>
            <th>Product Image</th>
            <th>Product Name</th>
            <th>Status</th>
            <th>Price</th>
            <th>Action</th>
        </thead>
        <tbody id="userManagerTable__tbody" class="userManagerTable__tbody"></tbody>
        <tfoot id="userManagerTable__tfoot" class="userManagerTable__tfoot">
            <td colspan="4">Total user</td>
            <td colspan="3">${productsList.length}</td>
        </tfoot>
    </table>
    `
    let productInner = "";
    for (const i in productsList) {
        if (productsList[i].id.length>1) {
            for (const j in productsList[i].id) {
                productInner+=
                `
                <tr>
                    <td></td>
                    <td>${productsList[i].id[j]}</td>
                    <td><img class="userManagerTable__userAvatar" src=".${productsList[i].productImg[j]}" alt=""></td>
                    <td>${productsList[i].productName} ${productsList[i].size[j]+"oz"}</td>
                    <td>${productsList[i].status}</td>
                    <td>${productsList[i].price[j]} vnđ</td>
                    <td>
                        <button class="ProductManager__btn price__btn" onclick="priceAdjust(${productsList[i].id[j]})">Price</button>
                        <button class="ProductManager__btn status__btn" onclick="statusAdjust(${productsList[i].id[j]})">Status</button>
                        <button class="ProductManager__btn removeBtn" onclick="removeProduct(${productsList[i].id[j]})">Remove</button>
                    </td>
                </tr>
                `
            }
        }else{
            productInner+=
            `
            <tr>
                <td></td>
                <td>${productsList[i].id}</td>
                <td><img class="userManagerTable__userAvatar" src=".${productsList[i].productImg}" alt=""></td>
                <td>${productsList[i].productName}</td>
                <td>${productsList[i].status}</td>
                <td>${productsList[i].price} vnđ</td>
                <td>
                    <button class="ProductManager__btn price__btn" onclick="priceAdjust(${productsList[i].id})">Price</button>
                    <button class="ProductManager__btn status__btn" onclick="statusAdjust(${productsList[i].id})">Status</button>
                    <button class="ProductManager__btn removeBtn" onclick="removeProduct(${productsList[i].id})">Remove</button>
                </td>
            </tr>
            `
        }
        document.getElementsByClassName("working-container")[0].innerHTML=tableInner;
        document.getElementById("userManagerTable__tbody").innerHTML=productInner;
    }
    
}

function checkAccountStatus(id){
    let user = JSON.parse(localStorage.getItem("usersList")).find(item => item.id == id)
        if (user.status == `block`) {
            document.getElementById(`block__btn${user.id}`).style.display="none";
            document.getElementById(`unblock__btn${user.id}`).style.display="inline-block";
        }else if (user.status == `active`) {
            document.getElementById(`block__btn${user.id}`).style.display="inline-block";
            document.getElementById(`unblock__btn${user.id}`).style.display="none";
        }
}

function changeWorkingPage(target){
    let targetList = document.getElementsByClassName("navbar__link");
    
    if (target == 'ADMIN INFO') {
        document.getElementsByClassName("productList__title")[0].innerText='ADMINISTRATOR'
        renderAdminInfo()
    }if(target == 'USERS MANAGER'){
        document.getElementsByClassName("productList__title")[0].innerText='USERS MANAGER'
        renderUserManager()
    }if(target == 'PRODUCT MANAGER'){
        document.getElementsByClassName("productList__title")[0].innerText='PRODUCT MANAGER'
        renderProductManager()
    }
    for (const i in targetList) {
        if (targetList[i].innerText == target) {
            targetList[i].classList.add("navbar__link__active");
        }if(targetList[i].innerText != target && targetList[i].innerText != undefined){
            targetList[i].classList.remove("navbar__link__active");
        }
    }
}

function blockUser(userId){
    let userList=JSON.parse(localStorage.getItem("usersList")) || []
    let user = userList.find(user => user.id == userId);
    user.status="block"
    localStorage.setItem("usersList",JSON.stringify(userList));
    checkAccountStatus(userId)
}

function unblockUser(userId){
    let userList=JSON.parse(localStorage.getItem("usersList")) || []
    let user = userList.find(user => user.id == userId);
    user.status="active"
    localStorage.setItem("usersList",JSON.stringify(userList));
    checkAccountStatus(userId)
}

function removeUser(userId){
    if (confirm("Are you sure to remove this user?")) {
        let userList=JSON.parse(localStorage.getItem("usersList")) || []
        let newUserList = userList.filter(user => user.id != userId)
        localStorage.setItem("usersList",JSON.stringify(newUserList));
        renderUserManager()
    }
}

function adminLogout(){
    localStorage.removeItem("AdminLogin")
    window.location.href="../index.html"
}

function permissionAdjust(userId){

    let permission = prompt("Kindly input permission : regular user type 0 , adminstrator type 1");
    if (permission == 0 || permission == 1) {
        let usersList = JSON.parse(localStorage.getItem("usersList"));
        let user = usersList.find(item => item.id == userId);
        user.role = permission;
        localStorage.setItem("usersList",JSON.stringify(usersList));
    }else{
        alert("permission only be 0 or 1")
    }
}

function priceAdjust(productId){
    let price = prompt("Kindly input price!");
    if (price) {
        let productList = JSON.parse(localStorage.getItem("productsList"));
        for (const i in productList) {
            if (productList[i].id.length>1) {
                for (const j in productList[i].id) {
                    if (productList[i].id[j]==productId) {
                        productList[i].price[j]=price
                        localStorage.setItem("productsList",JSON.stringify(productList));
                        renderProductManager();
                        return
                    }
                }
            }else{
                if (productList[i].id == productId) {
                    productList[i].price = price;
                    localStorage.setItem("productsList",JSON.stringify(productList));
                    renderProductManager();
                    return
                }
            }
        }
    }else{
        alert("Price you input is not valid!")
    }   
}

function statusAdjust(productId) {
    let statusPromt= prompt("Kindly input status: 1.Available , 2.Sold Out , 3.Notify Me")
    if (statusPromt=="1" || statusPromt=="2" || statusPromt=="3") {
        let status;
        if (statusPromt == "1") {
            status="Available"
        }if(statusPromt == "2"){
            status="Sold Out"
        }if(statusPromt == "3"){
            status="Notify Me"
        }
        let productList = JSON.parse(localStorage.getItem("productsList"));
        let product = productList.find(item => item.id == productId);
        product.status = status;
        localStorage.setItem("productsList",JSON.stringify(productList));
        renderProductManager();
    }else{
        alert("Status you input is not valid!")
    }
}

function removeProduct(productId) {
    let productList = JSON.parse(localStorage.getItem("productsList"));
    for (const i in productList) {
        if (productList[i].id.length>1) {
            for (const j in productList[i].id) {
                if (productList[i].id[j] == productId) {
                    productList[i].id.splice(j,1);
                    productList[i].productImg.splice(j,1);
                    productList[i].price.splice(j,1)
                    productList[i].size.splice(j,1)
                    localStorage.setItem("productsList",JSON.stringify(productList));
                    console.log(productList);
                    renderProductManager();
                }
            }
        }else{
            let newProductList = productList.filter(item => item.id != productId);
            localStorage.setItem("productsList",JSON.stringify(newProductList));
            renderProductManager();
        }
    }
}