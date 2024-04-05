import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { BehaviorSubject } from 'rxjs';
import { io } from "socket.io-client";
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private _socket = io(environment.appDomain, {transports: ['websocket', 'polling', 'flashsocket']});
  // private __socket =
  engine:BehaviorSubject<any> = new BehaviorSubject<any>(null);
  id:BehaviorSubject<any> = new BehaviorSubject<any>(null);
  contacts:BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private deviceDetector: DeviceDetectorService) {
    // console.log(this.socket)
    // this._socket.on("connect", this.connected);
    // this._socket.on("disconnect", this.disconnected);
  }
  connected(){
    if(this.socket){
      this.onConnectedUser({id:this.socket.id, status: 'connected'})
      this.engine.next(this.socket.io.engine);
      this.id.next(this.socket.id);
    }else{
      this.engine?.next(this.socket);
      this.id?.next(this.socket);
    }
  }
  update(sock:any){
    const now = Date.now()
    return this.socket.emit('update-on-connect-'+sock.id,{
      ...this.deviceDetector.getDeviceInfo(),
      ...sock,
      created_at: now,
      updated_at: now

    });
  }

  // listen event
	onConnectedUser(sock:any) {
    this.update(sock);
		return this.socket.on('update-on-success-'+sock.id,(...args)=>{
      this.connectionBrowserCaptured(sock);
      console.log(args);
    });
	}

  connectionBrowserCaptured(sock:any){
    const now = Date.now()
    const device = this.deviceDetector.getDeviceInfo();
    return this.socket.emit('notify-browser-captured-'+sock.id,{
      message: `Broadcasted Notification\n#${sock.id} User connected with ${device.browser} browser of version ${device.browser_version} running on ${device.os} Operating system of OS version ${device.os_version}. More Info are: \nOrientation scale ${device.orientation} \nDevice Type: ${device.deviceType}\nUser Agent: ${device.userAgent}`,
      ...sock,
      created_at: now,
      updated_at: now

    });
  }
  joinque(sock:any){
    const now = Date.now()
    const device = this.deviceDetector.getDeviceInfo();
    return this.socket.emit('live-chat-waiting-client-'+sock.id,{
      message: `Broadcasted Notification\n#${sock.id} User connected with ${device.browser} browser of version ${device.browser_version} running on ${device.os} Operating system of OS version ${device.os_version}. More Info are: \nOrientation scale ${device.orientation} \nDevice Type: ${device.deviceType}\nUser Agent: ${device.userAgent}`,
      ...sock,
      created_at: now,
      updated_at: now

    });
  }

  getContacts(){
    this.socket.on('fetchChatContacts',(args)=>{
      console.log('Contact args')
      console.log(args);
      this.contacts.next(args)
    });
		return this.socket.emit('fetchContactRequest',{
      id: '3222'
    });
  }


  closed(reason:any){
    console.log("closing");
    console.log(reason);
  }
  disconnected(reason:any){
    console.log("Disconnected");
    console.log(reason);
  }
  get socket(){
    return this._socket;
  }

}
