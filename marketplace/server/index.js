require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const apiRoutes = require('./routes/api')
const bcrypt = require('bcryptjs')
const { store, models } = require('./services/store')

const app = express()
const port = process.env.PORT || 5000
const ensureAdmin = async () => {
  await models.User.deleteOne({ email: 'admin@thread.local', role: 'admin' })
  const exists = await models.User.exists({ email: 'admin@cottonenergy.com' })
  if (!exists) await models.User.create({ name: 'Administrator', email: 'admin@cottonenergy.com', password: await bcrypt.hash('admin123', 10), role: 'admin', status: 'active' })
}
app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.get('/api/health', (req, res) => res.json({ status: 'ok', database: mongoose.connection.readyState === 1 ? 'connected' : 'memory mode', resources: Object.fromEntries(Object.entries(store).map(([key, value]) => [key, value.length])) }))
app.use('/api', apiRoutes)
app.use((req, res) => res.status(404).json({ message: 'Route not found.' }))
app.use((error, req, res, next) => { console.error(error); res.status(500).json({ message: 'Something went wrong on the server.' }) })

const start = async () => {
  if (process.env.MONGODB_URI) {
    try { await mongoose.connect(process.env.MONGODB_URI); await ensureAdmin(); console.log('MongoDB connected') }
    catch (error) { console.warn(`MongoDB unavailable: ${error.message}`) }
  }
  app.listen(port, () => console.log(`API listening on http://localhost:${port}`))
}
start()
module.exports = app
