let currentAuctionID = null;
let NEXT_BID_AMOUNT = 100;
document.addEventListener("DOMContentLoaded", fetchCurrentBikeDetails);
document.addEventListener("DOMContentLoaded", () => {
  loadAuctiveBids();
  function addActiveClass() {
    const urlParams = new URLSearchParams(window.location.search);
    const bikeId = urlParams.get("id");
    let activeBidItems = document.querySelectorAll(".bid-item");
    if (activeBidItems.length > 0) {
      let currentActiveBid = [...activeBidItems].find(
        (bidItem) => bidItem.getAttribute("data-auctionid") == bikeId
      );
      if (currentActiveBid) {
        currentActiveBid.classList.add("activeBid");
      }
    }
  }
  addActiveClass();
});
const bikeModel = document.getElementById("bikeModel");
const bikeYear = document.getElementById("bikeYear");
const bikeEngine = document.getElementById("bikeEngine");
const bikeCurentHighestBid = document.getElementById("bikeCurentHighestBid");
const lastBid = document.getElementById("lastBid");
const bidInput = document.getElementById("bid-input");
const placeBidBtn = document.getElementById("place-bid-button");
const nextMinBid = document.getElementById("nextMinBid");
const newAuctionSection = document.getElementById("newSection");
const detailsContainer = document.querySelector(".bidBody");
function fetchCurrentBikeDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const bikeId = urlParams.get("id");

  if (bikeId) {
    showBidOption(bikeId);
  }
}

function showBidOption(id) {
  const auctions = getAuctionSystem()["auctions"].filter(
    (auction) => auction.status == "Active"
  );
  const bikeOriginal = getAuctionSystem()["items"];
  const userId = localStorage.getItem("_id");

  let auctionObj = auctions.find((b) => b.id == id);
  // console.log(userId);

  // console.log(auctionObj);
  if (auctionObj) {
    let bids = auctionObj["bids"]
      .reverse()
      .filter((bid) => bid.userId == userId);

    // console.log(bid);

    let bikeObj = bikeOriginal.find((b) => b.id == auctionObj.itemId);
    currentAuctionID = auctionObj.id;
    bikeModel.innerText = bikeObj.model;
    bikeYear.innerText = bikeObj.year;
    bikeEngine.innerText = bikeObj.capacity;
    nextMinBid;
    bikeCurentHighestBid.innerHTML = "&#8377;" + auctionObj.currentPrice;

    bidInput.min = parseInt(auctionObj.currentPrice) + NEXT_BID_AMOUNT;
    nextMinBid.innerHTML = "&#8377;" + bidInput.min;
    if (bids.length > 0) {
      if (auctionObj.currentPrice <= bids[0].bidAmount) {
        lastBid.innerHTML = "&#8377;" + bids[0].bidAmount;
        lastBid.classList.add("safeBid");
      } else {
        lastBid.innerHTML = "Outbit " + "&#8377;" + bids[0].bidAmount;
        lastBid.classList.add("outBid");
      }
    } else {
      lastBid.innerText = "You haven't bidded yet.";
    }
  } else {
    //no active acutions found
  }
}

placeBidBtn.addEventListener("click", placeBid);

function placeBid() {
  // i am placing bid here
  let bidValue = Number(bidInput.value);

  let currentUser = localStorage.getItem("_id");
  if (
    bidValue > parseInt(bikeCurentHighestBid.innerText.slice(1)) &&
    bidValue >= Number(bidInput.min)
  ) {
    // console.log(auctionSystem);

    let bidId = crypto.randomUUID();
    let bidObject = createBid(bidId, currentAuctionID, currentUser, bidValue);
    let acc = getAuctionSystem();

    // update users bids also
    let ac = acc["users"].find((user) => user.userID == currentUser)[
      "auctionsParticipating"
    ];
    if (!ac.includes(currentAuctionID)) {
      ac.push(currentAuctionID);
    }

    // update bids array
    let bids = acc["bids"];
    if (!acc?.bids) {
      acc["bids"] = [];
    }
    acc["bids"].push(bidObject);
    let currentAuctionObj = acc["auctions"].find(
      (auction) => auction.id == currentAuctionID
    );
    currentAuctionObj.bids.push(bidObject);
    currentAuctionObj.currentPrice = bidValue;
    updateAuctionSystem(acc);
    window.location.reload();
    bidInput.value = "";
    // disPlayMessage({
    //   parent: detailsContainer,
    //   type: "success",
    //   message: "Successfully bidded amount RS" + bidValue,
    //   pad: 8,
    //   position: true,
    //   offset: 10,
    //   delay: 1,
    // });
  } else {
    console.log("Invalid bid");
    disPlayMessage({
      parent: detailsContainer,
      type: "error",
      message: "Oops! Invalid bid !",
      pad: 8,
      position: true,
      offset: 10,
      delay: 1.5,
    });
  }
  //   console.log(auctionSystem);
}

function loadAuctiveBids() {
  let acc = getAuctionSystem();
  let auctions = acc["auctions"].filter(
    (auction) => auction.status == "Active"
  );
  if (auctions.length > 0) {
    let bikes = acc["items"];
    let currentUser = localStorage.getItem("_id");
    // update users bids also
    let auctionParts = acc["users"].find((user) => user.userID == currentUser)[
      "auctionsParticipating"
    ];
    if (auctionParts.length > 0) {
      auctionParts.forEach((ap) => {
        // bids
        let auctionObj = auctions.find((ac) => ac.id == ap);
        // console.log(auctionObj);

        if (auctionObj) {
          // console.log(auctionObj.itemId);
          let bidStatus;
          let bike = bikes.find((b) => b.id == auctionObj.itemId);
          // console.log("yes", bike);
          let bids = auctionObj["bids"]
            .reverse()
            .filter((bid) => bid.userId == currentUser);
          console.log(bids);

          if (bids.length > 0) {
            bidStatus =
              auctionObj.currentPrice <= bids[0].bidAmount ? true : false;
          } else {
            // lastBid.innerText = "You haven't bidded yet.";
          }

          const bidItemEl = document.createElement("div");
          bidItemEl.classList.add("bid-item");
          bidItemEl.setAttribute("data-auctionID", auctionObj.id);
          // i add event for click to load another active auction
          bidItemEl.addEventListener("click", function () {
            window.location.href = `/Auction_App/Assets/Pages/BuyersModule/MyBids/mybids.html?id=${auctionObj.id}`;
          });
          let el = ` 
          <div class="image-placeholder">
          <img src='${bike.image}'/>
          </div>
          <div class="bid-info">
            <div class="bike-name">${bike.name}</div>
            <div class="bid-details">
              <span class="highest-bid">Highest Bid: &#8377;${
                auctionObj.currentPrice
              }</span> |
              <span class="your-bid ${
                !bidStatus ? "outbid" : "winning"
              }">Your Bid: &#8377;${
            bidStatus ? bids[0].bidAmount : bids[0].bidAmount
          }</span>
            </div>
        
            <div class="bid-status ${!bidStatus ? "outbid" : "winning"}">${
            bidStatus ? "Leading" : "Outbid"
          }</div>
          </div>
      `;
          bidItemEl.innerHTML = el;
          newAuctionSection.appendChild(bidItemEl);
        }
      });
    } else {
    }
  } else {
    disPlayMessage({
      parent: newAuctionSection,
      type: "info",
      message: "No Active auctions found!",
      pad: 15,
    });
  }
}

bidInput.addEventListener("keydown", (e) => {
  // console.log(e);

  if (e.key.toLowerCase() == "enter") {
    placeBidBtn.click();
  }
});
