class BidError extends Error {
  constructor(message) {
    super(message);
  }
}

class BidService {
  constructor(connection) {
    this.connection = connection;
    this.transaction = () => this.connection("bids");
  }

  async getBidsByListingId(listingId) {
    try {
      return await this.transaction().where({listingId}).orderBy("id", "desc");
    } catch (error) {
      console.error(`Error fetching bids for listing ${listingId}:`, error);
      throw error;
    }
  }

  async createBid(bidRequest, listing) {
    const { listingId, bidder, value } = bidRequest;  

    if (listing.startingPrice >= value) {
      throw new BidError("The bid value is lesser than the listing's base price.");
    }

    try {
      const lastBid = await this.transaction().where({ listingId }).orderBy("createdAt", "desc").first();

      if (lastBid && lastBid.value >= value) {
        throw new BidError("The bid value is lesser than the last bid's.");
      }

      if (lastBid && new Date() > lastBid.createdAt) {
        throw new BidError("The auction of this listing has ended.");
      }

      const bid = {
        listingId,
        bidder,
        value,
        createdAt: new Date().toISOString(),
      };

      const [id] = await this.transaction().insert(bid);

      return {
        id,
        ...bid,
      }; 
    } catch (error) {
      console.error(`Error creating bid for listing ${listingId}:`, error);
      throw error;
    }
  }
}

module.exports = { BidService, BidError };
