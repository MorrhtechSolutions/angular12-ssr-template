import needle from "needle";
import dotenv from "dotenv";
// import http from "http";
import request from "request";
dotenv.config();
// const request = require('request');

const MAILER_API = process.env.MAIL_SERVER_URL;

export class MailService{
    constructor(){}
    single(subject, from, to, html, cb, cc=[], bcc=[]){
        let data = {from,to,subject,cc,html,bcc};
        var clientServerOptions = {
            uri: MAILER_API,
            body: JSON.stringify(data),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        request(clientServerOptions, function (error, response) {
            console.log("error,response.body");
            console.log(error,response.body);
            cb(error,response.body);
        });
        // return await needle.post(`${MAILER_API}/mail`, data)
        // .then(function(resp) { 
        //     console.log("resp");
        //     console.log(resp);
        //     console.log("resp");
        //  })
        // .catch(function(err) { 
        //     console.error("err") ;
        //     console.error(err) ;
        //     console.error("err") ;
        // })
    }

}