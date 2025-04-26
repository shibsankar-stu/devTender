const express = require('express');

const app = express();


app.get("/user/:uid", (req, res) => {
    
    res.send("Hello from /user get route.");
})
app.post("/user", (req, res) => {
    res.send("Hello from /user post route.");
})
app.use("/test", (req, res) => {
    res.send("Hello from /test route.");
})
const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
    console.log("Server is running on port ", PORT);
})