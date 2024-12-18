function handleLogout() {
    var logoutLink = document.querySelector('a[href="../index.html"]');
    if (logoutLink) {
        logoutLink.addEventListener('click', function (event) {
            event.preventDefault();
            sessionStorage.clear();
            localStorage.removeItem('authToken');
            localStorage.removeItem('Email');
            window.location.href = "../index.html";
        });
    }
    else {
        console.error('Logout link not found in the DOM');
    }
}
handleLogout();
