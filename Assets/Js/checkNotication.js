document.addEventListener("DOMContentLoaded", () => {
  let stsss = localStorage.getItem("notifications");
  console.log(stsss);

  const redDot = document.querySelector(".redDot");

  if (stsss != "false" && stsss != null && stsss != "") {
    console.log("show");
    redDot.classList.add("show");
  } else {
    redDot.classList.remove("show");
  }
});
