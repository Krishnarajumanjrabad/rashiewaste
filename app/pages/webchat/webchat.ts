import {Component, NgZone} from "@angular/core";
import {Http} from "@angular/http";
/*declare var require: Require;
 var io = require('socket.io');*/

/*
 Generated class for the WebchatPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'build/pages/webchat/webchat.html',
})
export class WebchatPage {
  /*private socketHost;
   private messages;
   private zone;
   private chatBox;
   private socket;*/


  constructor(http: Http, zone: NgZone) {
    /* this.messages = [];
     this.socketHost = "http://192.168.1.105:3000";
     this.zone = new NgZone({enableLongStackTrace: false});
     http.get(this.socketHost + "/fetch").subscribe((success) => {
     var data = success.json();
     for(var i = 0; i < data.length; i++) {
     this.messages.push(data[i].message);
     }
     }, (error) => {
     console.log(JSON.stringify(error));
     });
     this.chatBox = "";
     this.socket = io(this.socketHost,this.zone);
     this.socket.on("chat_message", (msg) => {
     this.zone.run(() => {
     this.messages.push(msg);
     });
     });*/
  }

  /*send(message) {
   if(message && message != "") {
   this.socket.emit("chat_message", message);
   }
   this.chatBox = "";
   }*/

}
