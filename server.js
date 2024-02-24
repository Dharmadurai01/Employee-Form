const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: 'Emplyee' 
});


connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});


app.use(bodyParser.urlencoded({ extended: false }));


app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


app.post('/submit', (req, res) => {
  const { firstname, secondname, id, department, dob, gender, designation, salary } = req.body;


  console.log('Received form data:');
  console.log('First Name:', firstname);
  console.log('Second Name:', secondname);
  console.log('ID:', id);
  console.log('Department:', department);
  console.log('Date of Birth:', dob);
  console.log('Gender:', gender);
  console.log('Designation:', designation);
  console.log('Salary:', salary);

  
  connection.query('INSERT INTO Employees (firstname, secondname, id, department, dob, gender, designation, salary) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [firstname, secondname, id, department, dob, gender, designation, salary], (err, results) => {
    if (err) {
      console.error('Error inserting data into MySQL: ' + err.stack);
      return res.status(500).send('Error inserting data into MySQL');
    }
    console.log('Data inserted into MySQL with ID: ' + results.insertId);
    res.status(200).send('Data inserted successfully');
  });
});+


app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});