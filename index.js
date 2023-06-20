const express = require('express');

const bodyParser = require('body-parser');

var cors = require('cors')


const app = express();


app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));

app.use(bodyParser.json({limit: '1000mb'}));

app.use(bodyParser.json());

app.use(cors())


//app.use('/api/public', express.static('public'));

app.use('/public', express.static('public'));

app.use(function(req, res, next) { //allow cross origin requests

res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");

// res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

res.header("Access-Control-Allow-Origin", "*");

next();

});





const stu = require('./routes/student');



var dbConfig = require('./dbconnection.js');

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// 1) Create students

// 2) Display list of students

// 3) Search specific student details

// 4) Delete a student

// 5) Create Marks Memo


app.use('/students', stu);


// app.use('/students/createStudent', students);

// app.use('/students/getAllStudents', students);

// app.use('/students/getByStudentID', students);

// app.use('/students/deleteStudent', students);

// app.use('/students/generateMarksMemo', students);





mongoose.connect(dbConfig.url,{ useNewUrlParser: true,useUnifiedTopology:true });

// app.use('/', users);


app.get('/', function(req, res,next) {
    htmlFrom='';
 
    htmlFrom+='<form action="fileupload" method="post" enctype="multipart/form-data">';
    htmlFrom+='<input type="file" name="filetoupload"><br><br>';
    htmlFrom+='<input type="submit">';
    htmlFrom+='</form>';

 
    res.send(htmlFrom);
});
 

const formidable = require('formidable');
const fs = require('fs');

app.post("/fileupload",function(req,res){
// 1) I need to read the form ( npm i formidable)
// 2) I need to read the form content
// 3) I need store the file into the server (npm i fs)
// 4) I need to send back response the browser
 
var form= new formidable.IncomingForm();
 
form.parse(req,function(err,fileds,files){
    var readFile=files.filetoupload.filepath;
    var newPath="./images/"+files.filetoupload.originalFilename;
 
    fs.rename(readFile,newPath,function(err){
        if(err) throw err;
        res.send("File saved success.")
    })
 
})
 
})



const PORT = 2020;

console.log(PORT,"PORT")

app.get('/', function(req, res){

console.log("Welcome to Student");

res.json({"message": "Welcome to Student"});

});

mongoose.connection.on('error', function() {

console.log('Could not connect to the database. Exiting now...');

process.exit();

});


mongoose.connection.once('open', function() {

console.log("Successfully connected to the database");

});

console.log(PORT)

app.listen(PORT, () => {

console.log('Server is running on PORT ${PORT}');

});