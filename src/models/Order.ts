import mongoose, {Schema, Document} from "mongoose";

interface IOrder extends Document {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    address: string;
    products: {
        productId: mongoose.Schema.Types.ObjectId;
        title: string;
        price: number;
        quantity: number;
    } [];

    totalAmount: number;
    status: "pending" | "shiped" | "delivered" | "cancelled";
}


const OrderSchema = new Schema<IOrder>(
    {
        customerName: {type: String, required: true},
        customerEmail: {type: String, required: true},
        customerPhone: {type: String, required: true},
        address: { type: String, required: true },
        products: [
            {
                productId: {type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true},
                title: {type: String, required: true},
                price: {type: Number, required: true},
                quantity: {type: Number, required: true, min: 1},
            },
        ],

        totalAmount: {type: Number, required: true},
        status: {type: String, enum: ["pending", "shipped", "deliverd", "cancelled"], default: "pending" },
    }, 
    {timestamps: true}
);

export default mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);