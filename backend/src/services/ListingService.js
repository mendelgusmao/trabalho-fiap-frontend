const ListingStatus = {
  ACTIVE: "active",
  PAUSED: "paused",
  FINISHED: "finished",
};


class ListingService {
  constructor(connection) {
    this.connection = connection;
    this.transaction = () => this.connection("listings");
  }

  getListings = async () => {
    try {
      return await this.transaction().orderBy("createdAt", "desc");
    } catch (error) {
      console.error('Error fetching listings:', error);
      throw error;
    }
  }

  getListingById = async (listingId) => {
    try {
      return await this.transaction().where({id: listingId}).orderBy("createdAt", "desc").first();
    } catch (error) {
      console.error('Error fetching listings:', error);
      throw error;
    }
  }
}

module.exports = {ListingService, ListingStatus};  
