var express = require('express');
const sessions = require('express-session')
var path = require('path');
var fs = require("fs");

var app = express();
const PORT = 80
const oneHour = 1000 * 60 * 60

var session;

var users

var preuserstest = [
    {username: "magne", password: "123"},
    {username: "importer", password: "sussy"},
    {username: "croodmate", password: "baka"},
    {username: "bruker", password: "Passord1"}
]

fs.writeFile("users.txt", JSON.stringify(preuserstest), (err) => {
    if (err) console.log(err);
    console.log("bro ya");
})
    
fs.readFile("users.txt", function(err, buf) { 
    if (err) { console.log(err) }
    users = JSON.parse(buf);
});


var messages

fs.readFile("messages.txt", function(err, buf) { 
    if (err) { console.log(err) }
    messages = JSON.parse(buf);
    console.log("h")
});



app.use(express.static('public')) // public mappe til app
app.use(express.json()) // json funksjon for app

app.use(sessions({
        secret: "amogusimporter",
        saveUninitialized: true,
        cookie: {
            maxAge: oneHour
        },
        resave: false
    }))

app.get('/chet', function (req, res) {
    session = req.session;
    if (session.username) {
        console.log("yo get logged!")
    } else {
        console.log("get unlogged bro")
    }
    console.log(session.username)
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

app.post('/login_check', (req, res) => {
    session = req.session;
    if (session.username) {
        res.json({ success: true }) 
    } else {
        res.json({ success: false }) 
    }
})

app.post('/login', (req, res) => {
    session = req.session;

    console.log("login attempt:")
    console.log(req.body.username)
    console.log(req.body.password)

    // finner bruker med det navnet
    var user = users.find(u => u.username === req.body.username)

    if (user && user.password == req.body.password){
        console.log("yo flott")
        session.username = user.username
        console.log(session.username)
        res.json({ 
            message: "logged inn",
            success: true
        })
    }
        //session.username = bruker fra client!

        // senere bruke
        //req.session.username
})

app.get('/log_out', function (req, res) {
    session = req.session

    session.destroy(null)
    res.json({ success: true })
})


app.get('/sus', function (req, res) {
    res.send("OI, HEI! >:[ ...amogus")
});

app.get('/load_tasks', function (req, res) {
    session = req.session
    if (session.username) {
        res.json({ 
            tasks: messages,
            username: session.username
        }) 
    }
});

app.delete('/delete/:index', (req, res) => {
    var index = parseInt(req.params.index) // index er en params
    console.log(index)
    if (index >= 0 && index < messages.length && messages[index].bruker == req.session.username) {
        messages.splice(index, 1) // sletter EN task fra listen
        res.json({ success: true })
    } else {
        res.json({ success: false })
    }
})
 
app.post('/ask', (req, res) => {
    var task = req.body.task
    var bruker = req.session.username
    console.log(task)
    console.log(bruker)
    if (task && bruker){
        fs.readFile("messages.txt", (err, data) => {
            if (err) { return console.error(err); };

            var data = JSON.parse(data.toString());
            data.bruker = bruker;
            data.task = task;
            fs.writeFile("messages.txt", JSON.stringify(data), (err, result) => { //HALLO FREMTIDSmEG! HÆÆÆÆæÆÆæææææÆ https://stackoverflow.com/questions/48739630/append-text-to-existing-json-file-node-js
            if (err) {
                return console.error(err);
            } else {
                console.log(result);
                console.log("yayÆÆÆÆ")
            }});
        });
        //messages.push({bruker: bruker, task: task})

        res.json({  success: true,
        })
    } else {
        res.json({  success: false,
        })
    }
});

app.listen(PORT, (error) =>{
    if(!error)
        console.log("hurra yay æææ "+ PORT)
    else
        console.log("nei hvorfor ÆÆÆ ", error);
});