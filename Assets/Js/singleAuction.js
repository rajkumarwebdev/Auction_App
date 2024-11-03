function goBack() {
  window.location.href = "/Auction_App/Assets/Pages/activeAuctions.html";
}

const bidListEl = document.getElementById("bid-list");
const noBidHistoryEl = document.getElementById("no-bids-message");

document.addEventListener("DOMContentLoaded", loadBidHistory);
// For showing time
function timeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const secondsAgo = Math.floor((now - date) / 1000);
  const minutesAgo = Math.floor(secondsAgo / 60);
  const hoursAgo = Math.floor(secondsAgo / 3600);
  const daysAgo = Math.floor(secondsAgo / 86400);
  const monthsAgo = Math.floor(daysAgo / 30);
  if (secondsAgo < 60) {
    return `${secondsAgo} seconds ago`;
  } else if (minutesAgo < 60) {
    return `${minutesAgo} mins ago`;
  } else if (hoursAgo < 24) {
    return `${hoursAgo} hours ago`;
  } else if (daysAgo < 30) {
    return `${daysAgo} days ago`;
  } else {
    return `${monthsAgo} months ago`;
  }
}

function loadBidHistory() {
  const urlParams = new URLSearchParams(window.location.search);
  const auctionId = urlParams.get("id");
  if (auctionId) {
    let system = getAuctionSystem();
    let bids = system["auctions"].find((auction) => auction.id == auctionId)[
      "bids"
    ];
    if (bids?.length > 0) {
      noBidHistoryEl.style.display = "none";
      bids.reverse().forEach((bid) => {
        console.log(bid);
        let user = system["users"].find((user) => user.userID == bid.userId);
        const bidDiv = document.createElement("div");
        bidDiv.classList.add("bid-item");
        let bidItem = `
            <p><strong>Bidder:</strong>${user.name}</p>
            <p><strong>Bid Amount:</strong>${bid.bidAmount}</p>
            <p><strong>Time:</strong> ${timeAgo(bid.time)}</p>
       `;
        bidDiv.innerHTML = bidItem;
        bidListEl.appendChild(bidDiv);
      });
    } else {
      noBidHistoryEl.style.display = "block";
    }
  }
}
