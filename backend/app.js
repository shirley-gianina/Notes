const express = require("express");
const app = express();
const routes = require("./config/routes");
const cors = require('cors')

require("./config/db.config");

app.use(express.json());
app.use(cors())
app.use("/", routes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));