const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'seller', 'admin'], default: 'customer' },
  status: { type: String, enum: ['active', 'pending', 'blocked'], default: 'active' },
  phone: String,
  address: String,
}, { timestamps: true })
const sellerSchema = new mongoose.Schema({ userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, businessName: String, approvalStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' } }, { timestamps: true })
const categorySchema = new mongoose.Schema({ name: { type: String, required: true, unique: true, trim: true } }, { timestamps: true })
const productSchema = new mongoose.Schema({ sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, title: { type: String, required: true }, description: String, price: { type: Number, min: 0, required: true }, stock: { type: Number, min: 0, default: 0 }, images: [String], status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' } }, { timestamps: true })
const cartSchema = new mongoose.Schema({ customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true }, items: [{ productId: mongoose.Schema.Types.ObjectId, quantity: Number }] }, { timestamps: true })
const orderSchema = new mongoose.Schema({ customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, items: [{ productId: mongoose.Schema.Types.ObjectId, sellerId: mongoose.Schema.Types.ObjectId, title: String, price: Number, quantity: Number }], totalAmount: Number, orderStatus: { type: String, enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'], default: 'pending' }, shippingAddress: String }, { timestamps: true })
const reviewSchema = new mongoose.Schema({ customerId: mongoose.Schema.Types.ObjectId, productId: mongoose.Schema.Types.ObjectId, rating: { type: Number, min: 1, max: 5 }, comment: String }, { timestamps: true })

module.exports = {
  User: mongoose.models.User || mongoose.model('User', userSchema), Seller: mongoose.models.Seller || mongoose.model('Seller', sellerSchema), Category: mongoose.models.Category || mongoose.model('Category', categorySchema), Product: mongoose.models.Product || mongoose.model('Product', productSchema), Cart: mongoose.models.Cart || mongoose.model('Cart', cartSchema), Order: mongoose.models.Order || mongoose.model('Order', orderSchema), Review: mongoose.models.Review || mongoose.model('Review', reviewSchema),
}
