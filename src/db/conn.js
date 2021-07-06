const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://shresth:shresth123@cluster0.wlqaa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(()=>{
    console.log(`connection successful`);
}).catch((e)=>{
    console.log(`connection not successful`);
})