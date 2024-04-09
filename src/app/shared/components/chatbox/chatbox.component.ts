import { Component, OnInit, Input, Output, AfterViewInit, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of, range, timer, throwError } from 'rxjs';
import { catchError, switchMap, shareReplay, tap, skipWhile, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DeviceService } from 'src/app/shared/services/client/device.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SocketService } from 'src/app/shared/services/client/socket.service';
import { environment } from 'src/environments/environment';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FileService } from '../../services/client/file.service';

declare const $: any;
@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent implements OnInit, AfterViewInit {
  @Output('end') end: EventEmitter<boolean> = new EventEmitter();
  start:boolean = false;
  showing:boolean = false;
  ngAfterViewInit(): void {
  }

  constructor(
    private formBuilder: FormBuilder,
    private deviceService: DeviceService,
    public dialogModule: MatDialog) { }

  ngOnInit(): void {

  }

  getReadableTime(time: any) {
    const _time = new Date(time);
    return this.getFormattedDate(time);
    // return _time.toUTCString();
  }
  getFormattedDate(_date: any) {
    let date = new Date(_date);

    let month: any = date.getMonth() + 1;
    let day: any = date.getDate();
    let hour: any = date.getHours();
    let min: any = date.getMinutes();
    let sec: any = date.getSeconds();

    month = (month < 10 ? "0" : "") + month;
    day = (day < 10 ? "0" : "") + day;
    hour = (hour < 10 ? "0" : "") + hour;
    min = (min < 10 ? "0" : "") + min;
    sec = (sec < 10 ? "0" : "") + sec;

    var str = hour + ":" + min + ":" + sec + ", " + date.getFullYear() + "-" + month + "-" + day;

    /*alert(str);*/

    return str;
  }
  getTime(time: any) {
    return new Date(time).toLocaleDateString()
  }

  isHtml(content: string) {
    let regexForHTML = /<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(.*?)<\/\1>/;
    return regexForHTML.test(content);
  }
  endSession(){
    this.end.emit(false);
    this.start = false;
  }
  startSession(){
    this.start = true;
  }

}
