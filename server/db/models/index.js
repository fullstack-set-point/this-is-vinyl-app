const Cart = require('./Cart')
const CartItem = require('./CartItem')
const Category = require('./Category')
const Order = require('./Order')
const OrderItem = require('./OrderItem')
const Product = require('./Product')
const Review = require('./Review')
const User = require('./User')

Product.hasMany(Review)
Review.belongsTo(Product)

Product.belongsToMany(Category, {through: 'product_category'})
Category.belongsToMany(Product, {through: 'product_category'})

OrderItem.belongsTo(Order)
Order.hasMany(OrderItem)

Order.belongsTo(User)
User.hasMany(Order)

Review.belongsTo(User)
User.hasMany(Review)

User.belongsTo(Cart)
Cart.hasOne(User)

CartItem.belongsTo(Cart)
Cart.hasMany(CartItem)

module.exports = {
  Cart,
  CartItem,
  Category,
  Order,
  OrderItem,
  Product,
  Review,
  User
}
