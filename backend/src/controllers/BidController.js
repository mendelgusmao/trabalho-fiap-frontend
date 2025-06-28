const { BidError } = require("../services/BidService");
const { bidSchema } = require("../validators/bidValidator");
const BidDTO = require("./dtos/BidDTO");

class BidController {
  constructor(bidService, listingService, broadcastService) {
    this.bidService = bidService;
    this.listingService = listingService;
    this.broadcastService = broadcastService;
  }

  index = async (req, res) => {
    try {
      const { listingId } = req.params;
      const bids = await this.bidService.getBidsByListingId(listingId);

      if (!bids) return res.json([]);

      const bidsDTO = bids.map(
        (bid) => BidDTO.fromEntity(bid)
      );

      return res.json(bidsDTO);
    } catch (e) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  create = async (req, res) => {
    const bidRequest = bidSchema.safeParse(req.body);

    if (!bidRequest.success) {
      const {errors} = bidRequest.error;
      return res.status(400).json({errors});
    }

    const { listingId } = req.params;
    const listing = await this.listingService.getListingById(listingId);

    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }

    const { value, bidder } = bidRequest.data;

    try {
      const bid = await this.bidService.createBid({
        listingId,
        bidder,
        value,
      }, listing);

      const bidDTO = BidDTO.fromEntity(bid);

      this.broadcastService.emit(bidDTO);

      return res.status(201).json(bidDTO);
    } catch (e) {
      if (e instanceof BidError) {
        return res.status(409).json({ error: e.message });
      } else {
        return res.status(500).json({ error: "Internal server error" });
      }
    }
  }
};

module.exports = BidController;
