const { z } = require("zod");
const { ListingStatus } = require("../services/ListingService");

const listingSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  startingPrice: z.number().positive("Starting price must be a positive number"),
  seller: z.string().min(1, "Seller is required"),
  status: z.enum(Object.keys(ListingStatus)).optional().default(ListingStatus.ACTIVE),
  endsAt: z.date().refine(date => date > new Date(), {
    message: "End date must be in the future",
  }),
});

module.exports = listingSchema;
