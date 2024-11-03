const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("userId");
const auctionId = urlParams.get("auctionId");
const bikeName = urlParams.get("bikeModel");
const finalPrice = urlParams.get("finalPrice");
const endDate = urlParams.get("endDate");
const role = localStorage.getItem("role");
const notifyID = urlParams.get("notifyID");
const myID = localStorage.getItem("_id");
const agreementDetailsEl = document.querySelector(".agreement-details");
const paymentOptionsEl = document.querySelector(".payment-options");
let paymentMethod = null;
const confirmBtn = document.querySelector(".btn-confirm");
const cancelBtn = document.querySelector(".btn-cancel");
if (role == "buyer") {
  const paymentEls = document.querySelectorAll(".paymentEls");
  paymentEls.forEach((pay) => {
    pay.addEventListener("change", (e) => {
      console.log("yes");

      paymentMethod = e.target.value;
    });
  });
} else {
  paymentOptionsEl.style.display = "none";
}

const userData = getAuctionSystem()["users"].find(
  (user) => user.userID == userId
);
let item = `
       <div class="buyer-info">
          <h3>Buyer Information</h3>
          <p>Name: John Doe</p>
          <p>Email: johndoe@example.com</p>
        </div>

        <div class="seller-info">
        
        </div>

        <div class="item-details">
          <h3>Auction Item</h3>
          <p>Bike Model: Harley-Davidson Street 750</p>
          <p>Final Price: $500</p>
          <p>Auction End Date: 23rd October 2024</p>
        </div>`;
function loadDetails() {
  const userInfo = document.createElement("div");
  const itemInfo = document.createElement("div");
  console.log(role);

  let rollBased = role == "buyer" ? "Seller" : "Buyer";
  userInfo.classList.add(`${rollBased.toLowerCase()}-info`);
  let data = `<h3>${rollBased} Information</h3>
          <p>Name: ${userData.name}</p>
          <p>Email: ${userData.email}</p>
           <p>Mobile number: ${userData.phonenumber}</p>
 `;
  userInfo.innerHTML = data;
  agreementDetailsEl.insertBefore(userInfo, agreementDetailsEl.firstChild);
  itemInfo.classList.add("item-details");
  let item = `
          <h3>Auction Item</h3>
          <p>Bike Model:${bikeName}</p>
          <p>Final Price: ${finalPrice}</p>
          <p>Auction End Date:${endDate}</p>`;
  itemInfo.innerHTML = item;
  agreementDetailsEl.insertAdjacentElement("beforebegin", itemInfo);
}

loadDetails();

confirmBtn.addEventListener("click", () => {
  const acc = getAuctionSystem();
  let auction = acc["auctions"].find((auction) => auction.id == auctionId);
  let user = acc["users"].find((user) => user.userID == myID);

  let notification = user["notifications"].find((no) => no.id == notifyID);
  notification.respond = true;
  if (role == "buyer") {
    auction.status = "Pending";
  } else {
    auction.status = "Closed";
  }
  auction.reponseCount++;
  if (paymentMethod) {
    auction.paymentMethod = paymentMethod;
  }
  //handle confirmation
  updateAuctionSystem(acc);
  if (role == "buyer") {
    window.location.href = "/Assets/Pages/AgreementPage/notifications.html";
  } else {
    window.location.href =
      "/Assets/Pages/AgreementPage/notificationForSeller.html";
  }
});

cancelBtn.addEventListener("click", () => {
  const acc = getAuctionSystem();
  let auction = acc["auctions"].find((auction) => auction.id == auctionId);
  let user = acc["users"].find((user) => user.userID == myID);
  let bike = acc["items"].find((bike) => bike.id == auction.itemId);
  console.log(user);

  let notification = user["notifications"].find((no) => no.id == notifyID);

  notification.respond = true;
  auction.status = "Rejected";
  auction.regReason = `Bike ${bike.name} rejected by ${user.name}`;
  auction.reponseCount++;
  //handle confirmation
  updateAuctionSystem(acc);
  if (role == "buyer") {
    window.location.href = "/Assets/Pages/AgreementPage/notifications.html";
  } else {
    window.location.href =
      "/Assets/Pages/AgreementPage/notificationForSeller.html";
  }
});
