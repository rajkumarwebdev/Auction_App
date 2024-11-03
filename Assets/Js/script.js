const domain = "http://127.0.0.1:5500/";
function isAlreadyLogin() {
  if (!localStorage.getItem("login-status")) {
    window.location.href = `/Auction_App/Assets/Pages/login.html`;
  } else {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams);

    const user = JSON.parse(localStorage.getItem(urlParams.get("n")));
    if (user) {
      if (user.role == "buyer") {
        window.location.href = `/Auction_App/Assets/Pages/BuyersModule/buyersDashboard.html`;
      } else {
        window.location.href = `/Auction_App/Assets/Pages/myBikes.html`;
      }
    } else {
      const role = localStorage.getItem("role");
      if (role == "buyer") {
        window.location.href = `/Auction_App/Assets/Pages/BuyersModule/buyersDashboard.html`;
      } else {
        window.location.href = `/Auction_App/Assets/Pages/myBikes.html`;
      }
    }
  }
}
document.addEventListener("DOMContentLoaded", isAlreadyLogin);
