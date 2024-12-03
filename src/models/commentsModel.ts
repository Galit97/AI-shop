import {Schema, model, Document} from 'mongoose';

export interface Comment extends Document{
    userId: string;
    ProductId: string;
    content: string;
    rating: number; 
}

export const CommentSchema = new Schema<Comment>({
    userId: {
        type: String,
        required: true,
    },
    ProductId: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: false,
    },
    rating: {
        type: Number,
        required: true,
    },
})

export const CommentModel = model("Comment", CommentSchema); 