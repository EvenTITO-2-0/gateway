require('dotenv').config();
const express = require('express')
const cors = require('cors');
const {ROUTES} = require("./routes");

const {setupLogging} = require("./logging");
const {setupProxies} = require("./proxy");
const {setupAuth} = require("./auth");
const {setupParseOpenApi} = require("./parse-openapi");

const app = express()
const port = process.env.PORT;

app.use(express.json())
app.use(cors());

setupLogging(app);
setupAuth(app, ROUTES);
setupProxies(app, ROUTES);
setupParseOpenApi(app, ROUTES);


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
