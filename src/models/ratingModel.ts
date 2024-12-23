import { Schema, model, Document } from 'mongoose';

export const RatingSchema = new Schema({
  clientId: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
 
});

export const RatingModel = model('Rating', RatingSchema);
