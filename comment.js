// Create web server 
var express = require("express");
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// Create server at port 8080
var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;
    
    console.log("Example app listening at http://%s:%s", host, port);
});

// Read data from file
var data = fs.readFileSync("data.json", "utf8");
var comments = JSON.parse(data);

// Create route
app.get("/comment", function (req, res) {
    res.sendFile(__dirname + "/comment.html");
});

app.post("/comment", urlencodedParser, function (req, res) {
    var comment = req.body;

    // Push comment to array
    comments.push(comment);

    // Write data to file
    fs.writeFileSync("data.json", JSON.stringify(comments));

    res.redirect("/comment");
});

app.get("/show", function (req, res) {
    res.send(comments);
});

// Path: comment.html
// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <title>Comment</title>
// </head>
// <body>
//     <form action="/comment" method="POST">
//         <input type="text" name="name" placeholder="Name"><br>
//         <input type="text" name="comment" placeholder="Comment"><br>
//         <button type="submit">Submit</button>
//     </form>
// </body>
// </html>