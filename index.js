const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');

let PORT = 6060;
let app = express();

app.use(bodyParser.json());

let mysqlConnection = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'EmployeeDB',
    multipleStatements: true
});

mysqlConnection.connect((err) =>{
    if(!err)
        console.log('DB COnnection succeded...');  
    else
        console.log('DB connection failed! \n Error:'+ JSON.stringify(err, undefined, 2));      
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// Get all employees from DB

app.get('/employees', (req, res) =>{
    mysqlConnection.query('SELECT * FROM Employee', (err, rows, fields) =>{
        if(!err)
            res.send(rows);
        else
            console.log(err);       
    });
});

// Get an employee by id from DB

app.get('/employees/:id', (req, res) =>{
    mysqlConnection.query('SELECT * FROM Employee WHERE EmpID = ?', [req.params.id], (err, rows, fields) =>{
        if(!err)
            res.send(rows);
        else
            console.log(err);       
    });
});

// Delete an employee by id from DB

app.delete('/employees/:id', (req, res) =>{
    mysqlConnection.query('DELETE FROM Employee WHERE EmpID = ?', [req.params.id], (err, rows, fields) =>{
        if(!err)
            res.send('Deleted succesfully!');
        else
            console.log(err);       
    });
});

// Insert an employee by id from DB

app.delete('/employees', (req, res) =>{
    let emp = req.body;
    let sql = 'SET @EmpID = ?; SET @Name = ?; SET @EmpCode = ?; SET @Salary = ?;'
    mysqlConnection.query(sql,[emp.EmpID, emp.Name, emp.EmpCode, emp.Salary], (err, rows, fields) =>{
        if(!err)
            res.send(rows);
        else
            console.log(err);       
    });
});