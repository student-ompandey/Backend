const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");

app.use("/api", (req, res, next)=>{
    let {token} = req.query;
    if(token=="giveaccess"){
        next();
    }
    throw new ExpressError(401, "ACCESS DENIED!");
});

app.get("/admin", (req, res)=>{
    throw new ExpressError(403, "Access to admin is forbbiden");
})


app.get("/api", (req, res)=>{
    res.send("data");
})

app.get("/", (req, res)=>{
    res.send("Hi i am root");
});

app.get("/random", (req, res)=>{
    res.send("This is a random page");
});

app.get("/err", (req, res)=>{
    abcd = abd;
})

app.use((err, req, res, next) =>{
    let {status=500, message} = err;
    res.status(status).send(message);
})


//logger - morgan 
// app.use((req, res, next)=>{
//     req.time = Date.now();
//     console.log(req.method);
//     next();
// });

app.listen(8080, ()=>{
    console.log("server listing on the 8080 port");
});