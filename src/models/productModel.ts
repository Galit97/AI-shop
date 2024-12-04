import {Schema, model, Document} from 'mongoose';
import { Comment } from './commentsModel';

export interface Product extends Document{
    id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    quantity: number;
    inStock: boolean;
    inSale: boolean;
    comments: Comment[];
    rating: number; //calculate the rating from the comments, using the productId
}

export const ProductSchema = new Schema<Product>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    inStock: {
        type: Boolean,
        required: true,
    },
    inSale: {
        type: Boolean,
        required: true,
    },
    comments: {
        type: [String],
        required: true,
    },
    rating: {
        type: Number,
    }
})

export const ProductModel = model("Product", ProductSchema); 