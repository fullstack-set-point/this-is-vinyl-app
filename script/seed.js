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

const products = [
  {
    album: 'Thriller',
    artist: 'Michael Jackson',
    year: 1982,
    price: 8,
    quantity: 100,
    photo:
      'https://cdn.pastemagazine.com/www/blogs/lists/2012/01/30/3_80sAlbums_Thriller.jpeg'
  },
  {
    album: 'Hotel California',
    artist: 'Eagles',
    year: 1976,
    price: 9,
    quantity: 100,
    photo:
      'https://cdn.pastemagazine.com/www/articles/2018/08/21/eagles-hotel-ca.jpg'
  },
  {
    album: 'Come on Over',
    artist: 'Shania Twain',
    year: 1997,
    price: 10,
    quantity: 100,
    photo:
      'https://cdn.pastemagazine.com/www/articles/2018/08/21/shania-come-on-over.jpg'
  },
  {
    album: 'Led Zeppelin IV',
    artist: 'Led Zeppelin',
    year: 1971,
    price: 12,
    quantity: 100,
    photo:
      'https://cdn.pastemagazine.com/www/blogs/lists/assets_c/2012/05/220px-LedZeppelinFourSymbols-thumb-250x250-67364.jpg'
  },
  {
    album: 'Rumours',
    artist: 'Fleetwood Mac',
    year: 1977,
    price: 11,
    quantity: 100,
    photo:
      'https://cdn.pastemagazine.com/www/blogs/lists/assets_c/2012/05/220px-FMacRumours-thumb-250x250-67340.png'
  },
  {
    album: 'Back in Black',
    artist: 'AC/DC',
    year: 1980,
    price: 10,
    quantity: 100,
    photo:
      'https://cdn.pastemagazine.com/www/blogs/lists/2012/01/30/20_80sAlbums_BackinBlack.jpeg'
  },
  {
    album: 'Dark Side of the Moon',
    artist: 'Pink Floyd',
    year: 1973,
    price: 12,
    quantity: 100,
    photo:
      'https://cdn.pastemagazine.com/www/articles/2018/08/21/pink-floyd-dark-side.jpg'
  },
  {
    album: '1',
    artist: 'The Beatles',
    year: 2000,
    price: 14,
    quantity: 100,
    photo: 'https://cdn.pastemagazine.com/www/articles/2018/08/21/beatles-1.jpg'
  },
  {
    album: 'Legend',
    artist: 'Bob Marley & The Wailers',
    year: 1984,
    price: 11,
    quantity: 100,
    photo:
      'https://cdn.pastemagazine.com/www/articles/2018/08/21/bob-marley-legend.jpg'
  },
  {
    album: 'American Gangster',
    artist: 'Jay-Z',
    year: 2007,
    price: 10,
    quantity: 100,
    photo:
      'https://img.discogs.com/cBMfQ_IUhOYzyw70lBHgSXoiPEI=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-1133742-1200816129.jpeg.jpg'
  },
  {
    album: 'Freedom of Choice',
    artist: 'Devo',
    year: 1980,
    price: 8,
    quantity: 100,
    photo:
      'https://img.discogs.com/MCwJenZVU40HRlDUqUqQJAOPDRw=/fit-in/591x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-17377-1278376145.jpeg.jpg'
  },
  {
    album: 'True Blue',
    artist: 'Madonna',
    year: 1986,
    price: 9,
    quantity: 100,
    photo:
      'https://img.discogs.com/cbJuSllK1fmn5bCO5OIjNVy4so8=/fit-in/600x597/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-597222-1290446870.jpeg.jpg'
  }
]
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
    isAuth: true,
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    zip: faker.address.zipCode()
  }
  users.push(user)
}

const reviews = [
  {
    rating: 4,
    comment: 'Great album.'
  },
  {
    rating: 1,
    comment: 'Horrible.'
  },
  {
    rating: 5,
    comment: 'Amazing.'
  },
  {
    rating: 2,
    comment: 'Meh.'
  },
  {
    rating: 4,
    comment: 'One of the best.'
  },
  {
    rating: 5,
    comment: 'My favorite album of all time!'
  },
  {
    rating: 1,
    comment: 'Such a disappointment.'
  },
  {
    rating: 3,
    comment: 'They have better albums.'
  }
]
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
for (let i = 0; i < 10; i++) {
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

  const [
    cart,
    cartItem,
    category,
    order,
    orderItem,
    product,
    review,
    user
  ] = promiseForInsertedData
  const [
    rock,
    reggae,
    country,
    jazz,
    rap,
    electronic,
    pop,
    metal,
    folk,
    classical
  ] = category
  const [
    order1,
    order2,
    order3,
    order4,
    order5,
    order6,
    order7,
    order8,
    order9,
    order10
  ] = order
  const [
    thriller,
    hotelCalifornia,
    comeOnOver,
    zeppelin,
    rumours,
    backInBlack,
    darkSide,
    one,
    legend,
    gangster,
    freedom,
    trueBlue
  ] = product
  const [
    review1,
    review2,
    review3,
    review4,
    review5,
    review6,
    review7,
    review8
  ] = review
  const [user1, user2] = user

  await Promise.all([
    thriller.setReviews([review1, review2]),
    hotelCalifornia.setReviews(review3),
    comeOnOver.setReviews(review4, review5),
    zeppelin.setReviews(review6),
    rumours.setReviews(review7),
    backInBlack.setReviews(review8),
    thriller.setCategories([rock, pop]),
    hotelCalifornia.setCategories(rock),
    comeOnOver.setCategories([country, pop]),
    zeppelin.setCategories(rock),
    rumours.setCategories([rock, pop]),
    backInBlack.setCategories(rock),
    darkSide.setCategories(rock),
    one.setCategories(rock),
    legend.setCategories([reggae, jazz]),
    gangster.setCategories(rap),
    freedom.setCategories([rock, pop, electronic]),
    trueBlue.setCategories([pop, electronic]),
    user1.setReviews([review1, review3, review4]),
    user2.setReviews(review2, review5, review6, review7, review8),
    order1.setUser(user2),
    order2.setUser(user2),
    order3.setUser(user2),
    order4.setUser(user2),
    order5.setUser(user2),
    order6.setUser(user2),
    order7.setUser(user2),
    order8.setUser(user2),
    order9.setUser(user2),
    order10.setUser(user2)
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
