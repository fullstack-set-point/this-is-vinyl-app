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
    username: 'musicLover5',
    email: 'musiclover5@email.com',
    password: '123',
    isAdmin: false,
    addressStreet: '123 Main Street',
    addressCity: 'Chicago',
    addressState: 'IL',
    addressZipcode: '60614'
  },
  {
    username: 'musicAdmin',
    email: 'musicAdmin@email.com',
    password: '567',
    isAdmin: true,
    addressStreet: '567 Michigan Ave.',
    addressCity: 'Chicago',
    addressState: 'IL',
    addressZipcode: '60614'
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
  const [thriller, hotelCalifornia, comeOnOver] = product
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
