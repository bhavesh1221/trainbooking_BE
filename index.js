const express = require('express');
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
var host = process.env.HOST || '0.0.0.0';
const mysql = require('mysql');
app.use(cors());

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'SmileHappy',
    database: 'booking',
})

app.get("/", (req, res) => {
    console.log("wokring");
    con.query('SELECT * FROM usertable;', (err, result)=>{
        if(err){
            console.log("error");
            res.send(err);
        }
        console.log("success");
        res.send(result);
    })
})

con.connect((err)=> {
   if(err){
    console.log("connect erro");
   }
   else{
    console.log("connected");
   }
})

app.put('/:ids', (req, res) => {
    const ids = req.params.ids.split(',');
    const status = req.body.status;
  
    ids.forEach(id => {
      con.query(
        'UPDATE usertable SET status = ? WHERE id = ?',
        [status, id],
        (err, result) => {
          if (err) {
            console.error(err);
            res.sendStatus(500);
          } else {
            console.log(`Data updated for ID ${id}:`, result);
          }
        }
      );
    });
    res.sendStatus(200);
  });

app.listen(port,host, (err)=>{
    if(err){
        console.log("custom 2 err");
    }
    else{
        console.log("On port 5000");
    }
});