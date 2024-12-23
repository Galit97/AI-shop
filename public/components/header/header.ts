interface Window {
  showLoginPopup: () => void;
  showRegisterPopup: () => void;
}

function renderHeader() {
  return `
     <header id="header">
    <div class="logo-container">
    <a href="../index.html">
        <img src="./images/easy-choice-1.png" alt="easy choice Logo">
    </a>
</div>

        
       <div class="search-container">
        <input type="text" placeholder="Search for products..." 
        aria-label="Search" 
        id="search-input">
       <button aria-label="Search" id="search-button">
       <img src="./images/Search_Icon.svg.png" id="Search_Icon" alt="Search Icon">
       </button>
       </div>

          <div class="login-register">
            <img src="./images/user-image.png" alt="User Icon">
            <button id="loginRegisterButton" aria-hasPopup="true" aria-expanded="false">
            <h3>Welcome <span id="loggedInUser"></span></h3>
            </button>

          
            <div id="openMenu" class="dropdown-menu">
                <a href="?loginParam=login">Login</a>
                <a href="?registerParam=register">Register</a>
              <hr>
              <nav id="navbar">
                <a href="/myOrders">My orders</a>
                <a href="#" onclick="ContactUsPopup()">Contact us</a>
                <a href="?AdminLoginParam=AdminLogin">Admin login</a>
                <a href="#" onclick="resetCookies()">Log out</a>
              </nav>
            </div>

            
          </div>
        <div class="cart" id="cart">
            <img id="cart-icon" src="./images/cart-image.png" alt="Cart Icon">
            <span class="cart-items-count" id="cartItemsCount"></span>
        </div>
    </header>`;
}


const openMenu = document.getElementById("openMenu") as HTMLElement | null;
const loginRegisterButton = document.querySelector(
  "#loginRegisterButton"
) as HTMLElement | null;

function closeMenu() {
  try {
    if (openMenu) {
      openMenu.style.display = "none";
    }
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
}

function initHeader() {
  const container = document.querySelector("#header");
  if (container) {
    container.innerHTML = renderHeader();
    showWelcomeName();
    showCartItemsCount();

    const loginRegisterButton = document.querySelector(
      "#loginRegisterButton"
    ) as HTMLElement | null;
    const loginButton = document.getElementById("login") as HTMLElement | null;
    const registerButton = document.getElementById(
      "register"
    ) as HTMLElement | null;

    if (loginRegisterButton && openMenu) {
      loginRegisterButton.addEventListener("mouseover", () => {
        alert("Login Register");
        openMenu.style.display = "block";
      });

      loginRegisterButton.addEventListener("mouseleave", () => {
        openMenu.style.display = "none";
      });
    }

    if (loginButton) {
      loginButton.addEventListener("click", window.initLoginPopup);
    }

    if (registerButton) {
      registerButton.addEventListener("click", window.RegisterPopup);
    }
  } else {
    console.error("Target container not found!");
  }
}

window.initLoginPopup = function () {
  const loginPopup = document.getElementById("loginPopup");
  if (loginPopup) {
    loginPopup.style.display = "flex";
  }
};

window.registerPopup = function () {
  const registerPopup = document.getElementById("registerPopup");
  if (registerPopup) {
    registerPopup.style.display = "flex";
  }
};

const cartIcon = document.getElementById("cart");
if (cartIcon) {
  cartIcon.addEventListener("click", () => {
    fetchCartProducts();
  });
} else {
  console.error("Cart icon not found!");
}

async function showWelcomeName() {
  try {
    const welcomeName = document.getElementById("loggedInUser");
    if (!welcomeName)
      throw new Error("Cannot find element to display the user name.");

    const response = await fetch(
      "http://localhost:3000/api/clients/get-client",
      {
        credentials: "include",
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch user info:", response.statusText);
      welcomeName.textContent = "Guest";
      return;
    }

    const responseData = await response.json();

    const firstName = responseData.client.firstName;

    if (firstName) {
      welcomeName.textContent = firstName;
    } else {
      welcomeName.textContent = "Guest";
    }
  } catch (error) {
    console.error("Error fetching client name:", error);
  }
}

initHeader();

render();

searchButton();

function searchButton (){
  try{
    const searchInput = document.getElementById('search-input') as HTMLInputElement;
    const searchIcon = document.getElementById('Search_Icon') as HTMLInputElement;
    searchInput.addEventListener('keydown', function(event) {  /* search when clicked enter */
      if(event.key === 'Enter'){
        console.log(searchInput.value);
        filterBySearch(searchInput.value);
      }
    });
    searchIcon.addEventListener('click', function() {  /* search when clicked the search icon */
      console.log(searchInput.value);
      filterBySearch(searchInput.value);
    });
  }
  catch(error){
    console.error('An error occurred:', error.message);
  }
};

async function showCartItemsCount() {

  try {
    const cartItemsCount = document.getElementById("cartItemsCount");
    if (!cartItemsCount)
      throw new Error("Cannot find element to display the items count.");


    const response = await fetch("http://localhost:3000/api/cart/get-cart");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const cart = await response.json();
    console.log(cart)


    const totalItems = cart.products.reduce(
      (acc, product) => acc + product.quantity,
      0
    );

    if(totalItems > 0) {
      cartItemsCount.textContent = totalItems;
    } else {
      cartItemsCount.textContent = "0";
    }
    
    console.log(totalItems)
  } catch (error) {
    console.error("Error fetching cart products:", error);
  }
}
