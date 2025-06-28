const { faker, fa } = require("@faker-js/faker");
const { select } = require("../connection");

const fakeImageUrl = () => {
  const id = faker.number.int({ min: 1, max: 500 });
  return `https://picsum.photos/id/${id}/200/200`;
};

exports.seed = async function (knex) {
  await knex("listings").del();

  const listing = {
    title: faker.book.title(),
    description: faker.lorem.paragraph(),
    startingPrice: faker.commerce.price({ min: 10, max: 1000, dec: 2 }),
    seller: faker.person.firstName(),
    imageUrl: fakeImageUrl(),
    status: "active",
    createdAt: new Date("2025-06-20T10:00:00.000Z").toISOString(),
    endsAt: new Date("2025-07-20T23:58:59.000Z").toISOString(),
  };

  const activeListings = Array.from({ length: 9 }).map(() => ({
    title: faker.book.title(),
    description: faker.lorem.paragraph(),
    startingPrice: faker.commerce.price({ min: 10, max: 1000, dec: 2 }),
    seller: faker.person.firstName(),
    imageUrl: fakeImageUrl(),
    status: "active",
    createdAt: faker.date.recent({ days: 30 }).toISOString(),
    endsAt: faker.date.future({ days: 30 }).toISOString(),
  }));

  const finishedListings = Array.from({ length: 3 }).map(() => ({
    title: faker.book.title(),
    description: faker.lorem.paragraph(),
    startingPrice: faker.commerce.price({ min: 10, max: 1000, dec: 2 }),
    seller: faker.person.firstName(),
    imageUrl: fakeImageUrl(),
    status: "finished",
    createdAt: faker.date.recent({ days: 30 }).toISOString(),
    endsAt: faker.date.future({ days: 30 }).toISOString(),
  }));

  await knex("listings").insert([
    listing, 
    ...activeListings,
    ...finishedListings,
  ]);
};
