import needle from "needle";
import dotenv from "dotenv";
// import http from "http";
import request from "request";
dotenv.config();
// const request = require('request');
import * as nodemailer from "nodemailer";

const MAILER_API = process.env.MAIL_SERVER_URL;

export class MailService{
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER, //replace with your email
      pass: process.env.EMAIL_PASS, //replace with your password
    },
  });
    constructor(){}
    async send(subject, to, html, from = process.env.EMAIL_USER, cc = [], bcc = []) {
      const info = await this.transporter.sendMail({
        from: from, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        // text: "Hello world?", // plain text body
        html: html, // html body
      });
      console.log(info);
      return info
    }

}
