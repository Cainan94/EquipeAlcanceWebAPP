import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from 'src/app/global.service';
import { StreamersDTOResponse } from 'src/app/models/Streamers/StreamersDTOResponse';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class StreamerApiService {
  private baseURL = environment.base_api_url + "/streamers";

  constructor(private http: HttpClient) { }

  public getAllAtivoStreamer() {
    return this.http.get<StreamersDTOResponse[]>(this.baseURL + '/getAllActive', { headers: this.getHeaderAuthentication() })
  }

  private getHeaderAuthentication(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + GlobalService.user.token,
      "Cache-Control": "no-cache"
    });
  }
}
