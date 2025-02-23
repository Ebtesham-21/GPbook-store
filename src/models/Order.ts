import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    books: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Book' } ],
    customerName: String,
    address: String,
    phone: String,
    status: {type: String, default: 'Pending'},
    createdAt: {type: Date, default: Date.now}
})


export default mongoose.models.Order || mongoose.model('Order', OrderSchema);