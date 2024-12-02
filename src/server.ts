import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import 'dotenv/config';
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

//DB
const dbUrl = "mongodb+srv://toharkenin:Q9cij3M4GHk%409Sx@cluster0.bbpiv.mongodb.net";
const database = 'AI-Shop';


//DB connection
mongoose.connect(`${dbUrl}/${database}`).then(()=>{
    console.info("DB connected")
}).catch((err)=>{
    console.error(err)
});