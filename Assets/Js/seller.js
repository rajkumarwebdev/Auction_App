const activeAuctions = document.getElementById("active-auctions");
const createAuctionEl = document.getElementById("create-auction");

function loadAuctions() {
  createAuctionEl.classList.remove("show");
  activeAuctions.classList.add("show");
  activeAuctions.innerHTML = "";
  let auctions = JSON.parse(localStorage.getItem("auction"));
  let items = auctions["items"];
  let auction = auctions["auctions"];
  //   console.log(auction);
  if (auction.length > 0) {
    auction.forEach((au) => {
      //   console.log(au.itemId);

      let item = items.filter((item) => item.id == au.itemId)[0];
      // console.log(item);

      if (item) {
        let auctionCard = document.createElement("div");
        auctionCard.className = "auction-card";
        const img = new Image();
        console.log(item.imageUrl);

        img.src = item.imageUrl;
        img.classList.add("auction-image");
        let acc = `
                <h3>${item.name}</h3>
                <p>Current Highest Bid: ${item.startingPrice}</p>
                <p>End Date: ${au.endTime}</p>
                <button>View Bids</button>
              `;
        auctionCard.appendChild(img);
        auctionCard.innerHTML += acc;
        activeAuctions.appendChild(auctionCard);
      }
    });
  } else {
    activeAuctions.innerHTML = `<p class='no-auctions'>No auctions found!</p>`;
  }
}
