import {Schema, model, Document} from 'mongoose';

export interface Category extends Document{
    id: string;
    name: string;
};

export const CategorySchema = new Schema<Category>({
    name:{
        type:String,
        required:true,
        unique:true,
    },
});

export const CategoryModel = model("Category", CategorySchema); 