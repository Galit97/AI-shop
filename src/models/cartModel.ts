import {Schema, model, Document} from 'mongoose';
import { Product } from './productModel';

interface CartProduct {
    product: Product;
    quantity: number;
}

export interface Cart extends Document{
    products: CartProduct[];
    clientId: string;
    total: number;
};

export const CartSchema = new Schema<Cart>({
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
        }
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