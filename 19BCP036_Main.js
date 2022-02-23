var express = require('express')
var fs = require('fs');

var app = express()

var obj1 = {
    stud_ID : "19BCP036",
    Name : "Dishant",
    Sem : "VI",
    Div : "1",
    Batch : "G2",
    Branch : "Computer Engineering",
    Subject : "Adv-Web-Tech"
}

fs.writeFile("19BCP036_JSON", JSON.stringify(obj1), (err)=>{
    console.log("Data is written")
})

app.get("/", function(req, res){
    res.setHeader("Content-Type", "text/html")
    fs.readFile("19BCP036_Menu.html",function(error, data){
        res.send(data)
    })
})

app.get("/19BCP036_Read", function(req, res){
    var stud_ID = req.query.stud_id
    fs.readFile("19BCP036_JSON", {encoding : 'utf-8'}, function(err, data){
        res.setHeader("Content-type", "application/json")
        var obj = JSON.parse(data)
        if(obj.stud_ID === stud_ID){

            res.setHeader("Content-Type", "text/html")
            fs.readFile("19BCP036_Display.html",function(error, data){
                res.write(data)   
            }) 

            res.write("<h2>Your data is already available...</h2><br><br>")
            res.write("Student ID: " + obj1.stud_ID + "<br>")
            res.write("Student Name: " + obj1.Name + "<br>")
            res.write("Semester: " + obj1.Sem + "<br>")
            res.write("Dividsion: " + obj1.Div + "<br>")
            res.write("Batch: " + obj1.Batch + "<br>")
            res.write("Branch: " + obj1.Branch + "<br>")
            res.write("Subject: " + obj1.Subject + "<br><br>")

        }else{
            res.setHeader("Content-Type", "text/html")
            fs.readFile("19BCP036_Display.html",function(error, data){
                res.send(data)
            }) 
        }
    })
})

app.get("/update", function(req, res){
    
    obj1.stud_ID = req.query.stud_id
    obj1.Name = req.query.stud_name
    obj1.Sem = req.query.stud_sem
    obj1.Div = req.query.stud_div
    obj1.Batch = req.query.stud_batch
    obj1.Branch = req.query.stud_branch
    obj1.Subject = req.query.stud_sub

    fs.writeFile("19BCP036_JSON", JSON.stringify(obj1), (err)=>{
        res.send("Data Updated Successfully!!!")
    })
})

app.listen(8080)