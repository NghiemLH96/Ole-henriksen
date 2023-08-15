if (localStorage.getItem("CheckLogin")) {
    let UsersList = JSON.parse(localStorage.getItem("usersList"));
    let user = UsersList.find(item => item.id == localStorage.getItem("CheckLogin") )
    if (user.role == "1") {
        window.location.href="./admin-index.html"
    }
}

let AdminList=JSON.parse(localStorage.getItem("usersList")).filter(admin => admin.role == "1")
console.log(AdminList);
/* validate email */
let validate = {
    isEmail: function (emailString) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailString)
    }
}

function checkInfo(info){
    let adminInfo={
        email:info.target.email.value,
        password:info.target.password.value,
    }
    /* check email format is it correct */
    if (!(validate.isEmail(adminInfo.email))) {
        document.getElementById("email_formatError").style.display="block";
        document.getElementById("email_notExist").style.display="none";
        return
    }else{
        document.getElementById("email_formatError").style.display="none";
        document.getElementById("email_notExist").style.display="none";
    }
    if(AdminList){
        let admin=AdminList.find(item=> item.email == adminInfo.email)
        if (!admin) {
            document.getElementById("email_notExist").style.display="block";
            document.getElementById("email_formatError").style.display="none";
            document.getElementById("password_incorrect").style.display="none";
            document.getElementById("password_formatError").style.display="none";
            return
        }
        if(admin){
            document.getElementById("email_notExist").style.display="none";
            if (adminInfo.password.length<8) {
                document.getElementById("password_formatError").style.display="block";
                document.getElementById("password_incorrect").style.display="none"
            }else if(admin.password==adminInfo.password){
                localStorage.setItem("AdminLogin",admin.id)
                alert("Sign in successed")
                window.location.href="./admin-index.html"
                return
            }else{
                document.getElementById("password_incorrect").style.display="block"
                document.getElementById("password_formatError").style.display="none";
            }
        }
    }else{
        alert("Server is busy now , please try again later")
    }
}

function login(event) {
    /* avoid submit of event form */
    event.preventDefault();
    checkInfo(event)   
}