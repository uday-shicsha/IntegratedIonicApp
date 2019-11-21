import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor(private http:HttpClient) { }

  sendCoordinates(latitude,longitude){
    return this.http.post(environment.sendCoordinates(),
    {
      "origin": {
          "latitude": 17.4511245,
          "longitude": 78.3705796
      },
      "destination": {
          "latitude": latitude,
          "longitude": longitude
      }
    }
    )
  }

  generateQR(){
    return this.http.post(environment.generateQR(),  {
      "origin": {
          "latitude": 17.4511245,
          "longitude": 78.3705796
      },
      "destination": {
          "latitude": 17.4511245,
          "longitude": 78.3705796
      }
    });
  }

  sendQR(code){
    return this.http.post(environment.sendQRcode(),
    {"code" : code});
  }

}
