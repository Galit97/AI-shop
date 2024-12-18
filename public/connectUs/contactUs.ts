function initContactUs(){
  const container = document.querySelector("#contactUsPopup");
  if (!container)
      return false;
              container.innerHTML = "";
  if(container){
      container.innerHTML += render();
  }else{
      console.error("Target container not found!");
  }
}

function render(){
  return `
      <div id="contactModal" class="modal">
  <div class="modal-content">
    <span class="close" onclick="closeContactForm()">&times;</span>
    <h2>Connect US</h2>
    <form id="contactForm" onsubmit="handleFormConnectUs(event)">
      <label for="name">Full Name</label><br>
      <input type="text" id="name" name="name" required><br><br>
      <label for="email">Email</label><br>
      <input type="email" id="email" name="email" required><br><br>
      <label for="message">Message</label><br>
      <textarea id="message" name="message" rows="4" required></textarea><br><br>
      <input type="submit" id="sendButton" value="Send">
    </form>
  </div>
</div>
  `;
}


function ContactUsPopup() {
  initContactUs();
  document.getElementById("ContactModel").style.display = "block";
}


function closeContactForm() {
  document.getElementById("contactModel").style.display = "none";
}

window.onclick = function(event) {
  if (event.target == document.getElementById("contactModel")) {
    closeContactForm();
  }
}


function handleFormContactUs(event)
{
  try{
      event.preventDefault();
      alert("ההודעה לא נשלחה לאף מקום");
      alert("בהמשך אני ינסה לשלוח את הודעה למייל אמיתי");
  }
  catch(error){
      console.error(error);
      alert("error on submit function");
  }
}