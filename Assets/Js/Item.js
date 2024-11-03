function createItem(
  id,
  name,
  model,
  brand,
  year,
  capacity,
  owner,
  image,
  createdBy,
  state,
  city
) {
  return {
    id,
    name,
    model,
    brand,
    year,
    capacity,
    owner,
    image,
    createdBy,
    state,
    city,
    auctionId: null,
    setActionid: function (id) {
      this.auctionId = id;
    },
    getAuctionid: function () {
      return this.auctionId;
    },
  };
}
