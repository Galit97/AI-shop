import {Schema, model, Document} from 'mongoose';

export interface Admin extends Document{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password:string
}

export const AdminSchema = new Schema<Admin>({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password: {
        type:String,
        unique:true,
        required:true,
    },
    
})

export const AdminModel = model("Admin", AdminSchema); 