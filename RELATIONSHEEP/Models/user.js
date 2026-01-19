const mongoose = require("mongoose");
const {Schema} = mongoose;

main()
.then(()=> console.log("connectuion is successful"))
.catch((err)=> console.log(err));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}

const userSchema = new Schema({
    username: String,
    addresses: [
        {
            _id: false,
            location: String,
            city: String,
        },
     ],
});

const User = mongoose.model("User", userSchema);

const addUsers = async ()=>{
    let user1 = new User({
        username: "ompandey",
        addresses: [
            {
                location: "221b Baker Street",
                city: "London"
            }
        ]
    });

    user1.addresses.push({location:"p32 wall street", city:"London"});
    let res = await user1.save();
    console.log(res);

};

addUsers();