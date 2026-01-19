const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");
const ExpressError = require("./ExpressError");


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs" );
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

main().then(()=>{
    console.log("Connection sucessful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');
}

app.get("/delete-duplicates", async (req, res) => {
    const result = await Chat.deleteMany({
        from: "om",
        to: "satyam",
        msg: "send me your exam sheets"
    });
    res.send(`Deleted ${result.deletedCount} duplicate chats.`);
});


app.get("/delete-empty-messages", async (req, res) => {
    const result = await Chat.deleteMany({ msg: { $in: [null, ""] } });
    res.send(`Deleted ${result.deletedCount} chats with empty messages.`);
});


//Index route
app.get("/chats", async(req, res)=>{
    let chats = await Chat.find();
    console.log(chats);
    res.render("index.ejs", {chats});
})

//New Route
app.get("/chats/new", (req, res)=>{
    res.render("new.ejs");
})

// New - Show Route     
app.get("/chats/:id", async (req, res, next)=>{
    try{
    let {id} = req.params;
    let chat =  await Chat.findById(id);
    if(!chat){
        next(new ExpressError(500, "chat not found"));
    }
    res.render("edit.ejs", {chat});
    } catch(err){
        next(err);
    }

});

//Create Route
app.post("/chats", (req, res)=>{
    try{
 let {from, to, msg} = req.body;
    let newChat = new Chat({
        from : from, 
        to : to,
        msg : msg,
        created_at : new Date(),
    });
    newChat.save()
    console.log("chat was saved");
    res.redirect("/chats");
    } catch(err){
        next(err);
    }
});

//Edit Route 
app.get("/chats/:id/edit", async (req, res)=>{
    try{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", {chat});
    } catch(err){
        next(err);
    }
    
})

//Update Route 
app.put("/chats/:id", async(req, res)=>{
    try{
 let {id} = req.params;
     let {msg : newMsg} = req.body;
     let updatedChat = await Chat.findByIdAndUpdate(id, {msg: newMsg}, {runValidator: true, new: true});
     res.redirect("/chats");
    } catch(err){
        next(err);
    }
    
})

//Destroy route 
app.delete("/chats/:id", async (req, res)=>{
    try{
  let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
    } catch{
        next(err);
    }
  
})



app.get("/", (req, res) =>{
    res.send("root is working");
});

app.use((err, req, res, next)=>{
    console.log(err.name);
    next(err);
})

//Error handling middlewares 
app.use((err, req, res, next)=>{
    let {status=500, message="some error is occcured"} = err;
    res.status(status).send(message);
})


app.listen(8080 , () =>{
    console.log("port is listening on the port 8080");
});