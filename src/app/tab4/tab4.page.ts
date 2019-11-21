import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx'
import { Platform, ToastController } from '@ionic/angular';
import { GeolocationService } from '../geolocation.service';
import { ChatService } from '../chat.service';
import { WebsocketService } from '../websocket.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  providers: [WebsocketService, ChatService]
})
export class Tab4Page implements OnInit {
  user:String = "shicshaUser" + Math.round(Math.random() * 10);
  room:String;
  messageText:String;
  messageArray:Array<{user:String,message:String}> = [];
  constructor(private _chatService:ChatService){
      this._chatService.newUserJoined()
      .subscribe(data=> this.messageArray.push(data));


      this._chatService.userLeftRoom()
      .subscribe(data=>this.messageArray.push(data));

      this._chatService.newMessageReceived()
      .subscribe(data=>this.messageArray.push(data));
  }

  ngOnInit(){

  }

  join(){
      this._chatService.joinRoom({user:this.user, room:this.room});
  }

  leave(){
      this._chatService.leaveRoom({user:this.user, room:this.room});
  }

  sendMessage()
  {
      this._chatService.sendMessage({user:this.user, room:this.room, message:this.messageText});
  }

}
