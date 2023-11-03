var fs = require("fs");

var data = "HÆHÆHÆHÆHÆHÆHÆHÆH";

fs.writeFile("temp.txt", data, (err) => {
    if (err) console.log(err);
    console.log("bro ya")
})


fs.readFile("temp.txt", function(err, buf) {
    if (err) { console.log(err) }
    console.log(buf.toString());
});