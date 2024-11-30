import {Schema, model, Document} from 'mongoose';

export interface Product extends Document{
    id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    quantity: number;
    inStock: boolean;
    inSale: boolean;
    comments: Array<string>;
    rating: number;
}

export const ProductSchema = new Schema<Product>({
    name: {
        type: String,
        
    }
    
})

export const ProductModel = model("Product", ProductSchema); 