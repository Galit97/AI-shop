"use strict";
exports.__esModule = true;
exports.register = void 0;
function register() {
    try {
        var registerPage_1 = document.getElementById('popupRegister'); /* אני תופס את הפופ אפ הרשמה כדי לא להציג אותו בהתחלה */
        if (!registerPage_1)
            throw new Error('Popup element not found');
        registerPage_1.style.display = 'none';
        var openRegisterPage = document.getElementById('register');
        var closeRegisterButton = document.getElementById('closePopupRegisterButton');
        openRegisterPage.onclick = function () {
            registerPage_1.style.display = 'flex';
        };
        closeRegisterButton.onclick = function () {
            registerPage_1.style.display = 'none';
        };
        window.onclick = function (event) {
            if (event.target === registerPage_1) {
                registerPage_1.style.display = 'none';
            }
        };
    }
    catch (err) {
        console.error(err);
    }
}
exports.register = register;
function normalLogin() {
    alert("אנחנו עובדים על זה");
}
function googleLogin() {
    alert("סבלנות בבקשה, אנחנו על זה");
}
