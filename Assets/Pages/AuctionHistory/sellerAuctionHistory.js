const auctionsHistoryPageEl = document.querySelector(".auctions-history-page");

document.addEventListener("loadstart", loading);
document.addEventListener("DOMContentLoaded", stopLoading);
document.addEventListener("DOMContentLoaded", loadAuctionHistory);

function loadAuctionHistory() {
  const acc = getAuctionSystem();
  const userID = localStorage.getItem("_id");
  const bikes = acc["items"];
  let auctions = acc["auctions"]
    .filter((auction) => auction.sellerId == userID)
    .filter(
      (auction) =>
        auction.status == "Closed" ||
        auction.status == "Rejected" ||
        auction.status == "Expired"
    );

  if (auctions.length > 0) {
    buildAuctionItems(auctions, bikes);
  } else {
    //No history
    disPlayMessage({
      parent: auctionsHistoryPageEl,
      type: "info",
      message: "No auction history",
      pad: 10,
      minWidth: "300px",
    });
  }
}

//building auction items
function buildAuctionItems(auctions, bikes) {
  auctions.reverse().forEach((auction) => {
    let card = document.createElement("div");
    card.classList.add("auction-card");
    let bike = bikes.find((bike) => bike.auctionId == auction.id);
    let status = auction.reponseCount == 2 ? "Completed" : "Pending";
    if (auction.status == "Rejected") {
      status = "Rejected";
    }
    if (auction.status == "Expired") {
      status = "Expired";
    }
    const date = new Date(auction.endTime);
    const formattedDate = date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });
    let item = `
        <div class="auction-info">
            <div class='image-holder'>
          <img src='${bike.image}' alt='${bike.name}' class="bike-image" />
          </div>
          <div class="details">
            <h3>${bike.name}</h3>
            <p>Final Price ${auction.currentPrice}</p>
            <p>Completed On ${formattedDate}</p>
          </div>
        </div>
        <div class="status ${status}">${status}</div>`;
    card.innerHTML = item;
    auctionsHistoryPageEl.appendChild(card);
  });
}
