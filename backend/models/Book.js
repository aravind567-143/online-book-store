import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Book title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  author: {
    type: String,
    required: [true, 'Author name is required'],
    trim: true,
    maxlength: [100, 'Author name cannot exceed 100 characters']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  image: {
    type: String,
    required: [true, 'Image URL is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Programming', 'Software Engineering', 'Design', 'Science', 'Fiction', 'Business', 'Self-Help', 'Other']
  },
  rating: {
    type: Number,
    default: 0,
    min: [0, 'Rating cannot be less than 0'],
    max: [5, 'Rating cannot be more than 5']
  },
  inStock: {
    type: Boolean,
    default: true
  },
  stock: {
    type: Number,
    default: 100,
    min: [0, 'Stock cannot be negative']
  },
  isbn: {
    type: String,
    unique: true,
    sparse: true
  },
  publishedYear: {
    type: Number,
    min: [1900, 'Published year must be after 1900'],
    max: [new Date().getFullYear(), 'Published year cannot be in the future']
  }
}, {
  timestamps: true
});

// Index for search optimization
bookSchema.index({ title: 'text', author: 'text', category: 'text' });

const Book = mongoose.model('Book', bookSchema);

export default Book;
