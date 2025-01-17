import dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";
import http from "https";
import fs from "fs";
import path from "path";
import fileDirName from "./../../file-dir-name.mjs";
import stream from "stream";
import { Readable } from "stream";
import { IngredentService } from "./ingredent.service.mjs";
import { MealService } from "./meal.service.mjs";
import { EncryptionService } from "./encryption.service.mjs";
import { csv2json, json2csv } from "json-2-csv";
import { SessionService } from "./session.service.mjs";
const { __dirname } = fileDirName(import.meta);

dotenv.config();
// Create a bot that uses 'polling' to fetch new updates
const Customer_AI = new TelegramBot(
  process.env.Casserole_Wang_Customer_AI_Bot,
  {
    polling: true,
  }
);
// Create a bot that uses 'polling' to fetch new updates
const Kitchen_AI = new TelegramBot(process.env.Casserole_Wang_Kitchen_AI_Bot, {
  polling: true,
});
export class TgService {
  customerGroupId = process.env.Casserole_Wang_Customer_GroupId;
  customer_AI = Customer_AI;
  kitchen_AI = Kitchen_AI;
  imagepath = "/../../db/public/image";
  ingredentpath = "/../../db/ingredent.json";
  mealpath = "/../../db/meal.json";
  ingredentService = new IngredentService();
  mealService = new MealService();
  encryptService = new EncryptionService();
  sessionService = new SessionService();
  kitchenAiChatState = new Map();
  ingredents = new Map();
  _io;
  get io() {
    return this._io;
  }
  set io(value) {
    this._io = value;
  }
  constructor() {}

  start() {
    this.customer_AI.on("polling_error", (msg) => console.log(msg));
    this.customer_AI.on("polling_error", (msg) => console.log(msg));

    this.customer_AI.on("message", async (msg, match) => {
      const chatId = msg.chat.id;
      let text = msg.text;
      // const resp = match[1];
      if (!text || text.length < 1) {
        this.customer_AI.sendMessage(chatId, "Send /help to get help");
      } else {
        // /connectAgent Q_QFKayTdsZ-7x52AAAD Som
        if (text.includes("/connectAgent")) {
          text = "/connectAgent";
        }
        switch (text) {
          case "/1":
            break;

          case "/2":
            break;

          case "/3":
            break;

          case "/4":
            break;

          case "/5":
            break;

          case "/6":
            break;

          case "/7":
            break;

          case "/8":
            break;

          case "/9":
            break;

          case "/10":
            break;

          case "/11":
            break;
          case "/12":
            break;

          case "/connectAgent":
            await this._connectAgent(msg);
            break;

          default:
            this.customermenu(msg);
            break;
        }
      }
    });
    this.kitchen_AI.on("message", async (msg, match) => {
      const chatId = msg.chat.id;
      let text = msg.text;
      if (!text || text.length < 1) {
        this.kitchen_AI.sendMessage(chatId, "Received");
      } else {
        if (text.includes("/dme")) {
          text = "/dme";
        } else if (text.includes("/din")) {
          text = "/din";
        }
        switch (text) {
          case "/1":
            await this._viewAllIngredent(msg);
            break;
          case "/2":
            await this._viewAllMeal(msg);
            break;
          case "/3":
            this._addIngredent(msg);
            break;
          case "/4":
            this._addMeal(msg);
            break;
          case "/5":
            this._deleteIngredent(msg);
            break;
          case "/6":
            this._deleteMeal(msg);
            break;
          case "/7":
            await this._downloadIngredentRecord(msg);
            break;
          case "/8":
            await this._downloadMealRecord(msg);
            break;
          case "/help":
            this.kitchenmenu(msg);
            break;
          case "/dme":
            await this._proceed_deleteMeal(msg, match);
            break;
          case "/din":
            await this._proceed_deleteIngredent(msg, match);
            break;
          default:
            this._checknextmessage(msg);
            break;
        }
      }
    });
    this.kitchen_AI.on("photo", async (msg) => await this._handleFile(msg));
    this.kitchen_AI.on(
      "document",
      async (msg) => await this._handleDocument(msg)
    );
  }

  myChatId(msg) {
    // send a message to the chat acknowledging receipt of their message
    this.customer_AI.sendMessage(
      msg.chat.id,
      "Received your message: " + msg.chat.id
    );
  }
  reply(msg) {
    this.customer_AI.sendMessage(msg.chat.id, "You entered" + msg.chat.id);
  }
  customermenu(msg) {
    this.customer_AI.sendMessage(
      msg.chat.id,
      `Welcome to Zinder Customer Our Chat ID is ${msg.chat.id}.\nEnter\n/1. View total active customers at the moment\n/2. View total customers last 24 hours\n/3. View total customers for the week\n/4. View total customers for the month\n/5. View total customers for the year\n/6. Download customer data\n/7. View total active visitors at the moment\n/8. View total visitors last 24 hours\n/9. View total visitors for the week\n/10. View total visitors for the month\n/11. View total visitors for the year\n/12. Download visitors data\n\n/connectAgent {CustomersessionID} {Yourname}. To connect to an active support customer`
    );
  }
  kitchenmenu(msg) {
    this.kitchen_AI.sendMessage(
      msg.chat.id,
      `Welcome to Zinder Kitchen Our Chat ID is ${msg.chat.id}.\nEnter\n/1. View all ingredent\n/2. View all meal\n/3. Add new ingredent\n/4. Add new meal\n/5. Delete ingredent\n/6. Delete meal\n/7. Download ingredent record\n/8. Download meal record`
    );
  }
  async _viewAllIngredent(msg) {
    await this.ingredentService.all((ingredients) => {
      let message = `FORMAT: ID - NAME -IMAGE - PRICE .\n\n`;
      ingredients.forEach((ingredient, index) => {
        message += `${index + 1}. ID(${ingredient.id}) - ${ingredient.name} - ${
          ingredient.url
        } - $${ingredient.price}\n`;
      });
      this.kitchen_AI.sendMessage(
        msg.chat.id,
        message.length > 0 ? message : "No data"
      );
    });
  }
  async _viewAllMeal(msg) {
    await this.mealService.all((meals) => {
      let message = `FORMAT: ID - NAME -IMAGE - PRICE .\n\n`;
      meals.forEach((meal, index) => {
        message += `${index + 1}. ID(${meal.id}) - ${meal.name} - ${
          meal.url
        } - $${meal.price} - ingredents:`;
        message += `.\n`;
      });
      this.kitchen_AI.sendMessage(
        msg.chat.id,
        message.length > 0 ? message : "No data"
      );
    });
  }
  async _updateIngredent(msg) {}
  async _updateMeal(msg) {}
  async _addMeal(msg) {
    let message = "Enter name of meal";
    this.kitchenAiChatState.set(msg.chat.id, message);
    this.kitchen_AI.sendMessage(msg.chat.id, message);
  }
  _addIngredent(msg) {
    let message = "Enter name of ingredent";
    this.kitchenAiChatState.set(msg.chat.id, message);
    this.kitchen_AI.sendMessage(msg.chat.id, message);
  }
  _checknextmessage(msg) {
    if (this.kitchenAiChatState.has(msg.chat.id)) {
      if (
        this.kitchenAiChatState.get(msg.chat.id) == "Enter name of ingredent"
      ) {
        this.ingredents.set(msg.chat.id, {
          name: msg.text,
        });
        let message = "Enter ingredent price";
        this.kitchenAiChatState.set(msg.chat.id, message);
        this.kitchen_AI.sendMessage(msg.chat.id, message);
      } else if (
        this.kitchenAiChatState.get(msg.chat.id) == "Enter name of meal"
      ) {
        this.ingredents.set(msg.chat.id, {
          name: msg.text,
        });
        let message = "Enter meal price";
        this.kitchenAiChatState.set(msg.chat.id, message);
        this.kitchen_AI.sendMessage(msg.chat.id, message);
      } else if (
        this.kitchenAiChatState.get(msg.chat.id) == "Enter meal price"
      ) {
        let ingredent = this.ingredents.get(msg.chat.id);
        this.ingredents.set(msg.chat.id, {
          ...ingredent,
          price: msg.text,
        });
        let message =
          "send image of meal(Please do not click the compress option)";
        this.kitchenAiChatState.set(msg.chat.id, message);
        this.kitchen_AI.sendMessage(msg.chat.id, message);
      } else if (
        this.kitchenAiChatState.get(msg.chat.id) == "Enter ingredent price"
      ) {
        let ingredent = this.ingredents.get(msg.chat.id);
        this.ingredents.set(msg.chat.id, {
          ...ingredent,
          price: msg.text,
        });
        let message =
          "send image of ingredent(Please do not click the compress option)";
        this.kitchenAiChatState.set(msg.chat.id, message);
        this.kitchen_AI.sendMessage(msg.chat.id, message);
      }
    }
  }
  async _handleFile(msg) {
    const file = await this.kitchen_AI.getFile(msg.photo[0].file_id);
    const fileink = await this.kitchen_AI.getFileLink(msg.photo[0].file_id);
    this.kitchen_AI.sendMessage(msg.chat.id, JSON.stringify(file));
    this.kitchen_AI.sendMessage(msg.chat.id, fileink);
    this._downloadFile(fileink, msg.photo[0].file_name, msg);
  }
  async _handleDocument(msg) {
    const fileink = await this.kitchen_AI.getFileLink(msg.document.file_id);
    this.kitchen_AI.sendMessage(msg.chat.id, fileink);
    this._downloadFile(fileink, msg.document.file_name, msg);
  }
  _downloadFile(fileurl, file_name, msg) {
    const request = http.get(fileurl, (response) => {
      const urlhash = this.encryptService.hashSha256(fileurl) + file_name;
      const file = fs.createWriteStream(
        path.join(path.normalize(__dirname + `${this.imagepath}/${urlhash}`))
      );
      response.pipe(file);
      file.on("finish", async () => {
        file.close();
        await this._uploadPurpose(msg, `${this.imagepath}/${urlhash}`, fileurl);
        // this._checknextmessage(msg);
      });
      file.on("error", (error) => console.log(error));
    });
  }
  async _uploadPurpose(msg, image, url) {
    if (this.kitchenAiChatState.has(msg.chat.id)) {
      if (
        this.kitchenAiChatState.get(msg.chat.id) ==
        "send image of ingredent(Please do not click the compress option)"
      ) {
        let ingredent = this.ingredents.get(msg.chat.id);
        this.ingredents.set(msg.chat.id, {
          ...ingredent,
          creator: msg.chat.id,
          image,
          url,
        });
        let message = "upload successful, data saved(ingredent).";
        this.kitchenAiChatState.delete(msg.chat.id);
        // save ingredent
        const data = {
          ...ingredent,
          creator: msg.chat.id,
          image,
          url,
        };
        await this.ingredentService.save(data, () =>
          this.kitchen_AI.sendMessage(msg.chat.id, message)
        );
      } else if (
        this.kitchenAiChatState.get(msg.chat.id) ==
        "send image of meal(Please do not click the compress option)"
      ) {
        let meal = this.ingredents.get(msg.chat.id);
        this.ingredents.set(msg.chat.id, {
          ...meal,
          image,
          creator: msg.chat.id,
          url,
        });
        let message = "upload successful, data saved(meal).";
        this.kitchenAiChatState.delete(msg.chat.id);
        const data = {
          ...meal,
          creator: msg.chat.id,
          image,
          url,
        };
        // save meal
        await this.mealService.save(data, () =>
          this.kitchen_AI.sendMessage(msg.chat.id, message)
        );
      }
    }
  }
  async _downloadIngredentRecord(msg) {
    await this.ingredentService.all(async (ingredents) => {
      const csv = json2csv(ingredents);
      let fileContents = Buffer.from(csv);
      this.kitchen_AI.sendMessage(msg.chat.id, "Processing request");
      await this.kitchen_AI.sendDocument(
        msg.chat.id,
        path.join(path.normalize(__dirname + `${this.ingredentpath}`))
      );
      // await this.kitchen_AI.sendDocument(
      //   msg.chat.id,
      //   fileContents.buffer
      // );
      this.kitchen_AI.sendMessage(msg.chat.id, "Completed");
    });
  }
  async _downloadMealRecord(msg) {
    await this.ingredentService.all(async (ingredents) => {
      const csv = json2csv(ingredents);
      let fileContents = Buffer.from(csv);
      this.kitchen_AI.sendMessage(msg.chat.id, "Processing request");
      await this.kitchen_AI.sendDocument(
        msg.chat.id,
        path.join(path.normalize(__dirname + `${this.mealpath}`))
      );
      // await this.kitchen_AI.sendDocument(
      //   msg.chat.id,
      //   fileContents.buffer
      // );
      this.kitchen_AI.sendMessage(msg.chat.id, "Completed");
    });
  }
  _deleteIngredent(msg) {
    const message =
      "To delete a record of ingredent send /din {id of ingredent}.\nFor example: \n/din 18493";
    this.kitchen_AI.sendMessage(msg.chat.id, message);
  }
  _deleteMeal(msg) {
    const message =
      "To delete a record of meal, send /dme {id of meal}.\nFor example: \n/dme 18493";
    this.kitchen_AI.sendMessage(msg.chat.id, message);
  }
  async _proceed_deleteMeal(msg, match) {
    const resp = match[1];
    const id = String(msg.text).substring(5, String(msg.text).length);
    if (!id) {
      return this._deleteMeal(msg);
    }
    await this.mealService.getByIndex("id", id, async (index) => {
      if (index < 0) {
        this.kitchen_AI.sendMessage(
          msg.chat.id,
          "Unknown index.\nsend /2 to view all meals and their ID"
        );
      } else {
        await this.mealService.delete(index, () => {
          this.kitchen_AI.sendMessage(msg.chat.id, "Record deleted");
        });
      }
    });
  }
  async _proceed_deleteIngredent(msg, match) {
    const resp = match[1];
    const id = String(msg.text).substring(5, String(msg.text).length);
    if (!id) {
      return this._deleteIngredent(msg);
    }
    await this.ingredentService.getByIndex("id", id, async (index) => {
      if (index < 0) {
        this.kitchen_AI.sendMessage(
          msg.chat.id,
          "Unknown index.\nsend /1 to view all ingredents and their ID"
        );
      } else {
        await this.ingredentService.delete(index, () => {
          this.kitchen_AI.sendMessage(msg.chat.id, "Record deleted");
        });
      }
    });
  }
  async _connectAgent(message) {
    const text = message.text;
    // console.log(text);
    const excludingcommand = String(text).slice("/connectAgent".length + 1);
    const words = excludingcommand.split(" ");
    if (words.length < 1) {
      this.customer_AI.sendMessage(
        message.chat.id,
        "Incomplete command. Command missing sessionID and agent name. Send /help for help."
      );
      return;
    }
    if (words.length < 2) {
      this.customer_AI.sendMessage(
        message.chat.id,
        "Incomplete command. Agent name. Send /help for help."
      );
      return;
    }
    const sessionId = words[0];
    const firstname = words[1];
    // console.log(this._io)
    const result = this._io.sockets.sockets.get(sessionId);
    if (!result) {
      this.customer_AI.sendMessage(
        message.chat.id,
        "Cannot connect, session is closed."
      );
      return;
    }
    const welcome = `Thank you for connecting with us. My name is ${firstname}, how may i be of help?`;
    const upddate = {
      id: sessionId,
      message: welcome,
      sender: "Agent-" + message.from.id,
      at: Date.now(),
      session: sessionId,
    };
    this._io.to(sessionId).emit(`agentconnected-${sessionId}`, {
      message: welcome,
      conversation: upddate,
    });
    this.customer_AI.sendMessage(
      message.chat.id,
      `Connected to user. Auto-welcome message sent:\n\n${welcome}`
    );
    const session = await this.sessionService.findBy("socket", sessionId);
    if (!session) {
      const _session = {
        socket: sessionId,
        conversation: [
          {
            id: sessionId,
            message: "Initials",
            sender: "Customer",
            at: Date.now(),
            session: sessionId,
          },
          upddate,
        ],
      };
      await this.sessionService.save(_session, (res) => {
        console.log(res);
      });
    }
    try {
      session.conversation = JSON.parse(
        this.encryptService.decryptSha256(session.conversation)
      );
      session.conversation.push(upddate);
      session.conversation = this.encryptService.encryptSha256(
        JSON.stringify(session.conversation)
      );
      await this.sessionService.getByIndex(
        "socket",
        sessionId,
        async (index) =>
          await this.sessionService.update(
            session,
            index,
            () => (res) => console.log(res)
          )
      );
    } catch (error) {
      console.log(error);
    }
  }

  sendMessageToCustomerGroup(message) {
    this.customer_AI.sendMessage(this.customerGroupId, message);
  }
  sendMessageToCustomerGroup(message) {
    this.customer_AI.sendMessage(this.customerGroupId, message);
  }
}
