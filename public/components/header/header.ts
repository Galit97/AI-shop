const loginRegisterButton = document.querySelector('.login-register') as HTMLElement | null;
const openMenu = document.getElementById('openMenu') as HTMLElement | null;

if (loginRegisterButton && openMenu) {
  loginRegisterButton.addEventListener('mouseover', () => {
    openMenu.style.display = 'block';
  });
}
function renderHeader() {
  return `
     <header id="header">
        <div class="logo-container">
            <img src="./images/Ai-shop-logo.png" alt="AI Shop Logo">
        </div>
        
        <div class="search-container">
            <input 
              type="text" 
              placeholder="Search for products..." 
              aria-label="Search">
            <button aria-label="Search">
              <img src="./images/Search_Icon.svg.png" alt="Search Icon">
            </button>
          </div>

          <div class="login-register">
            <img src="./images/user-image.png" alt="User Icon">
            <button id="loginRegisterButton" aria-haspopup="true" aria-expanded="false">
              Welcome <br> Login / Register
            </button>

          
            <div id="openMenu" class="dropdown-menu">
              <a id="login" onclick="login()">Login</a>
              <a id="register" onclick="register()">Register</a>
              <hr>
              <nav id="navbar">
                <a href="/myOrders">My orders</a>
                <a href="/connectUs">Contact us</a>
                <a href="/logOut">Log out</a>
              </nav>
            </div>

            
          </div>
        <div class="cart">
            <img src="./images/cart-image.jpg" alt="Cart Icon">
            <h3>Cart</h3>
            <span class="cart-items-count">3</span>
        </div>
    </header>`
}
function render() {
  const container = document.querySelector('#header'); // Adjust the selector to your target element
  if (container) {
    container.innerHTML = renderHeader();
  } else {
    console.error('Target container not found!');
  };
};

function closeMenu() {

  try {
    if (openMenu) {
      openMenu.style.display = 'none';
    }
  }
  catch (error) {
    console.error('An error occurred:', error.message);
  }
}
// loginRegisterButton.addEventListener('mouseleave', closeMenu);
// openMenu.addEventListener('mouseleave', closeMenu);

// openMenu.addEventListener('mouseover', () => {
//   openMenu.style.display = 'block';
// });





render();