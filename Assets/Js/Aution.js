function createAuction(
  auctionId,
  itemId,
  sellerId,
  startingPrice,
  reservePrice,
  endTime
) {
  return {
    id: auctionId,
    itemId: itemId,
    sellerId: sellerId,
    startingPrice: startingPrice,
    currentPrice: startingPrice,
    reservePrice: reservePrice,
    bids: [],
    endTime: endTime,
    winnerId: null,
    status: null,
    bidHistory: [],
    paymentMethod: null,
    reponseCount: 0,
  };
}
