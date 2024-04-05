import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FileService } from 'src/app/shared/services/client/file.service';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { ScriptsService } from 'src/app/shared/services/client/scripts.service';
import { DeviceService } from 'src/app/shared/services/client/device.service';
@Component({
  selector: 'app-mail-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit {
  @Output('uploadedEvent') uploadedEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output('sendEvent') sendEvent: EventEmitter<any> = new EventEmitter<any>();
  @Input('uploaded') uploaded: any[] = [];
  @Input('data') data:any = null;
  @Input('id') id:any = null;
  @Input('config') config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '50',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
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

            res.status = 'Yet';
            this.uploaded.unshift(res);
            let today = new Date(Date.now());
            let _data = {
              ...this.newMessage,
              ...res,
              created_at:today,
              updated_at:today,
              code:`${this.id}-at-${today.getMilliseconds()}-file-${this.ss.generateRandomAlphanumeric(5)}`
            }
            this.uploadedEvent.emit(_data);
            this.data = '';
            this.reset();
            // this.newJobApplication.responsibility += `<a href="${res.file}" target="__blank">${res.fileName}</a><br>`
            // this.newJobApplication.description += `<a href="${res.file}" target="__blank">${res.fileName}</a><br>`

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
  newMessage: any = {
    content: null,
    status: 'Yet',
    code: `${this.ss.generateRandomAlphanumeric(10)}`,
    file: null,
    sender:null,
    recipient:null,
    dir:null,
    message:null,
    fileName:null,
    serverLocation:null,
    uploadPath:null,
    created_at:  '',
    updated_at: ''
  }
  constructor(private _fs: FileService, private ss: ScriptsService, private _ds: DeviceService) { }

  ngOnInit(): void {
  }
  send(){
    if(this.data){
      let today = new Date(Date.now());
      let _data = {
        ...this.newMessage,
        created_at:today,
        updated_at:today,
        code:`${this.id}-at-${today.getMilliseconds()}`,
        status:'Sending',
        content: this.data,
      }
      this.sendEvent.emit(_data);
      this.data = null;
      this.reset()
    }else{
      this._ds.oInfoNotification('Empty Message', 'Message content cannot  be empty');
    }


  }
  reset(){
    this.newMessage = {
      content: null,
      status: 'Yet',
      code: `${this.id}-at-${this.ss.generateRandomAlphanumeric(10)}`,
      file: null,
      sender:null,
      recipient:null,
      dir:null,
      message:null,
      fileName:null,
      serverLocation:null,
      uploadPath:null,
      created_at:  '',
      updated_at: ''
    }
  }
}
