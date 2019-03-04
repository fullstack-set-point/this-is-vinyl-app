'use strict'

const faker = require('faker')
const db = require('../server/db')
const {
  Cart,
  CartItem,
  Category,
  Order,
  OrderItem,
  Product,
  Review,
  User
} = require('../server/db/models')

const categories = [
  {
    name: 'Rock'
  },
  {
    name: 'Reggae'
  },
  {
    name: 'Country'
  },
  {
    name: 'Jazz'
  },
  {
    name: 'Rap'
  },
  {
    name: 'Electronic'
  },
  {
    name: 'Pop'
  },
  {
    name: 'Metal'
  },
  {
    name: 'Folk'
  },
  {
    name: 'Classical'
  }
]

const products = []
for (let i = 0; i < 1000; i++) {
  let product = {
    album: faker.lorem.words(),
    artist: faker.name.findName(),
    year: faker.random.number({min: 1920, max: 2020}),
    price: faker.finance.amount(10, 30, 2),
    quantity: faker.random.number(100),
    photo: faker.image.image()
  }
  products.push(product)
}

const users = [
  {
    firstName: 'John',
    lastName: 'Lennon',
    imageUrl: faker.image.avatar(),
    email: 'jlennon@email.com',
    password: '123',
    isAdmin: true,
    isAuth: true,
    address: '123 Penny Lane',
    city: 'Strawberry Fields',
    state: 'CA',
    zip: '99999'
  },
  {
    firstName: 'George',
    lastName: 'Harrison',
    imageUrl: faker.image.avatar(),
    email: 'gharrison@email.com',
    password: '456',
    isAdmin: false,
    isAuth: true,
    address: '999 Penny Lane',
    city: 'Strawberry Fields',
    state: 'CA',
    zip: '99999'
  }
]
for (let i = 0; i < 50; i++) {
  let user = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    imgUrl: faker.image.avatar(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    isAdmin: faker.random.boolean(),
    isAuth: faker.random.boolean(),
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    zip: faker.address.zipCode()
  }
  users.push(user)
}

const reviews = []
for (let i = 0; i < 50; i++) {
  let review = {
    rating: faker.random.number(5),
    title: faker.lorem.sentence(),
    comment: faker.lorem.paragraph(),
    date: faker.date.past()
  }
  reviews.push(review)
}

const orders = []
for (let i = 0; i < 50; i++) {
  let order = {
    total: faker.finance.amount(10, 200, 2),
    orderDate: faker.date.past(),
    orderStatus: faker.random.arrayElement([
      'Created',
      'Processing',
      'Completed',
      'Cancelled'
    ])
  }
  orders.push(order)
}

const orderItems = []
const cartItems = []
const carts = []

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const promiseForInsertedData = await Promise.all([
    Cart.bulkCreate(carts, {returning: true}),
    CartItem.bulkCreate(cartItems, {returning: true}),
    Category.bulkCreate(categories, {returning: true}),
    Order.bulkCreate(orders, {returning: true}),
    OrderItem.bulkCreate(orderItems, {returning: true}),
    Product.bulkCreate(products, {returning: true}),
    Review.bulkCreate(reviews, {returning: true}),
    User.bulkCreate(users, {returning: true})
  ])

  console.log(`seeded ${promiseForInsertedData.length} tables`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
