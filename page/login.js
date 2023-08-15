
if (localStorage.getItem("CheckLogin")) {
    window.location.href = "../index.html"
}

let usersList = JSON.parse(localStorage.getItem("usersList")) || []
/* validate email */
let validate = {
    isEmail: function (emailString) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailString)
    }
}

function checkInfo(info) {
    let userInfo = {
        email: info.target.email.value,
        password: info.target.password.value,
    }
    /* check email format is it correct */
    if (!(validate.isEmail(userInfo.email))) {
        document.getElementById("email_formatError").style.display = "block";
        document.getElementById("email_notExist").style.display = "none";
        return
    } else {
        document.getElementById("email_formatError").style.display = "none";
        document.getElementById("email_notExist").style.display = "none";
    }
    if (usersList) {
        let user = usersList.find(item => item.email == userInfo.email)
        if (!user) {
            document.getElementById("email_notExist").style.display = "block";
            document.getElementById("email_formatError").style.display = "none";
            document.getElementById("password_incorrect").style.display = "none";
            document.getElementById("password_formatError").style.display = "none";
            return
        }
        if (user) {
            document.getElementById("email_notExist").style.display = "none";
            if (userInfo.password.length < 8) {
                document.getElementById("password_formatError").style.display = "block";
                document.getElementById("password_incorrect").style.display = "none"
            } else if (user.password == userInfo.password) {
                if (user.status == `block`) {
                    alert("this account was blocked , please administrator for more detail !")
                }else{
                    localStorage.setItem("CheckLogin", user.id)
                    alert("Sign in successed")
                    window.location.href = "../index.html"
                    return
                }
            } else {
                document.getElementById("password_incorrect").style.display = "block"
                document.getElementById("password_formatError").style.display = "none";
            }
        }
    } else {
        alert("Server is busy now , please try again later")
    }
}

function login(event) {
    /* avoid submit of event form */
    event.preventDefault();
    checkInfo(event)
}