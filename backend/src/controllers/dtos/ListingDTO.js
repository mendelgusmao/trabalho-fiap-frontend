class ListingDTO {
  constructor(listing) {
    const data = {
      id: listing.id,
      title: listing.title,
      description: listing.description,
      startingPrice: listing.startingPrice,
      sellerName: listing.sellerName,
      imageUrl: listing.imageUrl,
      status: listing.status,
      createdAt: new Date(listing.createdAt),
      endsAt: new Date(listing.endsAt),
    };

    Object.assign(this, data);
  }

  static fromEntity(listing) {
    return new ListingDTO(listing);
  }
}

module.exports = ListingDTO;
