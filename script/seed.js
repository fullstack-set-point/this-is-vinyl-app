'use strict'

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

const cartData = [{}]

const cartItemData = [
  {
    price: 10.5,
    quantity: 1
  }
]

const categoryData = [
  {
    name: 'Rock'
  },
  {
    name: 'Classical'
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
  }
]

const orderData = [
  {
    total: 21,
    orderDate: new Date(2019, 2, 1),
    orderStatus: 'Created'
  },
  {
    total: 10.5,
    orderDate: new Date(2019, 1, 1),
    orderStatus: 'Processing'
  }
]

const orderItemData = [
  {
    price: 10.5,
    quantity: 2
  },
  {
    price: 10.5,
    quantity: 1
  },
  {
    price: 10.5,
    quantity: 1
  }
]

const productData = [
  {
    album: 'Thriller',
    artist: 'Michael Jackson',
    year: 1982,
    price: 10.5,
    quantity: 100,
    photo:
      'https://cdn.pastemagazine.com/www/blogs/lists/2012/01/30/3_80sAlbums_Thriller.jpeg'
  },
  {
    album: 'Hotel California',
    artist: 'Eagles',
    year: 1976,
    price: 10.5,
    quantity: 100,
    photo:
      'https://cdn.pastemagazine.com/www/articles/2018/08/21/eagles-hotel-ca.jpg'
  },
  {
    album: 'Come on Over',
    artist: 'Shania Twain',
    year: 1997,
    price: 10.5,
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
    album: 'Dark Aide of the Moon',
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
  }
]

const reviewData = [
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
  }
]

const userData = [
  {
    firstName: 'Chancelor',
    lastName: 'Bennett',
    email: 'acidrap@email.com',
    password: '123',
    isAdmin: false,
    address: '123 Clark St.',
    city: 'Chicago',
    state: 'IL',
    zip: '60614'
  },
  {
    firstName: 'Anthony',
    lastName: 'Kiedis',
    email: 'cantstop@email.com',
    password: '666',
    isAdmin: false,
    address: '88 Wilshire Blvd.',
    city: 'Los Angeles',
    state: 'CA',
    zip: '90210'
  },
  {
    firstName: 'Jerry',
    lastName: 'Garcia',
    email: 'gratefuldead@email.com',
    password: '975',
    isAdmin: true,
    address: '145 S. Van Ness St.',
    city: 'San Francisco',
    state: 'CA',
    zip: '94110'
  },
  {
    firstName: 'Jack',
    lastName: 'White',
    email: 'thirdman@email.com',
    password: 'password',
    isAdmin: false,
    address: '456 Broadway Ave.',
    city: 'Nashville',
    state: 'TN',
    zip: '32011'
  },
  {
    firstName: 'Jon',
    lastName: 'Bon Jovi',
    email: 'livingonaprayer@email.com',
    password: 'idk',
    isAdmin: false,
    address: '900 Wall St.',
    city: 'New York',
    state: 'NY',
    zip: '10001'
  },
  {
    firstName: 'Eddie',
    lastName: 'Vetter',
    email: 'pearljam@email.com',
    password: 'secret',
    isAdmin: true,
    address: '22 Pike St.',
    city: 'Seattle',
    state: 'WA',
    zip: '98101'
  },
  {
    firstName: 'Dave',
    lastName: 'Grohl',
    email: 'learntofly@email.com',
    password: 'foobar',
    isAdmin: true,
    address: '1000 Pennsyvlania Blvd.',
    city: 'Washington',
    state: 'DC',
    zip: '2019'
  },
  {
    firstName: 'Paul',
    lastName: 'McCartney',
    email: 'beatles@email.com',
    password: 'ringosucks',
    isAdmin: false,
    address: '1 Abbey Rd.',
    city: 'London',
    state: 'UK',
    zip: '93472'
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const promiseForInsertedData = await Promise.all([
    Cart.bulkCreate(cartData, {returning: true}),
    CartItem.bulkCreate(cartItemData, {returning: true}),
    Category.bulkCreate(categoryData, {returning: true}),
    Order.bulkCreate(orderData, {returning: true}),
    OrderItem.bulkCreate(orderItemData, {returning: true}),
    Product.bulkCreate(productData, {returning: true}),
    Review.bulkCreate(reviewData, {returning: true}),
    User.bulkCreate(userData, {returning: true})
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
  ] = await promiseForInsertedData
  const [cart1] = cart
  const [cartItem1] = cartItem
  const [rock, classical, country, jazz, rap, electronic, pop] = category
  const [order1, order2] = order
  const [orderItem1, orderItem2, orderItem3] = orderItem
  const [
    thriller,
    hotelCalifornia,
    comeOnOver,
    zeppelin,
    rumours,
    backInBlack,
    darkSide,
    one,
    legend
  ] = product
  const [review1, review2, review3, review4] = review
  const [user1, user2] = user

  await Promise.all([
    thriller.setReviews([review1, review2]),
    hotelCalifornia.setReviews(review3),
    comeOnOver.setReviews(review4),
    thriller.setCategories([rock, pop]),
    hotelCalifornia.setCategories(rock),
    comeOnOver.setCategories([country, pop]),
    orderItem1.setOrder(order1),
    orderItem2.setOrder(order1),
    orderItem3.setOrder(order2),
    order1.setUser(user1),
    order2.setUser(user1),
    user1.setReviews([review1, review3, review4]),
    user2.setReviews(review2),
    cart1.setUser(user1),
    cartItem1.setCart(cart1)
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
