const loadingSpinner = document.getElementById("loading-spinner");

function loading() {
  console.log("loader called");

  loadingSpinner.classList.add("show");
}
function stopLoading() {
  console.log("loader ended");

  loadingSpinner.classList.remove("show");
}
