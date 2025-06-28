const express = require("express");

const connection = require("./database/connection");

const {ListingService} = require("./services/ListingService");
const {BidService} = require("./services/BidService");
const {BroadcastService} = require("./services/BroadcastService");

const ListingController = require("./controllers/ListingController");
const BidController = require("./controllers/BidController");

const listingService = new ListingService(connection);
const bidService = new BidService(connection);
const broadcastService = new BroadcastService();

const listingController = new ListingController(listingService);
const bidController = new BidController(bidService, listingService, broadcastService);

const router = express.Router();

router.get("/listings", listingController.index);
router.get("/listings/:listingId", listingController.show);

router.get("/listings/:listingId/bids", bidController.index);
router.post("/listings/:listingId/bids", bidController.create);

module.exports = router;
