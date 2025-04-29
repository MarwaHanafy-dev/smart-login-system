// general variable
let usersinfo = JSON.parse(localStorage.getItem("users")) || [];

// DOM login element
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginBtn = document.getElementById("loginBtn");

const usernameInput = document.getElementById("usernameInput");
const userEmailInput = document.getElementById("userEmailInput");
const userPasswordInput = document.getElementById("userPasswordInput");
const signupBtn = document.getElementById("signupBtn");

// أحداث عند تحميل الصفحة
if (loginBtn) {
    loginBtn.addEventListener("click", login);
}

if (signupBtn) {
    signupBtn.addEventListener("click", signUp);
}

// login 
function login() {
    const fillMsg = document.getElementById("fillMsg");
    const wrongMsg = document.getElementById("wrongMsg");

    // hide old message
    fillMsg.classList.add("d-none");
    wrongMsg.classList.add("d-none");

    // التحقق من الحقول الفارغة
    if (!loginEmail.value || !loginPassword.value) {
        fillMsg.classList.remove("d-none");
        return;
    }

    // البحث عن المستخدم
    const user = usersinfo.find(user => 
        user.email === loginEmail.value && 
        user.password === CryptoJS.SHA256(loginPassword.value).toString()
    );

    if (user) {
        localStorage.setItem("sessionUsername", user.name);
        window.location.href = "welcome.html";
    } else {
        wrongMsg.classList.remove("d-none");
    }
}

// signUp
function signUp() {
    // إخفاء جميع الرسائل
    document.querySelectorAll(".text-danger, .text-success").forEach(el => {
        el.classList.add("d-none");
    });

    // التحقق من صحة البيانات
    if (!userInputsValidation() || isExist()) {
        document.getElementById("tryAgainMsg").classList.remove("d-none");
        return;
    }

    // إنشاء حساب جديد
    const newUser = {
        name: usernameInput.value,
        email: userEmailInput.value,
        password: CryptoJS.SHA256(userPasswordInput.value).toString()
    };

    usersinfo.push(newUser);
    localStorage.setItem("users", JSON.stringify(usersinfo));

    // إظهار رسالة النجاح
    document.getElementById("confirmMsg").classList.remove("d-none");
    document.getElementById("signin").classList.remove("d-none");
}

//  usernameValidation
function usernameValidation() {
    const regex = /^[\u0600-\u06FF\s]{3,}$/; // تقبل الأحرف العربية والفراغات
    const isValid = regex.test(usernameInput.value);
    
    usernameInput.classList.toggle("is-valid", isValid);
    usernameInput.classList.toggle("is-invalid", !isValid);
    document.getElementById("usernameAlert").classList.toggle("d-none", isValid);
    
    return isValid;
}

// userEmailValidation
function userEmailValidation() {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = regex.test(userEmailInput.value);
    
    userEmailInput.classList.toggle("is-valid", isValid);
    userEmailInput.classList.toggle("is-invalid", !isValid);
    document.getElementById("userEmailAlert").classList.toggle("d-none", isValid);
    
    return isValid;
}

// userPasswordValidation
function userPasswordValidation() {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isValid = regex.test(userPasswordInput.value);
    
    userPasswordInput.classList.toggle("is-valid", isValid);
    userPasswordInput.classList.toggle("is-invalid", !isValid);
    document.getElementById("userPasswordAlert").classList.toggle("d-none", isValid);
    
    return isValid;
}

// دالة التحقق من وجود حساب مسبقاً
function isExist() {
    const exists = usersinfo.some(user => 
        user.email === userEmailInput.value
    );
    
    if (exists) {
        document.getElementById("accountExistMsg").classList.remove("d-none");
    }
    
    return exists;
}

// userInputsValidation
function userInputsValidation() {
    return usernameValidation() && userEmailValidation() && userPasswordValidation();
}

// displayWelcomeUser
function displayWelcomeUser() {
    const username = localStorage.getItem("sessionUsername");
    if (username) {
        document.getElementById("username").textContent = `مرحباً ${username}`;
    } else {
        window.location.href = "index.html";
    }
}

// displayWelcomeUser
function logout() {
    localStorage.removeItem("sessionUsername");
}