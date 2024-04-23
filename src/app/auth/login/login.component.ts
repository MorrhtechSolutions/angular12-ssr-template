import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { DeviceService } from 'src/app/shared/services/client/device.service';
import { ScriptsService } from 'src/app/shared/services/client/scripts.service';
import { SocketService } from 'src/app/shared/services/client/socket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage:string[]=[];
  data:any = {
    email:'',
    emailStatus: false,
    tokenStatus: false,
    token: ''
  };
  hashedData:any = null;
  constructor(private scriptService: ScriptsService, private socketService: SocketService, private deviceService: DeviceService, private authService: AuthService) { }

  ngOnInit(): void {
  }
  save(){
    if(this.data.token.length < 6){
      this.errorMessage.push('Invalid Code');
      return;
    }
    const data = {
      email: this.data.email,
      token: this.data.token
    }
    this.deviceService.showSpinner();
    this.socketService.authenticateadminCodeRequest(data);
    this.socketService.socket.on(`request-auth-with-token-response`,(data)=>this.handleAuthResponse(data))
  }
  goBack(path:string){
    this.scriptService.changePage(path);
  }
  sendCode(){
    this.errorMessage = [];
    if(!this.scriptService.validateEmail(this.data.email)){
      this.errorMessage.push('Email not accepted');
      return;
    }
    this.deviceService.showSpinner();
    this.socketService.adminCodeRequest(this.data);
    this.socketService.socket.on(`request-auth-token-response`,(data)=>this.handleCodeResponse(data))
    // this.socketService.adminCodeRequestResponse(this.handleCodeResponse);
  }
  handleCodeResponse(data){
    this.deviceService.hideSpinner();
    if(data.status == 500){
      this.deviceService.oErrorNotification('Issue', data.message);
      this.data.email = '';
    }else{
      this.deviceService.oSuccessNotification('Response', data.message);
      console.log(data);
      this.hashedData = data.data;
      this.data.emailStatus = true;
    }
  }

  handleAuthResponse(data){
    this.deviceService.hideSpinner();
    if(data.status == 500){
      this.deviceService.oErrorNotification('Issue', data.message);
      this.data.email = '';
    }else{
      this.deviceService.oSuccessNotification('Response', data.message);
      this.authService.store(JSON.stringify(data.data));
      console.log(data);
      this.hashedData = null;
      this.data = {
        email:'',
        emailStatus: false,
        tokenStatus: false,
        token: ''
      };
      this.scriptService.changePage('/admin/order');
    }
  }


}
