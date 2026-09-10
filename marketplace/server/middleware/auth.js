const jwt = require('jsonwebtoken')
const { getUser, cleanUser, isMongo, models } = require('../services/store')

const secret = () => process.env.JWT_SECRET || 'thread-development-secret'
const optionalAuthenticate = async (req, res, next) => {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) return next()
  try {
    const payload = jwt.verify(header.slice(7), secret())
    const user = isMongo() ? await models.User.findById(payload.id).lean() : getUser(payload.id)
    if (user && user.status !== 'blocked') req.user = cleanUser(user)
  } catch { /* Public catalog requests remain anonymous when a token is stale. */ }
  next()
}
const authenticate = async (req, res, next) => {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) return res.status(401).json({ message: 'Authentication required.' })
  try {
    const payload = jwt.verify(header.slice(7), secret())
    const user = isMongo() ? await models.User.findById(payload.id).lean() : getUser(payload.id)
    if (!user || user.status === 'blocked') return res.status(401).json({ message: 'Account is unavailable.' })
    req.user = cleanUser(user)
    next()
  } catch { res.status(401).json({ message: 'Invalid or expired token.' }) }
}
const authorize = (...roles) => (req, res, next) => roles.includes(req.user?.role) ? next() : res.status(403).json({ message: 'You do not have permission for this action.' })
module.exports = { authenticate, optionalAuthenticate, authorize }
