import "dotenv/config";
import { app } from "./app.js";
import connectDB from "./db/db.js";

connectDB()
.then(()=>{
    app.listen(process.env.PORT, () =>{
        console.log(`app is listing on port ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log(`error in listing server ${err}`)
});

