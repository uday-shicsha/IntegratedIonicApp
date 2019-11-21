import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx'
import { Platform, NavController } from '@ionic/angular';
import { GeolocationService } from '../geolocation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  elementType :  'canvas';
  btnActive : boolean = true;
  value: string;
  constructor(private geolocation :Geolocation,
              private platform: Platform,
              private geolocationService : GeolocationService,
              private router : Router,
              private navController: NavController) {

    this.value = "Chill bro"

  }


  ngOnInit(){ 
   
     
  
  }

  generateQR(){
    this.geolocationService.generateQR().subscribe(res=>{
      this.btnActive = false;
      console.log('res :', res); 
      if(JSON.parse(JSON.stringify(res)).code){
        this.value = JSON.parse(JSON.stringify(res)).code;
      }
    })
  }




  navigate(){
    //this.router.navigate(['/tabs/tab4']);
    this.router.navigateByUrl('/tabs/tab4');
    //this.navController.navigateRoot(`/tabs/tab4`)
  }
 

}
