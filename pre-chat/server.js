var express = require('express');
var path = require('path');

var app = express();
const PORT = 80

var tasks = ["æææ", "ÆÆÆ", "aaa", "AAA", "skanning", "task 1"]



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

app.post('/ask', (req, res) => {
    var task = req.body.task
    console.log(task)
    if (task){
        tasks.push(task)

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