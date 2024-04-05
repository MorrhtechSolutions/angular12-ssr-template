import dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";
import { IngredentService } from "./ingredent.service.mjs";
import { MealService } from "./meal.service.mjs";
import { EncryptionService } from "./encryption.service.mjs";
import http from "https";
import fs from "fs";
import path from "path";
import fileDirName from "./../../file-dir-name.mjs";
const { __dirname } = fileDirName(import.meta);

dotenv.config();
export class TgService {
  imagepath = "/../../db/public/image";
  ingredentService = new IngredentService();
  mealService = new MealService();
  encryptService = new EncryptionService();

  // Create a bot that uses 'polling' to fetch new updates
  customer_AI = new TelegramBot(process.env.Casserole_Wang_Customer_AI_Bot, {
    polling: true,
  });
  // Create a bot that uses 'polling' to fetch new updates
  kitchen_AI = new TelegramBot(process.env.Casserole_Wang_Kitchen_AI_Bot, {
    polling: true,
  });

  kitchenAiChatState = new Map();
  ingredents = new Map();
  constructor() {}

  start() {
    this.customer_AI.on("polling_error", (msg) => console.log(msg));
    this.customer_AI.on("polling_error", (msg) => console.log(msg));

    this.customer_AI.on("message", (msg, match) => {
      const chatId = msg.chat.id;
      const text = msg.text;
      // const resp = match[1];
      if (!text || text.length < 1) {
        this.customer_AI.sendMessage(chatId, "Send /help to get help");
      } else {
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

          default:
            this.customermenu(msg);
            break;
        }
      }
    });
    this.kitchen_AI.on("message", async (msg, match) => {
      const chatId = msg.chat.id;
      const text = msg.text;
      // const resp = match[1];
      if (!text || text.length < 1) {
        console.log("received a file or vn");
        // this.kitchen_AI.sendMessage(chatId, "Send /help to get help");
      } else {
        switch (text) {
          case "/1":
            await this._viewAllIngredent(msg);
            break;
          case "/2":
            await this._viewAllMeal(msg);
            break;
          case "/3":
            await this._updateIngredent(msg);
            break;
          case "/4":
            break;
          case "/5":
            this._addIngredent(msg);
            break;
          case "/6":
            this._addMeal(msg);
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
          case "/help":
            this.kitchenmenu(msg);
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
      `Welcome to Zinder Customer Our Chat ID is ${msg.chat.id}.\nEnter\n/1. View total active customers at the moment\n/2. View total customers last 24 hours\n/3. View total customers for the week\n/4. View total customers for the month\n/5. View total customers for the year\n/6. Download customer data\n/7. View total active visitors at the moment\n/8. View total visitors last 24 hours\n/9. View total visitors for the week\n/10. View total visitors for the month\n/11. View total visitors for the year\n/12. Download visitors data`
    );
  }
  kitchenmenu(msg) {
    this.kitchen_AI.sendMessage(
      msg.chat.id,
      `Welcome to Zinder Kitchen Our Chat ID is ${msg.chat.id}.\nEnter\n/1. View all ingredent\n/2. View all meal\n/3. Update an ingredent\n/4. Update a meal\n/5. Add new ingredent\n/6. Add new meal\n/7. Delete ingredent\n/8. Delete meal\n/9. Download ingredent record\n/10. Download meal record`
    );
  }
  async _viewAllIngredent(msg) {
    await this.ingredentService.all((ingredients) => {
      let message = ``;
      ingredients.forEach((ingredient, index) => {
        message += `${index + 1}. ${ingredient.name} - ${
          ingredient.url
        } - $${ingredient.price}\n`;
      });
      this.kitchen_AI.sendMessage(msg.chat.id, message.length > 0 ? message : 'No data');
    });
  }
  async _viewAllMeal(msg) {
    await this.mealService.all((meals) => {
      let message = `FORMAT: ID - NAME - QUANTITY - PRICE - INGREDENTS.\n\n`;
      meals.forEach((meal, index) => {
        message += `${index + 1}. ${meal.name} - ${meal.url} - $${
          meal.price
        } - ingredents:`;
        message += `.\n`;
      });
      this.kitchen_AI.sendMessage(msg.chat.id, message.length > 0 ? message : 'No data');
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
      }else if (this.kitchenAiChatState.get(msg.chat.id) == "Enter name of meal") {
        this.ingredents.set(msg.chat.id, {
          name: msg.text,
        });
        let message = "Enter meal price";
        this.kitchenAiChatState.set(msg.chat.id, message);
        this.kitchen_AI.sendMessage(msg.chat.id, message);
      }else if (this.kitchenAiChatState.get(msg.chat.id) == "Enter meal price") {
        let ingredent = this.ingredents.get(msg.chat.id);
        this.ingredents.set(msg.chat.id, {
          ...ingredent,
          price: msg.text,
        });
        let message =
          "send image of meal(Please do not click the compress option)";
        this.kitchenAiChatState.set(msg.chat.id, message);
        this.kitchen_AI.sendMessage(msg.chat.id, message);
      }else if (this.kitchenAiChatState.get(msg.chat.id) == "Enter ingredent price") {
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
    console.log(msg);
    const file = await this.kitchen_AI.getFile(msg.photo[0].file_id);
    const fileink = await this.kitchen_AI.getFileLink(msg.photo[0].file_id);
    this.kitchen_AI.sendMessage(msg.chat.id, JSON.stringify(file));
    this.kitchen_AI.sendMessage(msg.chat.id, fileink);
    this._downloadFile(fileink, msg.photo[0].file_name, msg);
  }
  async _handleDocument(msg) {
    console.log(msg);
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
        console.log("Download Completed");
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
        this.kitchen_AI.sendMessage(msg.chat.id, message);
      }
    }
  }
}
