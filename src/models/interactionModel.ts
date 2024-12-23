import mongoose from 'mongoose';
import { Client } from './clientModel';
import { Product } from './productModel';

interface Interaction {
    clientId: Client;
    productId: Product;
    type: string | 'view' | 'addToCart' | 'rating';
    score: number;
} 

export const interactionSchema = new mongoose.Schema({
  clientId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Client', 
    required: true 
},
  productId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true 
},
  type: { 
    type: String, 
    enum: ['view', 'addToCart', 'rating'], 
    required: true },
  timestamp: { 
    type: Date, 
    default: Date.now 
},
  score: { 
    type: Number, 
    default: 1 
}, 
});

export const Interaction = mongoose.model('Interaction', interactionSchema);