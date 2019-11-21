import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Insomnia } from '@ionic-native/insomnia/ngx';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Platform } from '@ionic/angular';
import { GeolocationService } from '../geolocation.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html', 
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  latitude:number;
  longitude:number;
  message: string = "";
  userMessage: string;
  userMessagebad: string;
  data: string = "";
  text: string;
  constructor(private geolocation : Geolocation,
    private androidPermissions: AndroidPermissions,
    private platform : Platform,
    private speechRecognition: SpeechRecognition,
    private geolocationService : GeolocationService,
    private insomnia : Insomnia) {

    /*  this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.RECORD_AUDIO).then(
      res =>
    console.log("Sucess"),
    err => this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.RECORD_AUDIO])
     ); */

      
     this.speechRecognition.hasPermission().then((hasPermission : boolean)=>{

      if(!hasPermission){
        this.speechRecognition.requestPermission()
      }
    })
    
      this.insomnia.keepAwake()
      .then(
        () => console.log('success insoomnia'),
        () => console.log('error')
      );
      
      this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.RECORD_AUDIO,this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION,this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION])

    }


    ngOnInit(){
      /* this.speechRecognition.isRecognitionAvailable()
      .then((available: boolean) => console.log(available))
    
      this.speechRecognition.requestPermission()
      .then(
        () => console.log('Granted'),
        () => console.log('Denied')
      )
 */


    }


  getGeolocation(){
      this.platform.ready().then(()=>{
        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
          result => console.log('Has permission?',result.hasPermission),
          err => this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION,this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION])
        );

        var options ={
          timeout:2000,
          enableHighAccuracy:true
        }
        console.log('object :',this.geolocation);
        this.geolocation.getCurrentPosition(options).then((resp) => {
          console.log("resp",resp);
          this.latitude =  resp.coords.latitude
          this.longitude =  resp.coords.longitude
          console.log('this.latatitude :', this.latitude,this.longitude);
          this.sendCoordinates(this.latitude,this.longitude);

         }).catch((error) => {
           console.log('Error getting location', error);
         });


      })
    
  }

  sendCoordinates(latitude: number, longitude: number) {
    this.geolocationService.sendCoordinates(latitude,longitude).subscribe(resp=>{
      if(JSON.parse(JSON.stringify(resp)).status == "present"){
        this.userMessage = "Your Attendance has been logged Successfully. You are "+JSON.parse(JSON.stringify(resp)).diff+" meters away from the Institute";
      }else if(JSON.parse(JSON.stringify(resp)).status == "absent/missing"){
        this.userMessagebad = "There is some problem in logging your attendance. You are "+JSON.parse(JSON.stringify(resp)).diff+" meters away from the Institute";;
      }
      
    },
    (err:any)=>{
      console.log(err)
    })


    this.insomnia.allowSleepAgain()
    .then(
      () => console.log('success'),
      () => console.log('error')
    );
  }


start(){
 
  let options = {
    language : "en_US"
  }
  this.speechRecognition.startListening(options)
  .subscribe(
    (matches: string[]) => console.log(matches),
    (onerror) => console.log('error:', onerror)
  )
}

 

}
