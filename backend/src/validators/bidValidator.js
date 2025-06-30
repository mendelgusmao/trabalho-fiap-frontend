const { z } = require("zod");

const bidSchema = z.object({
  bidder: z.string().min(1, "Bidder name is required"),
  value: z.number().positive(),
});

module.exports = {bidSchema};
