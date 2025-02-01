import express from "express";
import router from "./routes/user.route.js";
import cookieParser from "cookie-parser";

const app= express();
app.use(express.json());
app.use(cookieParser());

app.get("/", (req,res)=>{
    res.send("Hello World");
})
app.use("/api/users",router)

export {app}