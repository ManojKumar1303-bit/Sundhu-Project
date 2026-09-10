const bcrypt = require('bcryptjs')
const { randomUUID } = require('crypto')
const mongoose = require('mongoose')
const models = require('../models/schemas')

const store = { users: [], sellers: [], categories: [], products: [], carts: [], orders: [], reviews: [], wishlists: [] }
const id = () => randomUUID()
const seedAdmin = () => {
  if (!store.users.some((user) => user.email === 'admin@cottonenergy.com')) {
    store.users.push({ id: id(), name: 'Administrator', email: 'admin@cottonenergy.com', password: bcrypt.hashSync('admin123', 10), role: 'admin', status: 'active' })
  }
}
seedAdmin()
const cleanUser = (user) => { const { password, _id, ...safe } = user; return { ...safe, id: String(user.id || _id) } }
const getUser = (userId) => store.users.find((user) => user.id === userId)
const isMongo = () => mongoose.connection.readyState === 1
module.exports = { store, id, cleanUser, getUser, isMongo, models }
