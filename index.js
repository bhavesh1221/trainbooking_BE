const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const port = process.env.PORT || 5000;
var host = process.env.HOST || '0.0.0.0';
const mysql = require('mysql');
require('dotenv').config();
app.use(cors());

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

const con = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
    // host: 'localhost',
    // user: 'root',
    // password: 'SmileHappy',
    // database: 'booking',
}) 

//get data whose status is 1, that is booked
app.get('/data', (req, res) => {
  const query = 'SELECT * FROM usertable WHERE status = 1';

  con.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
     const seatValues = results.map((row) => row.seat);
      res.status(200).json(seatValues);
    }
  });
});


app.put('/seats', (req, res) => {
    console.log(req.body)
    const { seatIds, status } = req.body;
  
    // Convert seatIds to an array if it's a single ID
    const seatIdArray = Array.isArray(seatIds) ? seatIds : [seatIds];
  
    // Prepare the SQL query
    const updateQuery = `UPDATE usertable SET status = ? WHERE seat IN (?)`;
    const values = [status, seatIdArray];
  
    // Execute the query
    con.query(updateQuery, values, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while updating seat status.' });
      } else {
        res.json({ seatIdArray });
      }
    });
});
  
app.listen(port,host, (err)=>{
    if(err){
        console.log("custom 2 err");
    }
    else{
        console.log("On port 5000");
    }
});