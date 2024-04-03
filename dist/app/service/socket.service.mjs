import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import bot from "./telegram.service.mjs";
import fileDirName from "./../../file-dir-name.mjs";
import { ContactService } from "./contact.service.mjs";
const { __dirname } = fileDirName(import.meta);

const DBPATH = "/../../db/connections.json";
const DB = path.normalize(__dirname + DBPATH);

dotenv.config();
export class SocketService {
  MASTERCHATID = process.env.TELEGRAM_MASTERGROUPCHATID;
  contactService = new ContactService();
  constructor() {}

  async saveConnection(id, socket) {
    const now = Date.now();
    const newConnect = {
      id,
      created_at: now,
      updated_at: now,
    };
    await this._updateDb(newConnect, (connections)=>{
      bot.sendMessage(
        this.MASTERCHATID,
        `New visitor(#${id}) connected to zinder. Total visitors now: ${connections.length}`
      );
      this.newuserjoined$(newConnect, socket);
    });
  }
  newuserjoined$(newConnect, socket){
    socket.emit("newuserjoined", newConnect);
    console.log("newConnect");
    console.log(newConnect);
  }
  async updateOnConnect(socket, data){
    await this._updateDb(data, (connections)=>{
      this.updateOnSuccess$(socket, data);
    });
  }
  async connectionBrowserCaptured(socket, data){
    await this._updateDb(data, (connections)=>{
      this.updateOnSuccess$(socket, data);
    });
  }
  updateOnSuccess$(socket, data){
    socket.emit("update-on-success-"+socket.id, data);
  }
  newRoomConnect(socket, room){

  }
  getChatContact$(socket){
    socket.emit("fetchChatContacts", this.contactService.chatDB);
  }

  getZinderChatContactBot$(socket){
    socket.emit("getZinderChatContactBot", this.contactService.chatDB);
  }
  newMessage$(socket){
    socket.emit("fetchChatContacts", this.contactService.chatDB);
  }
  async _updateDb(connection, callback) {
    const dbJson = fs.readFileSync(path.join(DB), 'utf8');
    let c = [];
    try {
      c = JSON.parse(dbJson);
    } catch (error) {
      c = []
    }
    c[c.length] = connection;
    return fs.writeFileSync(
      path.join(path.normalize(__dirname + DBPATH)),
      JSON.stringify(c, null, 2),
      (err)=>{
        // console.log(err);
        callback(connections);
      }
    );
  }
}
