import { JsonDB, Config } from "node-json-db";

import fileDirName from "../../file-dir-name.mjs";
import { EncryptionService } from "./encryption.service.mjs";
import { TgService } from "./tg.service.mjs";
const { __dirname } = fileDirName(import.meta);

// Public path to the active directory (socket.json)
const DBPATH = "/../../db/socket.json";
/**
 * A class which has the direct access to the Socket table.
 * Exposing the following methods:
 * sockets();
 * save(data);
 * getBy(field, value);
 * findBy(field, value);
 * delete(code)
 * update(code, data)
 */
export class SocketService {
  db = new JsonDB(new Config(__dirname + DBPATH, true, true, "/"));
  encryptService = new EncryptionService();
  tg = new TgService();
  constructor() {}
  /**
   * Fetch all sockets from db
   * @returns Array
   */
  sockets = async () => {
    return await this.db.getData("/sockets");
  };
  /**
   * Save new event to table
   * @param data is the new record to save.
   * @returns Object
   */
  async save(data, cb) {
    const now = new Date(Date.now());
    let code = data.name.replace(/ /g,"_");
    code = `${code} ${data.owner}`;
    // Set the id property to the length of existing record + 1
    let id = this.encryptService.hashFnv32a(code, false, this.sockets().length + 1)
    data.id = id;
    data.code = this.encryptService.hashFnv32a(code, true, id);
    // Set the created and updated at properties
    data.created_at = now;
    data.updated_at = now;
    data.verified_at = "";
    // Set the active property
    data.status = "Active";
    await this.db.push('/sockets[]', data);
    return cb(data);
  }
  /**
   * Get User Record
   * @param field is the field to search by.
   * @param value is the value of what you are searching for.
   * @returns Array
   */
  async getBy(field, value, cb) {
    const sockets = await this.sockets()
    const found = sockets.filter((u) => u[field] == value);
    return cb(found);
  }
  async getByMultiple(field1, value1, field2, value2, cb) {
    const sockets = await this.sockets()
    const found = sockets.filter((u) => u[field1] == value1 || u[field2] == value2);
    return cb(found);
  }
  async getByIndex(field, value, cb) {
    const sockets = await this.sockets();
    const found = sockets.findIndex((u) => u[field] == value);
    return cb(found);
  }
  /**
   * Find User Record
   * @param field is the field to search by.
   * @param value is the value to search for.
   * @returns Object
   */
  async findBy(field, value) {
    const found = await this.sockets().find((u) => u[field] == value);
    return found;
  }
  /**
   * Delete User Record
   * @param code is the code of record to delete.
   * @returns Object
   */
  async delete(indexOf, cb) {
    await this.db.delete(`/sockets[${indexOf}]`);
    return cb();
  }
  /**
   * Update User Record
   * @param code is the code of record to update.
   * @param data is the updated version of record.
   * @returns Object
   */
  async update(code, data, indexOf, cb) {
    const now = new Date(Date.now());
    data.updated_at = now;
    await this.db.push(`/sockets[${indexOf}]`, data, true);
    return cb(data);
  }



  async saveConnection(id, socket) {
    const now = Date.now();
    const newConnect = {
      id,
      created_at: now,
      updated_at: now,
    };
    let message = `New visitor(#${id}) connected to Casserole Wang.`;
    console.log(message);
    this.tg.sendMessageToCustomerGroup(message);
    this.newuserjoined$(newConnect, socket);
  }
  newuserjoined$(newConnect, socket){
    socket.emit("newuserjoined", newConnect);
    console.log("newConnect");
    console.log(newConnect);
  }
  async updateOnConnect(socket, data){
    this.updateOnSuccess$(socket, data);
  }
  async connectionBrowserCaptured(socket, data){
    this.updateOnSuccess$(socket, data);
  }
  updateOnSuccess$(socket, data){
    socket.emit("update-on-success-"+socket.id, data);
  }
  newRoomConnect(socket, room){

  }
  getChatContact$(socket){
    socket.emit("fetchChatContacts", []);
  }

  getZinderChatContactBot$(socket){
    socket.emit("getZinderChatContactBot", []);
  }
  newMessage$(socket){
    socket.emit("fetchChatContacts", []);
  }

}
