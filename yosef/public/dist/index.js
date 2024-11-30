function showRegisterLoginMenu() {
    try {
        var button = document.getElementById('loginRegisterButton');
        var openMenu_1 = document.getElementById('openMenu');
        button.addEventListener('mouseenter', function () {
            openMenu_1.style.display = 'block'; // הצג את האלמנט
        });
        // button.addEventListener('mouseleave', () => {
        // openMenu.style.display = 'none'; // החבא את האלמנט
        // });
    }
    catch (error) {
        console.error('Error:', error);
    }
}
showRegisterLoginMenu();
