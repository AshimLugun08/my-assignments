import mongoose from 'mongoose';

// Define the schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, 
    trim: true, 
  },
  price: {
    type: Number,
    required: true, 
    min: 0, 
  },
  category: {
    type: String,
    required: true,
    enum: ['Hoodie', 'Sweatshirt', 'T-Shirt',   'Jacket', 'Cardigan'], // Top wear categories
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Create the model
const Product = mongoose.model('Product', productSchema);

export default Product;
