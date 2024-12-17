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
    <a href="../index.html">
        <img src="./images/Ai-shop-logo.png" alt="AI Shop Logo">
    </a>
</div>

        
       <div class="search-container">
        <input type="text" placeholder="Search for products..." 
        aria-label="Search" 
        id="search-input">
       <button aria-label="Search" id="search-button">
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
                <a href="?AdminLoginParam=AdminLogin">Admin login</a>
                <a href="/logOut">Log out</a>
              </nav>
            </div>

            
          </div>
        <div class="cart">
            <img id="cart-icon" src="./images/cart-image.png" alt="Cart Icon">
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


/// make the cart page open - TO DO ///
document.addEventListener('DOMContentLoaded', () => {
  const cartIcon = document.getElementById('cart-icon');
  if (cartIcon) {
      cartIcon.addEventListener('click', () => {
          const cartContainer = document.getElementById('cartPage');
          if (cartContainer) {
              showCart();
          } else {
              console.error('Cart container not found!');
          }
      });
  } else {
      console.error('Cart icon not found!');
  }
});

// //// make the search work - TO DO ////
// const searchButton = document.getElementById('search-button');
// const searchInput = document.getElementById('search-input');

// if (searchButton && searchInput) {
//   searchButton.addEventListener('click', function() {
//     const query = searchInput.value.toLowerCase();

//     const productCards = document.querySelectorAll('.product-card');

//     productCards.forEach(card => {
//       const productName = card.querySelector('.product-name')?.textContent?.toLowerCase() || '';
//       const productDescription = card.querySelector('.product-description')?.textContent?.toLowerCase() || '';

//       if (productName.includes(query) || productDescription.includes(query)) {
//         card.style.display = 'block';
//       } else {
//         card.style.display = 'none';
//       }
//     });
//   });

//   searchInput.addEventListener('keyup', function(e) {
//     if (e.key === 'Enter') {
//       searchButton.click();
//     }
//   });
// } else {
//   console.error('Search button or input field not found in the DOM');
// }


initHeader();

render();