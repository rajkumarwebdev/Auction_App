function createBid(id, auctionId, userId, bidAmount) {
  return {
    id: id,
    auctionId: auctionId,
    userId: userId,
    bidAmount: bidAmount,
    time: new Date().toISOString(),
  };
}
