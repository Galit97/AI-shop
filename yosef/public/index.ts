const loginRegisterButton = document.querySelector('.login-register') as HTMLElement | null;
const openMenu = document.getElementById('openMenu') as HTMLElement | null;

if (loginRegisterButton && openMenu) {
  loginRegisterButton.addEventListener('mouseover', () => {
    openMenu.style.display = 'block';
  });

  const closeMenu = () => {
    openMenu.style.display = 'none';
  };

  loginRegisterButton.addEventListener('mouseleave', closeMenu);
  openMenu.addEventListener('mouseleave', closeMenu);

  openMenu.addEventListener('mouseover', () => {
    openMenu.style.display = 'block';
  });
}