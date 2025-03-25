const express = require("express");

const app = express();
require("dotenv").config();
require("./conn/conn");

const cors = require("cors");

const UserApi = require("./route/user");
const TaskApi = require("./route/task");

app.use(cors(
  {
    origin:["https://task-management-navy-psi.vercel.app/"],
    methods:["POST", "GET"],
    credentials:true,
  }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", UserApi);
app.use("/api/v2", TaskApi);

app.use("/", (req, res) => {
  res.send("Hello from backend side");
});

// localhost:1000/api/v1/signin

const PORT = 1000;
app.listen(PORT, () => {
  console.log("Server Started");
});
