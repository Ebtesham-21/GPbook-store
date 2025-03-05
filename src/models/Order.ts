import mongoose, {Schema, Document} from "mongoose";

interface IOrder extends Document {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    address: string;
    products: {
        
    }
}