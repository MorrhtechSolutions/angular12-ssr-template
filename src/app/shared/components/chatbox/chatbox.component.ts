import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
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
  @Input('recipient') recipient: any = {};
  @Input('me') me: any = {};
  @Input('editorConfig') editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '120px',
    minHeight: '100px',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: false,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: `${environment.uploadApi}/upload`,
    upload: (file: File) => {

      let formData = new FormData();
      formData.append('file', file, file.name)
      return this._fs.upload(formData)
        .pipe(
          catchError((err: any) => {

            return throwError(err);
          }),
          tap((res:any)=>{



          })
        );
      },
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };
  @Input('header') header: boolean = false;
  messages: any[] = [];
  ngAfterViewInit(): void {
  }

  dialog: any = null;
  searching: boolean = false;
  foundResult: boolean = false;
  list: any[] = [];
  user: any = {};
  chatList: any[] = [
    {
      code: 'ZT-U1',
      id: '1',
      email: 'test@info.com',
      firstName: 'Zinder',
      lastName: 'Admin',
      passport: null,
      status: 'Active',
      lastSeen: 'Now'
    }
  ];
  _chatList: any[] = [
    {
      code: 'ZT-U1',
      id: '1',
      email: 'test@info.com',
      firstName: 'Zinder',
      lastName: 'Admin',
      passport: null,
      status: 'Active',
      lastSeen: 'Now'
    }
  ];
  searchContDown: any = 1;
  searchContDown$: Observable<any> = timer(1000).pipe(tap(c => {
    if (c > 98) {
      this.searching = false;
    }
  })
  );
  searchKeyForm: FormGroup = this.formBuilder.group({
    query: new FormControl('', [Validators.required, Validators.email])
  });
  event$: Observable<any> = this.deviceService.getEventsApi({
    who_like: this.user.code
  });
  selectedChat: any = null;
  // chats:Observable<any>=
  contact$: Observable<any> = this.socketService.contacts;
  // contacts$: Observable<any> = this.contacts.pipe(
  //   switchMap((r:any)=>{
  //     if(r.length < 1){
  //       return this.deviceService.newContact()
  //     }else{

  //     }
  //   })
  // );
  constructor(
    private formBuilder: FormBuilder,
    private deviceService: DeviceService,
    private socketService:SocketService,
    private _fs: FileService,
    public dialogModule: MatDialog) { }

  ngOnInit(): void {33
    this.event$.subscribe(c => this.list = c);
    this.searchKeyForm.controls.query.valueChanges.pipe(
      skipWhile(v => v.length < 2),
      debounceTime(1500),
      distinctUntilChanged()
    ).subscribe(
      value => {


        
      }
    );
    let existinglistv = this.deviceService._conversations.value.get(this.recipient.code);
    if (existinglistv) {
      this.messages = existinglistv;
    }
    this.contact$.subscribe(c=>console.log(c));
    this.socketService.getContacts();

  }


  uploadedEventHandler(event: any) {
    event.sender = this.me.code;
    event.recipient = this.recipient.code;
    event.mail = null;
    let mail = {
      from: this.me.email, //replace with your email
      to: this.recipient.email,
      subject: `New Message from ${this.me.firstName} via zinder`,
      html: null,
      innerBody: event.content,
    }
    if (this.isHtml(event.content)) {
      mail.html = event.content;
    }
    this.deviceService.mail(mail)
      .pipe(
        catchError((e: any) => {
          return throwError(e);
        })
      )
      .subscribe(

      )

    this.messages.push(event);

  }
  sendEventHandler(event: any) {
    console.log(event)
    event.sender = this.me.code;
    event.recipient = this.recipient.code;
    event.status = 'Sent';
    event.mail = null;
    let mail = {
      from: this.me.email, //replace with your email
      to: this.recipient.email,
      subject: `New Message from ${this.me.firstName} via zinder messanger`,
      html: null,
      innerBody: event.content,
    }
    if (this.isHtml(event.content)) {
      mail.html = event.content;
    }
    console.log(event)
    console.log(mail)



  }

  updateFeed(message: any) {
    let existinglistv = this.deviceService._conversations.value;
    let existinglist = this.threads;
    const loadedIndex = existinglist.findIndex(m => m.code == message.code);
    if (loadedIndex > -1) {
      existinglist[loadedIndex] = message;
    } else {
      existinglist.push(message);
    }
    existinglistv.set(this.recipient.code, existinglist);
    this.deviceService._conversations.next(existinglistv)
  }

  set selectChat(chat: any) {
    this.selectedChat = chat;
    setTimeout(() => {
      this.gotoBottom();
    }, 900);
  }

  gotoBottom() {
    let element: any = document.getElementById(`chatmessaggeboxid`);
    if(element){
      element.scrollIntoView({ top: element.scrollHeight, behavior: 'smooth' });
    }
  }
  searchUser(value: any) {


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
  get threads() {
    return this.deviceService._conversations.value.get(this.recipient.code) || [];
  }
  getTime(time: any) {
    return new Date(time).toLocaleDateString()
  }

  isHtml(content: string) {
    let regexForHTML = /<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(.*?)<\/\1>/;
    return regexForHTML.test(content);
  }

}
