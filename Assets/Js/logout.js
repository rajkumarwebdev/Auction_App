const logoutBtns = document.querySelectorAll(".logoutBtn");
logoutBtns.forEach((log) => {
  log.addEventListener("click", logout);
});

function logout() {
  localStorage.removeItem("login-status");
  localStorage.removeItem("notifications");
  window.location.reload();
}
