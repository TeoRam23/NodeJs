var express = require('express');
var path = require('path');

var app = express();
const PORT = 80

var tasks = ["æææ", "ÆÆÆ", "aaa", "AAA"]



app.use(express.static('public')) // public mappe til app
app.use(express.json()) // json funksjon for app

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

app.get('/sus', function (req, res) {
    res.send("OI, HEI! >:[ ...amogus")
});

app.get('/load_tasks', function (req, res) {
    res.json({
        tasks: tasks
    }) 
});

app.post('/ask', (req, res) => {
    var task = req.body.task
    console.log(task)
    // tasks.push("æAH")
    tasks.push(task)

    res.json({  message: "muahahahahahahaææÆÆÆÆÆ-... hvorfor sente du request for /ask? vel du gjorde det uansett",
                amount: 1,
                success: true
            })
});

app.listen(PORT, (error) =>{
    if(!error)
        console.log("hurra yay æææ "+ PORT)
    else
        console.log("nei hvorfor ÆÆÆ ", error);
});