const express = require("express");
const helmet = require("helmet");
const knex = require("knex");
const projectRouter = require("./router/project_router");
const actionRouter = require("./router/action_router");
const server = express();

server.use(helmet());
server.use(express.json());

server.get("/", (req, res) => {
  res.send(`
      <p>Hello Human!</p>
    `);
});

server.use("/api", projectRouter);
server.use("/api", actionRouter);

const port = 5000;
server.listen(port, () =>
  console.log(`\n** API running on http://localhost:${port} **\n`)
);
