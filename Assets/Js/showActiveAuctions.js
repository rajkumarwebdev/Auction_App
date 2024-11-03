document.addEventListener("DOMContentLoaded", loadActiveAuctions);
document.addEventListener("loadstart", loading);
document.addEventListener("DOMContentLoaded", stopLoading);

const activeAuctionsInfo = document.getElementById("active-auctions");
function loadActiveAuctions() {
  let auctions = getAuctionSystem()["auctions"];
  let id = localStorage.getItem("_id");
  let currentUsersAuctions = auctions.filter(
    (auction) => auction.sellerId == id && auction.status == "Active"
  );

  if (currentUsersAuctions.length > 0) {
    buildAcutionItem(currentUsersAuctions);
  } else {
    console.log("yes----------");

    //No auctions found message
    disPlayMessage({
      parent: activeAuctionsInfo,
      type: "info",
      message: "No active auctions found!",
      pad: 15,
      offset: -1,
      center: true,
      position: true,
    });
  }
}

function buildAcutionItem(auctions) {
  const activeAuctionsEl = document.getElementById("active-auctions");
  let bikes = getAuctionSystem()["items"];

  auctions.reverse().forEach((auction) => {
    const auctionCard = document.createElement("div");
    auctionCard.classList.add("auction-card");
    auctionCard.setAttribute("data-endtime", auction.endTime);
    auctionCard.setAttribute("data-auctionId", auction.id);
    let bike = bikes.find((bike) => bike.auctionId == auction.id);

    let a = ` 
          <div class="small-header">
            <p class="auction-type label">
             
            </p>
            <p class="label">
              Ends in <span class="countdown">0</span>
            </p>
          </div>
          <div class="auction-header">
            <img
              src="${bike.image}"
              alt=""
              class="auction-item-image"
            />
          </div>
          <div class="auction-body">
            <p class="auction-item-name">${bike.name}</p>
            <div class="prices">
              <p class="auction-item-starting-price label">
                Starting Price <span class="value">${auction.startingPrice}</span>
              </p>
              <p class="auction-item-current-price label">
                Current Price
                <span class="value">${auction.currentPrice}</span>
              </p>
            </div>
          </div>
          <div class="view-bits">
            <a href="singleAuction.html?id=${auction.id}">ViewBids</a>
          </div>
        `;
    auctionCard.innerHTML = a;
    activeAuctionsEl.appendChild(auctionCard);
  });
}
