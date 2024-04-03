import dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";
dotenv.config();
export class TgService {
  // Create a bot that uses 'polling' to fetch new updates
  customer_AI = new TelegramBot(process.env.Casserole_Wang_Customer_AI_Bot, {
    polling: true,
  });

  constructor(){}

  start(){
    this.customer_AI.on("message", (msg, match) => {
      this.menu(msg);
      const chatId = msg.chat.id;
      const text = msg.text;
      const resp = match[1];
      console.log(msg);
      console.log(match[0]);
      console.log(match[1]);
      if (!text || text.length < 1) {
        this.customer_AI.sendMessage(chatId, "Send /help to get help");
      }else{
        switch (text) {
          case '/1':

            break;

          case '/2':

            break;

          case '/3':

            break;

          case '/4':

            break;

          case '/5':

            break;

          case '/6':

            break;

          case '/7':

            break;

          case '/8':

            break;

          case '/9':

            break;

          case '/10':

            break;

          case '/11':

            break;
          case '/12':

            break;

          default:
            return this.menu(msg)
            break;
        }
      }
    });
  }

  myChatId(msg){
    // send a message to the chat acknowledging receipt of their message
    this.customer_AI.sendMessage(msg.chat.id, "Received your message: " + msg.chat.id);
  }
  reply(msg){
    this.customer_AI.sendMessage(msg.chat.id, "You entered" + msg.chat.id);

  }
  menu(msg){
    this.customer_AI.sendMessage(msg.chat.id,
      `Welcome to Zinder Customer Our Chat ID is ${msg.chat.id}.\nEnter\n/1. View total active customers at the moment\n/2. View total customers last 24 hours\n/3. View total customers for the week\n/4. View total customers for the month\n/5. View total customers for the year\n/6. Download customer data\n/7. View total active visitors at the moment\n/8. View total visitors last 24 hours\n/9. View total visitors for the week\n/10. View total visitors for the month\n/11. View total visitors for the year\n/12. Download visitors data`);
  }
}
