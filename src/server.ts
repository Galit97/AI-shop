import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import 'dotenv/config';
import clientRouter from './routes/clientRouter';
import productRouter from './routes/productRouter';
import commentsRouter from './routes/commentsRouter';
import adminRouter from './routes/adminRouter';
import cookieParser from 'cookie-parser';

import chatBotRouter from './routes/chatBotRouter';

import categoryRouter from './routes/categoriesRouter';
import cartRouter from './routes/cartRouter';
import cookiesRouter from './routes/cookiesRouter';
import connectUsRouter from './routes/connectUsRouter';
import interactionsRouter from './routes/interactionsRouter';
import ratingRouter from './routes/ratingRouter';

const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use(cookieParser());



app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

//routes
app.use("/api/clients", clientRouter);
app.use("/api/products", productRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/admin", adminRouter);
app.use("/api/chatBot", chatBotRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/cart", cartRouter);
app.use("/api/cookies", cookiesRouter);
app.use("/api/connectUs", connectUsRouter);
app.use("/api/interaction", interactionsRouter);
app.use("/api/rating", ratingRouter);



//DB
const dbUrl = "mongodb+srv://toharkenin:Q9cij3M4GHk%409Sx@cluster0.bbpiv.mongodb.net";
const database = 'AI-Shop';


//DB connection
mongoose.connect(`${dbUrl}/${database}`).then(()=>{
    console.info("DB connected")
}).catch((err)=>{
    console.error(err)
});