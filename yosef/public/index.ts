function showRegisterLoginMenu(){
    try{
        const button = document.getElementById('loginRegisterButton') as HTMLElement;
        const openMenu = document.getElementById('openMenu') as HTMLElement;

        button.addEventListener('mouseenter', () => {
            openMenu.style.display = 'block'; // הצג את האלמנט
        });

        // button.addEventListener('mouseleave', () => {
        // openMenu.style.display = 'none'; // החבא את האלמנט
        // });
    }
    catch(error){
        console.error('Error:', error);
    }
}

showRegisterLoginMenu()