var express = require('express');
var path = require('path');

var app = express();
const PORT = 80

app.use(express.static('public')) // public mappe til app
app.use(express.json()) // json funksjon for app

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

app.get('/sus', function (req, res) {
    res.send("OI, HEI! >:[ ...amogus")
});

app.get('/ask', (req, res) => {
    res.json({  message: "muahahahahahahaææÆÆÆÆÆ-... hvorfor sente du request for /ask? vel du gjorde det uansett",
                amount: 50,
                success: true
            })
});

app.listen(PORT, (error) =>{
    if(!error)
        console.log("hurra yay æææ "+ PORT)
    else
        console.log("nei hvorfor ÆÆÆ ", error);
});