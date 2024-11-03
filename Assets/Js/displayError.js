function displayErrors(error, className, cl) {
  const errEles = document.querySelectorAll("." + className);
  console.log(error);

  errEles.forEach((ele) => {
    let errorMessage = error[ele.id];

    if (errorMessage) {
      ele.innerText = errorMessage;
      ele.classList.add(cl);
    } else {
      ele.classList.remove(cl);
    }
  });
}
