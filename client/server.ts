const express = require("express");
const next = require("next");
const cors = require("cors")
import api from "./api"

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(cors())

    server.use("/api", api)

    server.get("*", (req, res) => {
      return handle(req, res)
    })

    server.listen(3000, () => {
      console.log("Listening start: localhost:3000")
    })
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
