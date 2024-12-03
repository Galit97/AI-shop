function login() {
    try {
        var loginPage_1 = document.getElementById('popupLogin'); /* אני תופס את הפופ אפ כניסה כדי לא להציג אותו בהתחלה */
        if (!loginPage_1)
            throw new Error('Popup element not found');
        loginPage_1.style.display = 'none';
        var openLoginPage = document.getElementById('login');
        var closeLoginButton = document.getElementById('closePopupLoginButton');
        if (!openLoginPage || !closeLoginButton || !loginPage_1)
            throw new Error('Open/close buttons not found');
        if (!openLoginPage || !closeLoginButton)
            throw new Error('Open/close buttons not found');
        // פעולה לפתיחת הפופ-אפ
        openLoginPage.onclick = function () {
            loginPage_1.style.display = 'flex'; // מציג את הפופ-אפ
        };
        // פעולה לסגירת הפופ-אפ
        closeLoginButton.onclick = function () {
            loginPage_1.style.display = 'none'; // מסתיר את הפופ-אפ
        };
        // אפשרות לסגור את הפופ-אפ כשעושים קליק מחוץ לו
        window.onclick = function (event) {
            if (event.target === loginPage_1) {
                loginPage_1.style.display = 'none';
            }
        };
    }
    catch (err) {
        console.error(err);
    }
}
;
function normalLogin() {
    alert("אנחנו עובדים על זה");
}
function googleLogin() {
    alert("סבלנות בבקשה, אנחנו על זה");
}
