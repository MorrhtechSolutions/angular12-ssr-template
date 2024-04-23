import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/shared/services/client/device.service';
import { FileService } from 'src/app/shared/services/client/file.service';
import { ScriptsService } from 'src/app/shared/services/client/scripts.service';
import { catchError, switchMap, tap, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MealService } from 'src/app/shared/services/meal/meal.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  meal: any = {
    name: '',
    price: '',
    description: '',
    image: '',
    status: ''
  };
  fileToUpload:any = null;

  errorMessage: string[] = [];

  constructor(private sc: ScriptsService, private ds: DeviceService, private _fs: FileService, private mealService: MealService, private authService: AuthService) { }

  ngOnInit(): void {
    this.meal.token = this.authService.auth().token;
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
          this.meal.image = f.file;
        }
      )
  }


  save() {
    this.errorMessage = [];
    if (this.validate()) {
      this.mealService.create(this.meal).subscribe(result => {
        console.log(result);
        this.ds.oInfoNotification('Submitting Form', 'Please wait while we save your new holiday record');
        this.sc.changePage('/admin/meal/')
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
    if (!this.meal.name) {
      this.errorMessage.push('Please fill in the name of the meal');
      status = false;
    }
    if (!this.meal.price) {
      this.errorMessage.push('Please fill in the exact price for this meal');
      status = false;
    }

    return status;
  }

  handleError(err: any) {
    this.ds.oErrorNotification('Oops', 'Issues registering company. Please contact support');

  }
}
