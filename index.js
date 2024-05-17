require('dotenv').config();
const express = require('express')

const {ROUTES} = require("./src/routes");

const {setupLogging} = require("./src/logging");
const {setupProxies} = require("./src/proxy");
const {setupAuth} = require("./src/auth");

const app = express()
const port = process.env.PORT;

setupLogging(app);
setupAuth(app, ROUTES);
setupProxies(app, ROUTES);


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
