document.addEventListener("DOMContentLoaded", stopLoading);
document.addEventListener("loadstart", loading);
function renderNotification(notifications) {
  const container = document.querySelector(".notifications-container");
  const redDot = document.querySelector(".redDot");
  if (notifications.length > 0) {
    localStorage.setItem("notifications", true);
    let acc = getAuctionSystem();
    const userID = localStorage.getItem("_id");
    notifications.reverse().forEach((notification) => {
      const notificationItem = document.createElement("div");
      notificationItem.classList.add("notification-item");
      let auctionObj = acc["auctions"].find(
        (auction) => auction.id == notification.auctionId
      );
      console.log(auctionObj);

      let notificationHTML = `
           <div class="notification-details">
            <img src="${
              notification.bikeImage
            }" alt="Bike Image" class="bike-image" />
            <div class="info">
              <h3>Auction Notification</h3>
              <p>${auctionObj.regReason || notification.message}</p>
              <p class='notify-time'>${notification.time}</p>
            </div>
          </div>
          
          `;
      if (auctionObj.status == "Rejected" || auctionObj.status == "Expired") {
        notificationHTML += `
        <div class="action-buttons">
    <a class="rejected-btn" href='/Assets/Pages/AuctionHistory/auctionHistoryForSeller.html' >OK</a>
        `;
        function auction() {
          let user = acc["users"].find((user) => user.userID == userID);
          console.log(user);

          let nft = user["notifications"].find(
            (notification) => notification.auctionId == auctionObj.id
          );
          console.log(nft);

          nft.respond = true;
          updateAuctionSystem(acc);
        }
        notificationItem.addEventListener("click", (e) => {
          if (e.target.tagName == "A") {
            auction();
          }
        });
      } else {
        notificationHTML += `
<div class="action-buttons">
  <a class="agree-btn" href='/Assets/Pages/AgreementPage/agreement.html?userId=${notification.userId}&auctionId=${notification.auctionId}&bikeModel=${notification.bikeName}&finalPrice=${notification.finalPrice}&endDate=${notification.endDate}&notifyID=${notification.notificationId}'>Agree</a>
   <a class="cancel-btn" href='/Assets/Pages/AgreementPage/agreement.html?userId=${notification.userId}&auctionId=${notification.auctionId}&bikeModel=${notification.bikeName}&finalPrice=${notification.finalPrice}&endDate=${notification.endDate}&notifyID=${notification.notificationId}'>cancel</a>
</div>
`;
      }

      notificationItem.innerHTML = notificationHTML;
      container.appendChild(notificationItem);
    });
  } else {
    localStorage.setItem("notifications", false);
    disPlayMessage({
      parent: container,
      type: "info",
      message: "No new notifications!",
      pad: 10,
    });
  }
}

const currentUserID = localStorage.getItem("_id");
const notifications = getAuctionSystem()
  ["users"].find((user) => user.userID == currentUserID)
  ["notifications"]?.filter((notification) => !notification.respond);

renderNotification(notifications);
