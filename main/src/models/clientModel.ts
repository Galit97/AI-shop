import {Schema, model, Document} from 'mongoose';

export interface Client extends Document{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password:string
    phoneNumber: string;
    address: string;
}

export const ClientSchema = new Schema<Client>({
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
    phoneNumber:{
        type:String,
        unique:true,
        required:true
    },
    address: {
        type:String,
    }
    
})

export const ClientModel = model("Client", ClientSchema); 