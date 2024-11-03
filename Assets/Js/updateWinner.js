function updateWinnerID(auctionID) {
  let acc = getAuctionSystem();
  let currentUserID = localStorage.getItem("_id");
  // update auction id to item obj
  let endedAuction = acc["auctions"].find((auction) => auction.id == auctionID);
  let bike = acc["items"].find((bikes) => bikes.id == endedAuction.itemId);
  let buyerDetails = acc["users"].find((user) => user.userID == currentUserID);
  //   console.log(buyerDetails);

  const highestBid = endedAuction["bids"].reduce(
    (max, auction) => (auction.bidAmount > max.bidAmount ? auction : max),
    { bidAmount: 0 }
  );
  if (highestBid) {
    if (highestBid.bidAmount == 0) {
      //handle no bidded auction
      const message2 = `Your auction for "${bike.name}" has been expired.`;
      const user2 = acc["users"].find(
        (user) => user.userID == endedAuction.sellerId
      );

      let nId2 = crypto.randomUUID();
      const date = new Date();

      const formattedDate = date.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      });
      let notification2 = {
        id: nId2,
        auctionId: endedAuction.id,
        time: formattedDate,
        message: message2,
        bikeImage: bike.image,
        buyerID: highestBid.userId,
        userId: null,
        respond: false,
        role: "seller",
        bikeName: bike.name,
        finalPrice: null,
        endDate: formattedDate,
        notificationId: nId2,
      };
      user2.notifications.push(notification2);
      endedAuction.status = "Expired";
    } else {
      console.log("calling");
      //notification to buyer
      const message1 = `Congratulations! You won the auction for "${bike.name}" with a final bid of RS${highestBid.bidAmount}. Please proceed to the agreement and payment page.`;
      let user = acc["users"].find((user) => user.userID == highestBid.userId);
      const date = new Date();
      const formattedDate = date.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      });
      let nId = crypto.randomUUID();
      let notification = {
        id: nId,
        auctionId: endedAuction.id,
        time: formattedDate,
        message: message1,
        bikeImage: bike.image,
        sellerID: endedAuction.sellerId,
        userId: endedAuction.sellerId,
        respond: false,
        role: "buyer",
        bikeName: bike.name,
        finalPrice: highestBid.bidAmount,
        endDate: formattedDate,
        notificationId: nId,
      };
      user.notifications.push(notification);
      //   console.log("buyer", user);
      //notification to seller

      const message2 = `Your auction for "${bike.name}" has ended. ${buyerDetails.name} won the auction with a bid of RS${highestBid.bidAmount}. Proceed to the agreement page to finalize the sale.`;
      const user2 = acc["users"].find(
        (user) => user.userID == endedAuction.sellerId
      );
      let nId2 = crypto.randomUUID();

      let notification2 = {
        id: nId2,
        auctionId: endedAuction.id,
        time: formattedDate,
        message: message2,
        bikeImage: bike.image,
        buyerID: highestBid.userId,
        userId: highestBid.userId,
        respond: false,
        role: "seller",
        bikeName: bike.name,
        finalPrice: highestBid.bidAmount,
        endDate: formattedDate,
        notificationId: nId2,
      };
      user2.notifications.push(notification2);

      //   console.log("seller", user);
      endedAuction.status = "Completed";
      endedAuction.winnerId = highestBid.userId;
    }
  }
  //   console.log(acc);

  updateAuctionSystem(acc);
  window.location.reload();
}
