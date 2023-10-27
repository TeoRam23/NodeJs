var express = require('express');
var path = require('path');

var app = express();
const PORT = 80

var tasks = [
    {bruker: "bruker", task: "æææ"}, 
    {bruker: "bruker", task: "ÆÆÆ"}, 
    {bruker: "bruker", task: "aaa"}, 
    {bruker: "bruker", task: "AAA"}, 
    {bruker: "bruker", task: "skanning"}, 
    {bruker: "bruker", task: "task 1"}
]
var users = [
    {brukernavn: "magne", password: "123"}
]


users.username

app.use(express.static('public')) // public mappe til app
app.use(express.json()) // json funksjon for app

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

app.get('/sus', function (req, res) {
    res.send("OI, HEI! >:[ ...amogus")
});

app.get('/load_tasks', function (req, res) {
    res.json({ tasks: tasks }) 
});

app.delete('/delete/:index', (req, res) => {
    var index = parseInt(req.params.index) // index er en params
    console.log(index)
    if (index >= 0 && index < tasks.length) {
        tasks.splice(index, 1) // sletter EN task fra listen
        res.json({ success: true })
    } else {
        res.json({success: false})
    }
})
 
app.post('/ask', (req, res) => {
    var task = req.body.task
    var bruker = req.body.bruker
    console.log(task)
    console.log(bruker)
    if (task && bruker){
        tasks.push({bruker: bruker, task: task})

        res.json({  success: true,
                    message: "Scanning task finished. I trust you bro!"
        })
    } else {
        res.json({  success: false,
                    message: "Ups, ingen tasks. Ser ut til at du er en sussy importer! >:]"
        })
    }
});

app.listen(PORT, (error) =>{
    if(!error)
        console.log("hurra yay æææ "+ PORT)
    else
        console.log("nei hvorfor ÆÆÆ ", error);
});