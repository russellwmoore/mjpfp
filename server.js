const express = require("express");
const path = require("path");
const PORT = 3000;
const { sequelize, Task, TaskDate } = require("./db/db");
const { seedData } = require("./db/seed");
const { Op } = require("sequelize");
const moment = require("moment");
const server = express();

server.use(express.json());

server.use(express.static(path.join(__dirname, "public")));

// For the route serving the site this will work at the moment since you're not using React Router. If you do use a React Router, I would put this route at the bottom of this page and change the / to a *. That way all requests that are not to your API layer can be served your index.html file. If there are routes that match in that request, your React Router can handle them.
server.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

server.get("/api/tasks/", async (req, res, next) => {
  try {
    const response = await Task.findAll({});
    res.status(200).send(response);
  } catch (e) {
    // If you send something, like in line 24, your next will never run!
    res.status(404).send("failed to GET");
    // next(e);
  }
});

server.get("/api/tasks/:year/:month", async (req, res, next) => {
  let { year, month } = req.params;
  try {
    const response = await Task.findAll({
      where: {
        date: {
          [Op.between]: [
            moment()
              .year(year)
              .month(month)
              .startOf("month"),
            moment()
              .year(year)
              .month(month)
              .endOf("month")
          ]
        }
      }
    });
    res.status(200).send(response);
  } catch (e) {
    // If you send something, like in line 51, your next will never run!
    res.status(404).send("failed to GET");
    // next(e);
  }
});

server.post("/api/tasks/", async (req, res, next) => {
  //Spreading req.body works, but makes this API vulnerable to SQL injection
  try {
    await Task.create({
      ...req.body
    });
    res.status(201).send();
  } catch (e) {
    // Again with the nexting after sending!
    res.status(400).send("failed to POST");
    // next(e);
  }
});

server.put("/api/tasks/:id", async (req, res, next) => {
  try {
    await Task.update(
      { ...req.body },
      {
        where: {
          id: req.params.id
        }
      }
    );
    res.status(204).send();
  } catch (e) {
    res.status(400).send("failed to PUT");
    // next(e);
  }
});

server.get("*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("db sync successful");
    // return seedData();
  })
  .then(() => {
    server.listen(PORT, () => {
      console.log("server listening");
    });
  });
