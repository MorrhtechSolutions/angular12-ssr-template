import fs from 'fs';
import path from 'path';
import dotenv from "dotenv";
import bot from "../service/telegram.service.mjs";
import DB from "../../db/index.mjs";
import fileDirName from '../../file-dir-name.mjs';
import { ContactService } from '../service/contact.service.mjs';

const { __dirname } = fileDirName(import.meta);

const DBPATH = "/../../db/records.json";

dotenv.config();

const MASTERCHATID = process.env.TELEGRAM_MASTERCHATID;;

const MAILER_API = process.env.MAIL_SERVER_URL;

export class ContactController{
  _cService = new ContactService()
    constructor(){}

    async myContacts(req, res) {
        const dbJson = JSON.parse(DB);
        const contacts = dbJson.contacts;
        if (req.method === 'POST') {
            if(!req.body.who){
                a
            }
            if(!req.body.recipient){
                return res.status(500).json({
                    message: 'Who is the receiving contact? ensure to have a valid recipient code added to request<Contact Dev team>.'
                })
            }
            let doesExist = contacts.find(c=>c.who == req.body.who && c.recipient == req.body.recipient);
            if(!doesExist){
                let newContact = await this.welcomeContact(req, res);
                return res.json(newContact);
            }
            return res.status(500).json({
                message: 'Contact already exists'
            })
        }else if(req.method === 'GET'){
            console.log("req.params");
            // if(contacts.length < 1){

            // }
            let newContact = await this.welcomeContact(req, res);
            return res.json(newContact);
        }else{
            return res.json(contacts.reverse());
        }
    }
    getAllContacts(req, res){
      return this._cService.getAll(req, res);
    }
    welcomeContact(req, res){
        const now = new Date(Date.now());
        const dbJson = JSON.parse(DB);
        // console.log(dbJson)
        const contacts = [...dbJson.contacts];
        const recipient = dbJson.users.find(u=>u.code.toLowerCase() == req.params.who_like.toLowerCase())
        const who = dbJson.users.find(u=>u.role.includes('Master'));
        req.body.recipient = recipient;
        req.body.who = who;
        req.body.status = 'Active';
        req.body.created_at = now;
        req.body.updated_at = now;
        let latestId = contacts.pop();
        let newContact = req.body;
        if(latestId){
            latestId = latestId.id + 1;
        }else{
            latestId = 1;
        }
        newContact.id = latestId;
        console.log(dbJson.contacts);
        dbJson.contacts.push(newContact);
        console.log(dbJson.contacts);
        const DBJSON = {...dbJson};
        bot.sendMessage(MASTERCHATID, `User added a new contact. ${JSON.stringify(newContact)}`);
        return fs.writeFileSync(path.join(
            path.normalize(__dirname + DBPATH)
        ), JSON.stringify(DBJSON, null, 2));
        // return fs.writeFileSync(DBJSON, JSON.stringify(DBJSON));
    }

}
