
import dotenv from "dotenv";
import bot from "../service/telegram.service.mjs";
import fileDirName from "../../file-dir-name.mjs";
import { SocketService } from "../service/socket.service.mjs";
import { TelegramController } from "./telegram.controller.mjs";

const { __dirname } = fileDirName(import.meta);

const DBPATH = "/../../db/data/telegram.json";

dotenv.config();


export class SocketController {
  socketservice = new SocketService();
  tgService = new TelegramController();
  constructor() {
  }
  // Public method to set save a socket session ID
  init(socket){
    this.socketservice.saveConnection(socket.id, socket);
  }
  connection(socket){
    this.socketservice.saveConnection(socket.id, socket);
  }
  updateOnConnect(socket, data){
    this.socketservice.updateOnConnect(socket, data);
  }
  connectionBrowserCaptured(socket, data){
    this.tgService._messageAdmin(data.message);
    // this.socketservice.updateOnConnect(socket, data);
  }
  getContacts(socket){
    this.socketservice.getChatContact$(socket)
  }
  getZinderSupportBot(socket){
    this.socketservice.getZinderChatContactBot$(socket)
  }
  newMessage(socket){
    this.socketservice.newMessage$(socket)
  }
}
