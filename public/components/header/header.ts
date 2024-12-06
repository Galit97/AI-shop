// declare global {
interface Window {
    showLoginPopup: () => void;
    showRegisterPopup: () => void;
}
// }

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
            <button id="loginRegisterButton" aria-hasPopup="true" aria-expanded="false">
            <h3>Welcome </h3>
            </button>

          
            <div id="openMenu" class="dropdown-menu">
                <a href="?loginParam=login">Login</a>
                <a href="?registerParam=register">Register</a>
              <hr>
              <nav id="navbar">
                <a href="/myOrders">My orders</a>
                <a href="/connectUs">Contact us</a>
                <a href="/logOut">Log out</a>
              </nav>
            </div>

            
          </div>
        <div class="cart">
            <img src="./images/cart-image.png" alt="Cart Icon">
            <h3>Cart</h3>
            <span class="cart-items-count">3</span>
        </div>
    </header>`
}

function render() {
  const container = document.querySelector('#header'); 
  if (container) {
    container.innerHTML = renderHeader();
  } else {
    console.error('Target container not found!');
  };
};

const openMenu = document.getElementById('openMenu') as HTMLElement | null;
const loginRegisterButton = document.querySelector('#loginRegisterButton') as HTMLElement | null;

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



function initHeader() {
  const container = document.querySelector('#header'); 
  if (container) {
    container.innerHTML = renderHeader();

    const loginRegisterButton = document.querySelector('#loginRegisterButton') as HTMLElement | null;
    const loginButton = document.getElementById('login') as HTMLElement | null;
    const registerButton = document.getElementById('register') as HTMLElement | null;

    if (loginRegisterButton && openMenu) {
      loginRegisterButton.addEventListener('mouseover', () => {
        alert('Login Register')
        openMenu.style.display = 'block';
      });

      loginRegisterButton.addEventListener('mouseleave', () => {
        openMenu.style.display = 'none';
      });
    }

    if (loginButton) {
      loginButton.addEventListener('click', window.initLoginPopup);
    }

    if (registerButton) {
      registerButton.addEventListener('click', window.RegisterPopup);
    }
  } else {
    console.error('Target container not found!');
  }
}

window.initLoginPopup = function () {
  const loginPopup = document.getElementById('loginPopup');
  if (loginPopup) {
    loginPopup.style.display = 'flex';
  }
};

window.registerPopup = function () {
  const registerPopup = document.getElementById('registerPopup');
  if (registerPopup) {
    registerPopup.style.display = 'flex';
  }
};

initHeader();

render();