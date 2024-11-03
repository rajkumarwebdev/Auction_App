function updateCountdowns() {
  const cards = document.querySelectorAll(".auction-card");
  cards.forEach((card) => {
    const endTime = new Date(card.getAttribute("data-endtime")).getTime();
    const countdownElem = card.querySelector(".countdown");
    const now = new Date().getTime();
    const timeLeft = endTime - now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    if (timeLeft > 0) {
      countdownElem.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    } else {
      // deal with user
      let auctionID = card.getAttribute("data-auctionId");
      updateWinnerID(auctionID);
      countdownElem.innerHTML = "Auction Ended";
    }
  });
}

setInterval(updateCountdowns, 1000);
