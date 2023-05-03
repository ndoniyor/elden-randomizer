const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser')
const BuildController = require("./controllers/BuildController")

const app = express();
const port = 3000;

app.use(bodyParser.json())
app.use(cors({
    origin: '*'
}))

app.use(
    bodyParser.urlencoded({
        extended: false,
    })
)
app.use('/api', (req,res, next)=>{
    console.log(req.body);
    next();
})
app.get('/', (req,res)=>{
    res.send('get?')
})

app.post('/api', BuildController.generateBuild);


app.listen(port, ()=>{
    console.log("Listening...");
})
