if (localStorage.getItem("CheckLogin")) {
    window.location.href = "../index.html"
}

/* validate email */
let validate = {
    isEmail: function (emailString) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailString)
    }
}

function validateInfo(user) {
    document.getElementById("lastNameEmpty").style.display = "none";
    document.getElementById("firstNameEmpty").style.display = "none";
    document.getElementById("emailError").style.display = "none";
    document.getElementById("emailExisted").style.display = "none";
    document.getElementById("emailEmpty").style.display = "none";
    document.getElementById("passwordError").style.display = "none";
    document.getElementById("passwordEmpty").style.display = "none";
    document.getElementById("passwordConfirmError").style.display = "none";
    document.getElementById("passwordConfirmEmpty").style.display = "none";
    document.getElementById("avatarError").style.display = "none";
    document.getElementById("avatarEmpty").style.display = "none";
    /* validate user firstName and lastName */
    let boolean = true;

    if (user.target.firstName.value == "") {
        document.getElementById("firstNameEmpty").style.display = "block"
        boolean = false
    } if (user.target.lastName.value == "") {
        document.getElementById("lastNameEmpty").style.display = "block";
        boolean = false
    } if (!(validate.isEmail(user.target.email.value)))/* validate user email */ {
        document.getElementById("emailError").style.display = "block";
        document.getElementById("emailExisted").style.display = "none";
        document.getElementById("emailEmpty").style.display = "none";
        boolean = false
    } if (user.target.email.value == "") {
        document.getElementById("emailError").style.display = "none";
        document.getElementById("emailExisted").style.display = "none";
        document.getElementById("emailEmpty").style.display = "block";
        boolean = false
    } if (localStorage.getItem("usersList")) {
        let usersList = JSON.parse(localStorage.getItem("usersList"));
        if (usersList.find(item => item.email == user.target.email.value)) {
            document.getElementById("emailError").style.display = "none";
            document.getElementById("emailExisted").style.display = "block";
            document.getElementById("emailEmpty").style.display = "none";
            boolean = false
        }
    }
    if (user.target.password.value.length < 8) /* validate user password & passwordConfirm */ {
        document.getElementById("passwordError").style.display = "block";
        document.getElementById("passwordEmpty").style.display = "none";
        boolean = false
    } if (user.target.password.value == "") {
        document.getElementById("passwordError").style.display = "none";
        document.getElementById("passwordEmpty").style.display = "block";
        boolean = false
    } if (user.target.password.value != user.target.passwordConfirm.value) {
        document.getElementById("passwordConfirmError").style.display = "block";
        document.getElementById("passwordConfirmEmpty").style.display = "none";
        boolean = false
    } if (user.target.passwordConfirm.value == "") {
        document.getElementById("passwordConfirmError").style.display = "none";
        document.getElementById("passwordConfirmEmpty").style.display = "block";
        boolean = false
    } if (user.target.password.value != user.target.passwordConfirm.value) {
        document.getElementById("passwordConfirmError").style.display = "block";
        document.getElementById("passwordConfirmEmpty").style.display = "none";
        boolean = false
    } if (user.target.passwordConfirm.value == "") {
        document.getElementById("passwordConfirmError").style.display = "none";
        document.getElementById("passwordConfirmEmpty").style.display = "block";
        boolean = false
    } if (!(user.target.avatar.value.startsWith("http://") || user.target.avatar.value.startsWith("https://"))) /* validate user avatar */ {
        document.getElementById("avatarError").style.display = "block"
        document.getElementById("avatarEmpty").style.display = "none"
        boolean = false
    } if (user.target.avatar.value == "") {
        document.getElementById("avatarError").style.display = "none"
        document.getElementById("avatarEmpty").style.display = "block"
        boolean = false
    }
    return boolean
}

function clearInput(info) {
    info.target.firstName.value = "";
    info.target.lastName.value = "";
    info.target.email.value = "";
    info.target.password.value = "";
    info.target.passwordConfirm.value = "";
    info.target.avatar.value = "";
}

function register(event) {
    /* avoid submit of event form */
    event.preventDefault();
    /* validate user info */
    if (!(validateInfo(event))) {
        return;
    }
    /* verify check usersList is it have any user yet */
    /* just need to verify info then push and save */
    if (localStorage.getItem("usersList")) {
        let usersList = JSON.parse(localStorage.getItem("usersList"));
        /* verify email is it existed */
        if (usersList.find(user => user.email == event.target.email.value)) {
            document.getElementById("emailExisted").style.display = "block"
            document.getElementById("emailError").style.display = "none"
            return;
        }
        /* push user info to userList */
        usersList.push({
            id: Date.now() * Math.random(),
            fistName: event.target.firstName.value,
            lastName: event.target.lastName.value,
            email: event.target.email.value,
            password: event.target.password.value,
            avatar: event.target.avatar.value,
            cart: [],
        })
        localStorage.setItem("usersList", JSON.stringify(usersList))
    } else {
        /* if userList wasn't exist it's meant this is the first user */
        /* so just directly save to a new localStorage */
        localStorage.setItem("usersList", JSON.stringify([{
            id: Date.now() * Math.random(),
            fistName: event.target.firstName.value,
            lastName: event.target.lastName.value,
            email: event.target.email.value,
            password: event.target.password.value,
            avatar: event.target.avatar.value,
            cart: [],
        }]))
    }
    /* Create success then transfer to another tab */
    clearInput(event)
    alert("Create Account Successed")
    window.location.href = "../index.html"
}