import fs from 'fs';
import path from 'path';
import dotenv from "dotenv";
import bot from "../service/telegram.service.mjs";
import DB from "../../db/index.mjs";
import fileDirName from '../../file-dir-name.mjs';
import { TelegramController } from './telegram.controller.mjs';

const { __dirname } = fileDirName(import.meta);

const DBPATH = "/../../db/records.json";

dotenv.config();

const MASTERCHATID = process.env.TELEGRAM_MASTERCHATID;;

const MAILER_API = process.env.MAIL_SERVER_URL;

export class BookingController{
    _ts = new TelegramController();
    constructor(){}
    
    async create(req, res) {
        if (req.method === 'POST') {
            let message =  `You have a new booking from Zinder from ${req.body.name}. 
                            Full Data below\n${JSON.stringify(req.body)}`;
            let response = await this._ts._messageAdmin(message);
            let newContact = this._create(req, res);
            console.log({response,newContact})
            return res.json({response});
        }else{
            return res.json({});
        }
    }
    _create(req, res){
        const now = new Date(Date.now());
        const dbJson = JSON.parse(DB);
        let bookings = dbJson.bookings;
        req.body.created_at = now;
        req.body.updated_at = now;
        let latestId = bookings.length < 1 ? 1 : bookings.length+1;
        let newbookings = req.body;
        newbookings.id = latestId;
        bookings.push(newbookings);
        const DBJSON = {...dbJson};
        return fs.writeFileSync(path.join(
            path.normalize(__dirname + DBPATH)
        ), JSON.stringify(DBJSON, null, 2));
    }

}