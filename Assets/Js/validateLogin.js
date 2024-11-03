const domain = "http://127.0.0.1:5500/";

function isAlreadyLogin() {
  if (!localStorage.getItem("login-status")) {
    window.location.href = `/Auction_App/Assets/Pages/login.html`;
  }
}

document.addEventListener("DOMContentLoaded", isAlreadyLogin);
