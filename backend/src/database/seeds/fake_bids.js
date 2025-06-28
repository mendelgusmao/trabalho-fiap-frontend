const { faker, fa } = require("@faker-js/faker");
const { select } = require("../connection");

exports.seed = async function (knex) {
  await knex("bids").del();

  Array.from({ length: 13 }).map(async (_, listingId) => {
    let value = faker.number.float({ min: 1, max: 1000, fractionDigits: 2 });

    const bids = Array.from({ length: 5 }).reduce(
      (acc, _) => {
        value += faker.number.float({ min: 1, max: 10, fractionDigits: 2 });

        const bid = {
          listingId,
          bidder: faker.person.firstName(),
          value,
          createdAt: faker.date.recent({ days: 30 }).toISOString(),
        };

        return [...acc, bid];
      }, 
      []
    );

    await knex("bids").insert(bids);
  });
};
