const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test');

main()
.then(() =>{
    console.log("Connection successfully");
})

.catch((err) => console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

const userSchema = new mongoose.Schema({
    name : String,
    email : String,
    age : Number,
});

const User = mongoose.model("User", userSchema);


User.updateOne({name:"om"}, {age:99})
.then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.log(err);
});

// User.find({}).then((res)=>{
//     console.log(res);
// }) .catch((err)=>{
//     console.log(err);
// });

// User.insertMany([
//     {name:"aman", email:"aman@gmail.com", age: 55},
//     {name:"satyam", email:"satyam@gmail.com", age: 40},
//     {name:"pritam", email:"pritam@gmail.com", age: 33},
// ]).then ((res) => {
//     console.log(res);
// });


// const user1 = new User({
//     name : "om",
//     email : "om@gmail.com",
//     age : 44,
// });

//user1.save();