if (!(localStorage.getItem("AdminLogin"))) {
    alert("you should sign first before access admin page!")
    window.location.href="./admin-login.html"
}

function renderAdminInfo() {
    let adminInfo = JSON.parse(localStorage.getItem("usersList")).find(admin => admin.id == localStorage.getItem("AdminLogin"))
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
    let UsersList = JSON.parse(localStorage.getItem("usersList"));
    let tableInner="";
    tableInner +=
    `
    <table class="userManagerTable" border="1px solid black">
        <thead id="userManagerTable__thead">
            <th>#</th>
            <th>ID</th>
            <th>Avatar</th>
            <th>Full Name</th>
            <th>Email Address</th>
            <th>Action</th>
        </thead>
        <tbody id="userManagerTable__tbody"></tbody>
        <tfoot id="userManagerTable__tfoot">
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
            <td>${i+1}</td>
            <td>${UsersList[i].id}</td>
            <td class="userManagerTable__tbody__avatar"><img class="userManagerTable__userAvatar" src="${UsersList[i].avatar}" alt=""></td>
            <td>${UsersList[i].fistName} ${UsersList[i].lastName}</td>
            <td>${UsersList[i].email}</td>
            <td>
                <button id="Block__btn${UsersList[i].id}" class="userManagerTable__buttonBox__button blockBtn">Block</button>
                <button id="Block__btn${UsersList[i].id}" class="userManagerTable__buttonBox__button unblockBtn" style="display: none;">Unblock</button>
                <button class="userManagerTable__buttonBox__button removeBtn">Remove</button>
            </td>
        </tr>
        `
        }
        document.getElementsByClassName("working-container")[0].innerHTML=tableInner;
        document.getElementById("userManagerTable__tbody").innerHTML=tbodyInner;
}

function changeWorkingPage(target){
    let targetList = document.getElementsByClassName("navbar__link");
    
    if (target == 'ADMIN INFO') {
        document.getElementsByClassName("productList__title")[0].innerText='ADMINISTRATOR'
        renderAdminInfo()
    }if(target == 'USERS MANAGER'){
        document.getElementsByClassName("productList__title")[0].innerText='USERS MANAGER'
        renderUserManager()
    }
    for (const i in targetList) {
        if (targetList[i].innerText == target) {
            targetList[i].classList.add("navbar__link__active");
        }if(targetList[i].innerText != target && targetList[i].innerText != undefined){
            targetList[i].classList.remove("navbar__link__active");
        }
    }
}