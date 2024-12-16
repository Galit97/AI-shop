import { Schema, model, Document } from 'mongoose';
import { Client } from './clientModel';
import { Product } from './productModel';

export interface Purchase extends Document {
  id: string;
  client: Client;
  product: Product;
  totalPrice: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdDate: Date;
};

export const PurchaseSchema = new Schema<Purchase>({
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
        required: true,
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    createdDate: {
        type: Date,
        required: true,
    }
});

export const PurchaseModel = model('Purchase', PurchaseSchema);
