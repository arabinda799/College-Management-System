const express = require("express");
const app = express();
const port = 3000;

const route = require('./routes/userRoute');
app.use(express.static(__dirname + "/public"));
app.use('/', route);


app.listen(port,  () => {
  console.log(`Server running at ${port}`);
});