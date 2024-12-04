import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import 'dotenv/config';
import clientRouter from './routes/clientRouter';
import productRouter from './routes/productRouter';
import commentsRouter from './routes/commentsRouter';
import adminRouter from './routes/adminRouter';
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

//routes
app.use("/api/clients", clientRouter);
app.use("/api/products", productRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/admin", adminRouter);

//DB
const dbUrl = "mongodb+srv://toharkenin:Q9cij3M4GHk%409Sx@cluster0.bbpiv.mongodb.net";
const database = 'AI-Shop';


//DB connection
mongoose.connect(`${dbUrl}/${database}`).then(()=>{
    console.info("DB connected")
}).catch((err)=>{
    console.error(err)
});