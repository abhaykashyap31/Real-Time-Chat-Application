const express = require("express");
const {chats} = require("./data/data");
const connectDB = require("./config/db");
const chatRoutes = require("./Routes/chatRoutes");
const {notFound, errorHandler} = require("./middleware/errorMiddleware");
const userRoutes = require("./Routes/userRoutes");

const app = express();
require('dotenv').config();
connectDB();

// Done so that it accepts JSON data

app.use(express.json()); 

app.get('/', (req,res) => {
    res.send("Api is running");
});

app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes);

app.use(notFound);
app.use(errorHandler);

// app.get('/api/chat',(req,res) => {
//     res.send(chats)
// })

app.get('/api/chat/:id',(req,res)=>{
    // console.log(req.params.id);
    const singleChat = chats.find((c) => c._id === req.params.id);
    res.send(singleChat);
});

const PORT = process.env.PORT || 3000

app.listen(3000,console.log(`Server running on port ${PORT}`));

