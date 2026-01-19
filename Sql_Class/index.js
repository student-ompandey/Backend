const express = require("express");
const mysql = require("mysql2");
const { faker } = require("@faker-js/faker");
const path = require("path");
const app = express(); 
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "delta_app",
    password: "ompandey"
  });

  let getRandomUser = ()=> {
    return [
        faker.string.uuid(),
        faker.internet.username(), // before version 9.1.0, use userName()
        faker.internet.email(),
        faker.internet.password(),
];
  }
 
  app.get("/", (req, res) =>{
    let q = `SELECT COUNT(*) AS count FROM user`;
     try{
    connection.query(q,  (err, result)=>{
        if(err) throw err;
        let count = result[0].count;
        // console.log(result[0]["count(*)"]);
        res.render("home.ejs", {count});
      });
  } catch{
    console.log(err);
    res.send("some error in DB");
  }
  });

  app.get("/user", (req, res)=>{
    let q = `SELECT * FROM user`;
     try{
    connection.query(q,  (err, users)=>{
        if(err) throw err;
        res.render("showusers.ejs", {users});
      });
  } catch{
    console.log(err);
    res.send("Some err in DB");
  }
    
  });

  app.get("/user/:id/edit", (req, res)=>{
    let {id} = req.params; 
    let q = `SELECT * FROM user WHERE id='${id}' ` ;
    // res.render("edit.ejs");
    try{
      connection.query(q,  (err, result)=>{
          if(err) throw err;
          let user = result[0];
          res.render("edit.ejs", {user});
        });
    } catch{
      console.log(err);
      res.send("some error in DB");
    }
  })

  app.patch("/user/:id", (req, res)=>{
    let {id} = req.params; 
    let {password: formPass, username:newUsername} = req.body;
    let q = `SELECT * FROM user WHERE id='${id}' ` ;
    // res.render("edit.ejs");
    try{
      connection.query(q,  (err, result)=>{
          if(err) throw err;
          let user = result[0];
          if(formPass != user.password){
            return res.send("Wrong Password");
          } else {
            let q2 = `UPDATE user SET username='${newUsername}' WHERE id='${id}'`;
            connection.query(q2, (err, result)=>{
              if(err) throw err;
              return res.redirect("/user");
            })
          }
        });
    } catch{
      console.log(err);
      res.send("some error in DB");
    }
    
  })

  app.listen("8080", ()=>{
    console.log("server is listing to port 8080");
  });


  
  // Inserting newData
  // let q = "INSERT INTO user (id, username, email, password) VALUES ?";
  // let data = [];
  // for(let i=1;i<=100;i++){
  //   data.push(getRandomUser());
  // }
  // try{
  //   connection.query(q, [data],  (err, result)=>{
  //       if(err) throw err;
  //       console.log(result);
  //     });
  // } catch{
  //   console.log(err);
  // }

  // connection.end();




