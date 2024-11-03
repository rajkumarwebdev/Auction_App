let auctionSystem = {
  users: [],
  auctions: [],
  items: [],
  bids: [],
};

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("auction")) {
    auctionSystem = JSON.parse(localStorage.getItem("auction"));
  } else {
    localStorage.setItem("auction", JSON.stringify(auctionSystem));
  }
});

function getAuctionSystem() {
  console.log("called");

  if (localStorage.getItem("auction")) {
    console.log("yes");

    return JSON.parse(localStorage.getItem("auction"));
  }
}

function updateAuctionSystem(acc) {
  localStorage.setItem("auction", JSON.stringify(acc));
}
