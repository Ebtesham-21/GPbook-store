import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    category: String,
    ageGroup: String,
    price: Number,
    image: String,
    createdAt : { type: Date, default: Date.now }

});

export default mongoose.models.Book || mongoose.model('Book', BookSchema);