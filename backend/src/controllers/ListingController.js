const connection = require("../database/connection");
const { ListingStatus } = require("../services/ListingService");
const listingSchema = require("../validators/listingValidator");
const ListingDTO = require("./dtos/ListingDTO");

class ListingController {
  constructor(service) {
    this.service = service;
  }

  index = async (_, res) => {
    try {
      const listings = await this.service.getListings();

      console.log(listings);

      const listingsDTO = listings.map(
        (listing) => new ListingDTO(listing)
      );

      return res.json(listingsDTO);
    } catch (e) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  show = async (req, res) => {
    try {
      const { listingId } = req.params;

      const listing = await this.service.getListingById(listingId);

      if (!listing) {
        return res.status(404).json({ error: "Listing not found" });
      }

      const listingDTO = new ListingDTO(listing);

      return res.json(listingDTO);
    } catch (e) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  create = async (req, res) => {
    const listingInValidation = listingSchema.safeParse(req.body);

    if (!listingInValidation.success) {
      return res.status(400).json(listingInValidation.error.errors);
    }

    const listing = {
      ...listingInValidation.data,
      createdAt: new Date(publishedAt).toISOString(),
    };

    const [id] = await this.listingService.createListing(listing);

    const createdListing = { id, ...listing };

    return res.status(201).json(createdListing);
  };
}

module.exports = ListingController;
