// consts
let role = null;

const domain = "http://127.0.0.1:5500/";
function isAlreadyLogin() {
  if (localStorage.getItem("login-status")) {
    const role = localStorage.getItem("role");
    if (role == "buyer") {
      window.location.href = `/Auction_App/Assets/Pages/BuyersModule/buyersDashboard.html`;
    } else {
      window.location.href = `/Auction_App/Assets/Pages/myBikes.html`;
    }
  }
}

document.addEventListener("DOMContentLoaded", isAlreadyLogin);

// Login handling
const loginBtn = document.getElementById("loginBtn");
loginBtn.addEventListener("click", loginUser);
String.prototype.isValidMobileNumber = function () {
  const mobileRegex = /^[0-9]{10}$/;
  return mobileRegex.test(this);
};
function validateLoginFormData(mobileNumber, password) {
  let loginErrs = {};
  let acc = getAuctionSystem();
  let currentUser = acc["users"].find((user) => user.userID == mobileNumber);
  console.log(currentUser);

  if (!mobileNumber) {
    loginErrs.err_number = "Please,Enter your mobile number.";
  } else if (!mobileNumber.isValidMobileNumber()) {
    loginErrs.err_number = "Invalid mobile number!";
  } else if (!currentUser) {
    loginErrs.err_number = "Username or password wrong!";
  } else if (!password) {
    loginErrs.err_password = "Please,Enter password!";
  } else if (currentUser.password != password) {
    loginErrs.err_password = "Username or password wrong!";
  }

  if (Object.keys(loginErrs).length != 0) {
    displayErrors(loginErrs);
    return false;
  }
  displayErrors(loginErrs);
  role = currentUser.role;
  return true;
}
function displayErrors(error) {
  const errEles = document.querySelectorAll(".reg-error");

  errEles.forEach((ele) => {
    let errorMessage = error[ele.id];
    if (errorMessage) {
      ele.innerText = errorMessage;
      ele.classList.add("reg-err");
    } else {
      ele.classList.remove("reg-err");
    }
  });
}

function loginUser() {
  const mobileNumber = document.getElementById("login-number").value.trim();
  const password = document.getElementById("login-password").value.trim();

  if (validateLoginFormData(mobileNumber, password)) {
    localStorage.setItem("login-status", true);
    localStorage.setItem("role", role);
    localStorage.setItem("_id", mobileNumber);
    window.location.href = `../../index.html?n=${mobileNumber}`;
  }
}
