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

export class AttendanceController{
    _ts = new TelegramController();
    constructor(){}

    static get attendanceDB(){
        return JSON.parse(DB).attendance;
    }
    
    static get allSchedules(){
        return JSON.parse(DB).schedule;
    }

    get attendanceDB(){
        return JSON.parse(DB).attendance;
    }
    
    get allSchedules(){
        return JSON.parse(DB).schedule;
    }
    
    create(req, res) {
        if (req.method === 'POST') {
            let message =  `You have a new booking from Zinder from ${req.body.name}. Full Data below\n${JSON.stringify(req.body)}`;
            let ds = this._ifSheduleExists(req.body);
            console.log(ds)
            if(ds){
                return res.status(500).json({message:'Duplicate: Users can only have one schedule calendar. Edit the existing calendar to make desired changes / Delete the exisitng one to recreate a new one for user.'})
            }else{
                const created = this._create(req);
                return res.json(created);
            }
            
        }else{
            return res.json({});
        }
    }
    _create(req){
        const now = new Date(Date.now());
        const dbJson = JSON.parse(DB);
        req.body.created_at = now;
        req.body.updated_at = now;
        let latestId = this.allSchedules.length < 1 ? 1 : this.allSchedules.length+1;
        let newShedule = req.body;
        newShedule.id = latestId;
        const schedules = this.allSchedules;
        schedules.push(newShedule);
        dbJson.schedule = schedules;
        const DBJSON = {...dbJson};
        fs.writeFileSync(path.join(
            path.normalize(__dirname + DBPATH)
        ), JSON.stringify(DBJSON, null, 2));
        return newShedule
    }

    _ifSheduleExists(_schedule){
        return this.allSchedules.find( s=>s.participant == _schedule.participant); 
    }
    _validate(req){
        let errors = [];
        if(!req.body.year || req.body.year.length !== 4){
            errors.unshift('Invalid Year parameter');
        }
        if(!req.body.month){
            errors.unshift('Invalid Month parameter');
        }
        if(!req.body.week){
            errors.unshift('Invalid Week parameter');
        }
        if(!req.body.day){
            errors.unshift('Invalid Day parameter');
        }
        if(!req.body.checkIn || req.body.checkIn <0 || req.body.checkIn >24){
            errors.unshift('Invalid Check-In parameter');
        }
        if(!req.body.checkOut || req.body.checkOut <0 || req.body.checkOut >24){
            errors.unshift('Invalid Check-Out parameter');
        }
    }


}