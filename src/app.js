const express = require('express');

const app = express();

app.use((req, res) => {
    res.send("Home");
})

app.use("/test", (req, res) => {
    res.send("Hello from /test route.");
})



const PORT = process.env.PORT || 3000;
app.listen(3000, () => {
    console.log("Server is running on port ", PORT);
})