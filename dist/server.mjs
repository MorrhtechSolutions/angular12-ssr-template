// Doc : https://www.npmjs.com/package/json-server
// Doc 2: https://github.com/passageidentity/example-node/blob/main/02-Login-With-Profile/index.js

import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import compression from "compression";
import { Server } from "socket.io";
import fileDirName from "./file-dir-name.mjs";
import crons from "./app/cron/index.mjs";
import { TgService } from "./app/service/tg.service.mjs";
import { SocketController } from "./app/controller/socket.controller.mjs";
import { IngredentController } from "./app/controller/ingredent.controller.mjs";
import { MealController } from "./app/controller/meal.controller.mjs";
dotenv.config();
const PORT = process.env.PORT || process.env.NODE_ENV;
const { __dirname } = fileDirName(import.meta);
// where '/dist/admin' is the final built directory
const staticRoot = __dirname + "/public/";
const staticFileRoot = __dirname + "/db/public/";
// List of servers
const app = express();
const port = JSON.stringify(parseInt(PORT));
const tg = new TgService();
const ingredentController = new IngredentController();
const mealController = new MealController();
app.set("port", port);
const server = http.createServer(app);
// Compression middleware
app.use(compression());
/* other middleware */

/* place any backend routes you have here */

app.get("/ingredent/all", (req, res) => ingredentController.all(req, res));

app.get("/meal/all", (req, res) => mealController.all(req, res));

/* end of backend routes */
app.use(function (req, res, next) {
  //if the request is not html then move along
  var accept = req.accepts("html", "json", "xml");
  if (accept !== "html") {
    return next();
  }

  // if the request has a '.' assume that it's for a file, move along
  var ext = path.extname(req.path);
  if (ext !== "") {
    return next();
  }

  fs.createReadStream(staticRoot + "index.html").pipe(res);
});

app.use(express.static(staticRoot));
app.use(express.static(staticFileRoot));
export function start_server() {
  tg.start();
  // app.listen wont work as it creates a new app!!
  server.listen(app.get("port"), function () {
    let now = new Date(Date.now());
    let mes = `Starting server at ${now.toLocaleTimeString()}, ${now.toLocaleDateString()} port ${app.get(
      "port"
    )}`;
    console.log(mes);
    tg.sendMessageToCustomerGroup(mes);
    mes = `Establishing Socket Server at ${now.toLocaleTimeString()}, ${now.toLocaleDateString()}.`;
    tg.sendMessageToCustomerGroup(mes);
    console.log(mes);

    const io = new Server(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
      },
    });
    tg.io = io;
    io.on("connection", (socket) => {
      now = new Date(Date.now());
      mes = `New client connection at ${now.toLocaleTimeString()}, ${now.toLocaleDateString()}.`;
      tg.sendMessageToCustomerGroup(mes);

      const socketcontroller = new SocketController(io);

      socketcontroller.init(socket);
      socket.on("new_message", () => socketcontroller.newMessage(socket));
      socket.on("update-on-connect-" + socket.id, (data) =>
        socketcontroller.updateOnConnect(socket, data)
      );
      socket.on("notify-browser-captured-" + socket.id, (data) =>
        socketcontroller.connectionBrowserCaptured(socket, data)
      );
      socket.on("livechat-message-by-" + socket.id, async (data) =>
        await socketcontroller.chatRequest(socket, data)
      );
      // socket.on("livechat-requested-by-" + socket.id, (data) =>
      //   socketcontroller.connectionBrowserCaptured(socket, data)
      // );
    });
  });
}
