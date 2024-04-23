import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ScriptsService } from '../client/scripts.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _auth: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private scriptService: ScriptsService) { }

  store(token:string){
    let encrypted = this.scriptService.encryptSha256(token);
    localStorage.setItem('session', encrypted);
  }
  auth(){
    const locals = localStorage.getItem('session');
    if(locals){
      try {
        const data = this.scriptService.decryptSha256(locals);
        const objdata = JSON.parse(data);
        return objdata;
      } catch (error) {
        this.clear()
        return undefined;
      }
    }else{
      this.clear()
      return undefined;
    }
  }
  clear(){
    localStorage.clear();
  }
}
