const express = require('express');
const dotenv =require('dotenv');
const app = express();
const bodyparser = require('body-parser');
const userRouter = require("./routes/userRoutes");
const adminRouter = require("./routes/adminRoutes");
const mediaRouter = require("./routes/mediaUploaderRoutes");
const authRouter = require("./routes/authRoutes");
const swaggerDocs =require("./swagger")

const cors = require("cors");
app.use(cors());
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended : true}))
const connectDB = require('./config/connection');
  
dotenv.config({ path: ".env" });
const PORT = process.env.PORT||8080
connectDB();
app.use(express.json())



app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/media", mediaRouter);
app.use("/auth", authRouter);

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
});
swaggerDocs(app, PORT)
