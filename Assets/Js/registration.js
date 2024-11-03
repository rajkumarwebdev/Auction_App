const domain = "http://127.0.0.1:5500/";

function isAlreadyLogin() {
  if (localStorage.getItem("login-status")) {
    window.location.href = `/Auction_App/Assets/Pages/login.html`;
  }
}

document.addEventListener("DOMContentLoaded", isAlreadyLogin);

// Register page handling
const registerBtn = document.getElementById("registerBtn");
//helper funcs for validation
String.prototype.isValidEmail = function () {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this);
};
String.prototype.isValidMobileNumber = function () {
  const mobileRegex = /^[0-9]{10}$/;
  return mobileRegex.test(this);
};
registerBtn.addEventListener("click", registerUser);

// To validate register form data
function validateRegisterFormData(
  username,
  email,
  mobileNumber,
  role,
  password,
  confirmPassword
) {
  let registerErrs = {};
  let user = JSON.parse(localStorage.getItem(mobileNumber));
  if (!username) {
    registerErrs.err_username = "Please,Enter username!";
  }
  if (!email) {
    registerErrs.err_email = "Please,Enter email!";
  } else if (!email.isValidEmail()) {
    registerErrs.err_email = "Invalid email address!";
  } else if (user && user.email == email) {
    registerErrs.err_email = "This email has already taken!";
  }
  if (!mobileNumber) {
    registerErrs.err_number = "Please,Enter your mobile number.";
  } else if (!mobileNumber.isValidMobileNumber()) {
    registerErrs.err_number = "Invalid mobile number.";
  } else if (user) {
    registerErrs.err_number = "This mobile number has already taken";
  }
  if (!role) {
    registerErrs.err_role = "Please,select your role.";
  }
  if (!password) {
    registerErrs.err_password = "Please,fill password";
  } else if (password.length < 8) {
    registerErrs.err_password = "Fill atleast 8 characters.";
  }
  if (!confirmPassword) {
    registerErrs.err_cfmpassword = "Please,fill confirm password";
  } else if (password != confirmPassword) {
    registerErrs.err_cfmpassword = "Password does not match!";
  }

  if (Object.keys(registerErrs).length != 0) {
    displayErrors(registerErrs, "reg-error", "reg-err");
    return false;
  }
  displayErrors(registerErrs, "reg-error", "reg-err");

  return true;
}
//Display corresponding error messages to UI

//First time registering user
function registerUser() {
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const mobileNumber = document.getElementById("number").value.trim();
  const role = document.getElementById("role").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("cfmpassword").value.trim();

  console.log(username, email, mobileNumber, role, password, confirmPassword);

  if (
    validateRegisterFormData(
      username,
      email,
      mobileNumber,
      role,
      password,
      confirmPassword
    )
  ) {
    const user = new User(username, email, password, mobileNumber, role);
    let acc = getAuctionSystem();
    // update users array
    // let users = acc["users"];
    if (!acc?.users) {
      acc["users"] = [];
    }
    acc["users"].push(user);
    updateAuctionSystem(acc);
    window.location.href = `login.html`;
  }
}
