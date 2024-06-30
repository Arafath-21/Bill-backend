import express from "express";
import dotenv from "dotenv"
import dbConnnection from "./database/db.js";
import { userRouter } from "./Routers/UserRouter.js";
import cors from "cors";
import { isAuthenticated } from "./Controllers/auth.js";
import { ItemRouter } from "./Routers/ItemsRouter.js";
import { customerRouter } from "./Routers/CustomerRouter.js";
import { salesRouter } from "./Routers/SalesRouter.js";
import { purchaseRouter } from "./Routers/PurchaseRouter.js";

dotenv.config()
// server
const app = express();
let port = process.env.PORT
// middlewares
app.use(cors());

app.use(express.json());
// app.use(cors());
app.use(express.urlencoded({ extended: false }));

// connecting to DB
dbConnnection();

app.get('/',(req,res)=>{
  res.status(200).send('<h1>Hello</h1>')
})

// listening to port
app.listen(port, () => {
  console.log(`Server Started in ${port}`);
});

app.use("/api", userRouter);
app.use("/api",isAuthenticated, ItemRouter);
app.use("/api",isAuthenticated, customerRouter);
app.use("/api",isAuthenticated, salesRouter);
app.use("/api",isAuthenticated, purchaseRouter);

