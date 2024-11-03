const featuredAuctionsList = document.getElementById("featured-grid");
const featuredContainer = document.querySelector(".featured-auctions");

function getBikes() {
  featuredAuctionsList.innerHTML = "";
  let auctionBikes = getAuctionSystem()["auctions"].filter(
    (auction) => auction.status == "Active"
  );
  const bikeOriginal = getAuctionSystem()["items"];

  // filter later

  let filterdAuctions = [];
  if (auctionBikes.length > 0) {
    let endingSoonAuction = auctionBikes.filter((auction) => {
      let before = new Date(auction.endTime);
      let currentTime = Date.now();
      let differenceTime = before - currentTime;
      if (differenceTime <= 1800000 && differenceTime > 0) {
        // console.log("Only 30 minutes left for the auction!");
        return auction;
      }
    });
    //Get ending soon auction
    if (endingSoonAuction.length > 0) {
      filterdAuctions.push({
        obj: endingSoonAuction[0],
        status: "Ending soon",
      });
    }
    //Newly added auction
    filterdAuctions.push({
      obj: auctionBikes[auctionBikes.length - 1],
      status: "Newly added",
    });
    // Trending auction
    let bidCount = 0;
    let trendingAuction;
    auctionBikes.forEach((auction) => {
      if (bidCount < auction.bids.length) {
        trendingAuction = auction;
        bidCount = auction.bids.length;
      }
    });
    if (bidCount == 0) {
      filterdAuctions.push({ obj: auctionBikes[0], status: "Trending" });
    } else {
      filterdAuctions.push({ obj: trendingAuction, status: "Trending" });
    }
  }

  if (filterdAuctions.length > 0) {
    filterdAuctions.forEach((auction) => {
      const auctionCard = document.createElement("div");
      auctionCard.setAttribute("class", "auction-card");
      //   auctionCard.setAttribute("data-endtime", bike.endTime);
      let bikeObj = bikeOriginal.find((b) => b.id == auction.obj.itemId);

      let item = `
          <img src="${bikeObj.image}" alt="${bikeObj.name}" />
          <div class="auction-info">
            <h3>${bikeObj.name}</h3>
            <p class='auctionTag'>${auction.status}</p>
            <p><strong>Current Bid: </strong>&#8377;${auction.obj.currentPrice}</p>
            <a class="bid-btn" href='/Auction_App/Assets/Pages/BuyersModule/MyBids/mybids.html?id=${auction.obj.id}'>Place Bid</a>
          </div>
      `;
      auctionCard.innerHTML = item;
      featuredAuctionsList.appendChild(auctionCard);
    });
  } else {
    disPlayMessage({
      parent: featuredContainer,
      type: "info",
      message: "No featured auctions found!",
    });
  }
}

document.addEventListener("DOMContentLoaded", getBikes);
