const mongoose = require("mongoose");
const Chat = require("./models/chat.js");


main().then(()=>{
    console.log("Connection sucessful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');
}

let allChats = [
    {
        from:"neha",
        to:"om",
        msg:"hi how are you",
        created_at: new Date(),
    },

    {
        from:"Priti",
        to:"om Dwivedi",
        msg:"what are you doing",
        created_at: new Date(),
    },

    {
        from:"maruti",
        to:"om",
        msg:"where are you",
        created_at: new Date(),
    },

    {
        from:"pritam",
        to:"riya",
        msg:"i left you",
        created_at: new Date(),
    },
]

 Chat.insertMany(allChats); 