function renderRegister() {
  return `
    <div class="registerPopup" id="registerPopup">
      <div class="registerPopup-content">
        <button class="closeRegister-btn" id="closeRegisterPopupButton">X</button>
        <h2 class="popup-title">Sign Up</h2>
        <form id="registerForm">
          <input type="text" id="firstName" name="firstName" placeholder="First Name" required />
          <input type="text" id="lastName" name="lastName" placeholder="Last Name" required />
          <input type="email" id="registerEmail" name="registerEmail" placeholder="Email Address" required />
          <input type="text" id="phoneNumber" name="phoneNumber" placeholder="Phone Number" required />
          <input type="password" id="registerPassword" name="registerPassword" placeholder="Password" required />
          <input type="password" id="repeatPassword" name="repeatPassword" placeholder="Repeat Password" required />
          <button type="submit" id="registerButton">Sign Up</button>
        </form>
        <p class="divider"><span>or</span></p>
        <div class="social-login">
          <button id="googleRegister" onclick="googleRegister()">
            <img src="../images/google-image.webp" alt="Google Logo" />
            Sign up with Google
          </button>
          <button id="facebookRegister" onclick="facebookRegister()">
            <img src="../images/facebook-image.webp" alt="Facebook Logo" />
            Sign up with Facebook
          </button>
        </div>
        <p class="login-link">
          Already have an account? <a href="?loginParam=login">Log in</a>
        </p>
      </div>
    </div>
  `;
};

function openRegisterPopup() {
      const queryString = window.location.search;
      const params:any = new URLSearchParams(queryString);

      const registerParam = params.get('registerParam');
      const registerPopup = document.getElementById('registerPopup'); 

      handleFormRegister();
      if (!registerParam) {
        registerPopup!.style.display = 'none';
      } else {
        registerPopup!.style.display = 'block';
      };
};


function closeRegisterPopup() {

  const registerPopup = document.getElementById('registerPopup'); 
  const closeRegisterButton = document.getElementById('closeRegisterPopupButton');

  closeRegisterButton?.addEventListener('click', () => {
    registerPopup!.style.display = 'none';
    window.location.href = "/";
  });
};

function render() {
      console.log('render');
      const container = document.querySelector('#registerPopup');
      if (container) {
        container.innerHTML += renderRegister();
        openRegisterPopup();
        closeRegisterPopup();
      } else {
        console.error('Target container not found!');
      };
};

render();


function handleFormRegister(): void {
  console.log('handleFormRegister');
  // Select the form element
      const form = (document.getElementById('registerForm') as HTMLFormElement);
  
      if (form) {
          form.addEventListener('submit', (event: Event) => {
              event.preventDefault();
              
              const formData = new FormData(form);
              const firstName = formData.get('firstName') as string;
              const lastName = formData.get('lastName') as string;
              const phoneNumber = formData.get('phoneNumber') as string;
              const email = formData.get('registerEmail') as string;
              const password = formData.get('registerPassword') as string;
              const repeatPassword = formData.get('repeatPassword') as string;
              console.log(`${firstName} ${lastName} ${phoneNumber} ${email} ${password}`);
              if (password !== repeatPassword) {
                  alert('Passwords do not match! Please try again'); //todo:change
              } else {
                
                 addClient(firstName, lastName, email, password, phoneNumber);
              }
          });
      } else {
          console.error('Login form not found in the DOM');
      };
  };


 async function addClient(firstName:string, lastName:string, email:string, password:string, phoneNumber:string) {
  
    try {
            const response = await fetch('http://localhost:3000/api/clients/add-client', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, lastName, email, password, phoneNumber}),
            });
            
            const data = await response.json();
            const registerPopup = document.getElementById('registerPopup'); 
            if (response.ok) {
                console.log('success');
                registerPopup!.style.display = 'none';
                window.location.href = "/";
            } else {
                alert(data.message);
            }

      } catch (error) {
          console.error('Error sending post:', error);
      }
  }
