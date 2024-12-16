import {Schema, model, Document} from 'mongoose';
import { Product } from './productModel';

export interface Cart extends Document{
    product: Product[];
    clientId: string;
    total: number;
};

export const CartSchema = new Schema<Cart>({
    product: [{
        type: Schema.Types.ObjectId,
        ref: 'product',
        required:true,
    }],
    clientId: {
        type: String,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
});

export const CartModel = model("Cart", CartSchema); 