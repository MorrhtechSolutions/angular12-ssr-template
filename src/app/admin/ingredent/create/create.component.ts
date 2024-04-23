import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/shared/services/client/device.service';
import { FileService } from 'src/app/shared/services/client/file.service';
import { ScriptsService } from 'src/app/shared/services/client/scripts.service';
import { catchError, switchMap, tap, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { IngredentService } from 'src/app/shared/services/ingredent/ingredent.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  ingredent: any = {
    name: '',
    price: '',
    description: '',
    image: '',
    status: ''
  };
  fileToUpload:any = null;
  errorMessage: string[] = [];

  constructor(private sc: ScriptsService, private ds: DeviceService, private _fs: FileService, private ingredentService: IngredentService, private authService: AuthService) { }

  ngOnInit(): void {
    this.ingredent.token = this.authService.auth().token;
  }

  navigate_page(page: string) {
    this.sc.changePage(page);
  }

  goBack(url: string) {
    this.sc.changePage(url)
  }

  handleFileInput(event: any) {
    const files: FileList = event.target.files;
    this.fileToUpload = files.item(0);
    const fileToUpload = this.fileToUpload;
    let formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.ds.oInfoNotification('Uploading','Please wait while we upload your image.');
    this._fs.upload(formData)
      .pipe(
        catchError((err: any) => {
          this.ds.hideSpinner();
          this.ds.oErrorNotification('Issues uploading', 'Issues with uploading the selected image. Please select another file');
          return throwError(err);
        })
      )
      .subscribe(
        f => {
          this.ds.hideSpinner();
          this.ds.oSuccessNotification('Company Icon Uploaded', 'Successfully saved company icon for upload')
          this.ingredent.image = f.file;
        }
      )
  }


  save() {
    this.errorMessage = [];
    if (this.validate()) {
      this.ingredentService.create(this.ingredent).subscribe(result => {
        console.log(result);
        this.ds.oInfoNotification('Submitting Form', 'Please wait while we save your new holiday record');
        this.sc.changePage('/admin/ingredent/')
      },
        (error: any) => console.log(error)
      )

    } else {
      // If there is an error
      this.ds.oErrorNotification('Oops', 'Something went wrong');
    }
  }
  validate(): boolean {
    let status = true;
    if (!this.ingredent.name) {
      this.errorMessage.push('Please fill in the name of the ingredent');
      status = false;
    }
    if (!this.ingredent.price) {
      this.errorMessage.push('Please fill in the exact price for this ingredent');
      status = false;
    }

    return status;
  }

  handleError(err: any) {
    this.ds.oErrorNotification('Oops', 'Issues registering company. Please contact support');

  }
}
