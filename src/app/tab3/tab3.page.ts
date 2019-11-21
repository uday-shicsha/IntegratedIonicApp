import { Component } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { GeolocationService } from '../geolocation.service';
import { present } from '@ionic/core/dist/types/utils/overlays';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  userMessage: string;
  scannedCode: string;
  codeInput: string = "";
  btnActive: boolean;
  userMessagebad: string;

  constructor(
    private androidPermissions: AndroidPermissions,
    private qrScanner : QRScanner,
    private geolocationService : GeolocationService) {
    this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
      /* this.platform.ready().then(()=>{
        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
          result => console.log('Has permission?',result.hasPermission),
          err => this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION,this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION])
        );
      }) */
  }

  scanQR(){

     this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {

        if (status.authorized) {
          // camera permission was granted
          console.log("scanning");
          var ionApp = <HTMLElement>document.getElementsByTagName("ion-app")[0];
          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((scannedAddress: string) => {
            console.log('Scanned address', scannedAddress);
            this.scannedCode = scannedAddress;
            this.sendQRtoServer(scannedAddress);
            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
            ionApp.style.display = "block";
            
          });

          // show camera preview
          ionApp.style.display = "none";
          this.qrScanner.show();
          setTimeout(() => {
            ionApp.style.display = "block";
            scanSub.unsubscribe(); // stop scanning
            
            this.qrScanner.hide();
          }, 5000);
          // wait for user to scan something, then the observable callback will be called

        } else if (status.denied) {
          console.log("Denied permission to access camera");
        } else {
          console.log("Something else is happening with the camera");
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }


  sendQRtoServer(text: string) {
    this.userMessage = undefined;
    this.userMessagebad = undefined;
    console.log('this.userMessagebad :', this.userMessagebad);
    this.geolocationService.sendQR(text).subscribe(res=>{
      if(JSON.parse(JSON.stringify(res)).status == 'present'){
        this.userMessage = "Your Attendance has been logged Successfully."
      }else{
        this.userMessagebad = "Sorry the has Code Expired."
      }
      console.log(res);
    })
  }


  checkCodeInput(){
    if(this.codeInput.length >= 7){
      this.btnActive = true
    }else{
      this.btnActive = false;
    }
  }

  sendQR(){
    this.userMessage = undefined;
    this.userMessagebad = undefined;
    this.geolocationService.sendQR(this.codeInput).subscribe(res=>{
      if(JSON.parse(JSON.stringify(res)).status == 'present'){
        this.userMessage = "Your Attendance has been logged Successfully."
      }else{
        this.userMessagebad = "Sorry the has Code Expired."
      }
      console.log(res);
    })
  }

}
