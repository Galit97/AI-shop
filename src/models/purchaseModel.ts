import { Schema, model, Document } from 'mongoose';
import { Client } from './clientModel';
import { Product } from './productModel';

export interface Purchase extends Document {
  id: string;
  client: Client;
  product: Product;
  orderPrice: number;
}

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
    orderPrice: {
        type: Number,
        required: true,
    }
});

export const PurchaseModel = model('Purchase', PurchaseSchema);
