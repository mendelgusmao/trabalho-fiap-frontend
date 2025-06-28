class BidDTO {
  constructor(bid) {
    const data = {
      id: bid.id,
      listingId: bid.listingId,
      bidder: bid.bidder,
      value: bid.value,
      createdAt: new Date(bid.createdAt),
    };

    Object.assign(this, data);
  }

  static fromEntity(bid) {
    return new BidDTO(bid);
  }
};

module.exports = BidDTO;
