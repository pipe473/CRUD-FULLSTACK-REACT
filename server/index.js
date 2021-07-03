const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

let PORT = 6060;
let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

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
        if (error) throw error;
        if(!err)
            res.send(rows);
        else
            console.log(err);       
    });
});

// Get an employee by id from DB

app.get('/employees/:id', (req, res) =>{
    mysqlConnection.query('SELECT * FROM Employee WHERE EmpID = ?', [req.params.id], (err, rows, fields) =>{
        if (error) throw error;
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

app.post('/employees', (req, res) =>{
    let emParams = [
        req.body.EmpID,
        req.body.Name,
        req.body.EmpCode,
        req.body.Salary
    ];
   
    let mySql = "INSERT INTO employee(EmpID,Name,EmpCode,Salary) VALUES (?,?,?,?)";
    mysqlConnection.query(
        mySql,
        emParams, (err, response) => {
            if (!err) {
                console.log(err);                
            } else {
                res.send(response, "");
            }
    });
});

// Update an employee by id from DB

app.put('/employees', (req, res) =>{
    let emParams = [
        req.body.Name,
        req.body.EmpCode,
        req.body.Salary,
        req.body.EmpID,
    ];
    let sql = "UPDATE employee SET Name = ?, EmpCode = ?, Salary = ? WHERE  EmpID = ?";
    mysqlConnection.query(sql,emParams, (err, rows, fields) =>{
        if(!err){
           res.send("Updated successfully!!")
        }        
        else{
            console.log(err);       
        }
    });
});