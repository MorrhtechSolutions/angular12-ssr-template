import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { DeviceService } from '../../services/client/device.service';
import { Observable, of } from 'rxjs';
import { map, switchMap, takeWhile, distinctUntilChanged, debounceTime, last } from 'rxjs/operators';
import { ScriptsService } from '../../services/client/scripts.service';
import { MatDialog } from '@angular/material/dialog';

declare const $: any;
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, AfterViewInit {
  @Input('id')
  private _id: any = '';
  public get id(): any {
    return this._id;
  }
  public set id(value: any) {
    this._id = value;
  }
  @Input('code')
  private _code: any = '';
  public get code(): any {
    return this._code;
  }
  public set code(value: any) {
    this._code = value;
  }
  @Input('content')
  private _content: any = null;
  public get content(): any {
    return this._content;
  }
  public set content(value: any) {
    this._content = value;
  }
  $:any = $;
  modalElement:any = null;
  modal$: Observable<any> = this._deviceService.modal$.pipe(
    map((res: Map<string, any>) => res.size),
    switchMap(res => {
      if (res > 0) {
        return this._deviceService.loadedmodal$.pipe(
          map((_r: any[]) => {

            let r = _r;
            let _p = r.pop();

            return _r[-1];
          }),
          // distinct(),
          // debounceTime(900),
          distinctUntilChanged((prev: string, curr: string) => prev !== curr),
          takeWhile((val: any) => val && val.length > 0),
          // take(1),
          switchMap(_res => {

            return !_res ? of(_res) : of(this._deviceService.modal_.get(_res))
          })
        )
      }
      return of(undefined)
    })
  )
  constructor(private _deviceService: DeviceService, private ss: ScriptsService) { }
  ngAfterViewInit(): void {
    // this.modal$.subscribe(
    //   m=>{
    //
    //
    //     if(m && m.modal){
    //
    //       m.modal.show()
    //     }
    //   }
    // )






  }

  ngOnInit(): void {
    this.code = this.ss.generateRandomAlphanumeric(5);
    this.id = 'Modal_Loaded_' + this.code;
    this.modalElement = $(`#${this.id}`).modal();



  }
  public show = () => {

    this.$(this.code).modal.show();
  }
  public show$(){

    this.$(this.code).modal.show();
  }
  private _show$(){

    this.$(this.code).modal.show();
  }
}
