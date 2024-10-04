const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 5500;
const path = require('path'); // Make sure to import the path module
const bodyParser = require('body-parser');
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());
app.use(express.json()); 
app.use(express.text());
app.use(express.static(path.join(__dirname)));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500'); // Specify allowed origin
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Specify allowed methods
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Specify allowed headers
  res.header('Access-Control-Allow-Credentials', 'true'); // Allow credentials
  res.header('Access-Control-Expose-Headers', 'Content-Length, X-Custom-Header'); // Expose custom headers
  res.header('Access-Control-Max-Age', '3600'); // Cache preflight response for 1 hour

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204); // No content
  }
  
  next();
});


// Set up MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'students_attendance_database',
  port:'3300'
});

db.connect(err => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }
    console.log('Connected to the MySQL database.');
  });
  app.get('/atty',(req,res) =>{
    res.send('Hello Joshua HAHAHA');
  });

  // API endpoint to get faculty and department data
app.get('/atty/api/students', (req, res) => {
    const query = `
      SELECT name,student_no
      FROM students
      
    `;

    db.query(query, (err, results) => {
        if (err) {
          console.error('Error executing query:', err);
          return res.status(500).send('Internal Server Error');
        }

        try {
            const rdata= JSON.stringify(results);
            const parsedata = typeof rdata === 'string' ? JSON.parse(rdata) : rdata;
            res.json(parsedata);
          } catch (parseErr) {
            console.error('Error parsing JSON:', parseErr);
            res.status(500).send('Error parsing data');
          }
      });
      });
     //GETTING TABLE
     app.post('/api/date', (req, res) => {
      const recievedDate = req.body; // Access the data sent by the client
      console.log('Date received:', recievedDate);
  
      // Perform any server-side logic here (e.g., save to database)
      
  
      // Send a response back to the client
      res.json({ message: 'Date received successfully', recievedDate });
      //PROCESSING DATA
      

      
  });
      
      //GETTING TABLE FROM WEBPAGE
      app.post('/api/table', (req, res) => {
        global.records = req.body;
        global.Jrecords=  JSON.stringify(records);
        console.log('Received table data:', Jrecords);
        submitButton();
    
        // Here you can process the data or save it to a database
        // For example:
        // myDatabase.save(tableData);
    
        res.json({ message: 'Table data received successfully', records });
    });
    //DATA GETTING END-----------------------------------

      app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
      });

      //SUBMIT BUTTON FUNCTION
      function submitButton(){
        const insertQuery = 'INSERT INTO attendance (student_no, name, status, date_day) VALUES (?, ?, ?, ?)';
    
        records.forEach(record => {
            db.query(insertQuery, [record.student_no, record.name, record.status, record.date_day], (error, results, fields) => {
                if (error) {
                    return console.error(error.message);
                }
                console.log('Row inserted:', results.affectedRows);
            });
        });
    }