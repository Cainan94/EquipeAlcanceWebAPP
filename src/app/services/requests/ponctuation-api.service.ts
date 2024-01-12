import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PonctuactionDTOResponse } from 'src/app/models/Ponctuation/PonctuationDTOResponse';
import { GlobalService } from 'src/app/global.service';
import { environment } from 'src/environments/environment.dev';
import { PonctuationDTOTable } from 'src/app/models/Ponctuation/PonctuationDTOTable';
import { PonctuationDTORequest } from 'src/app/models/Ponctuation/PonctuationDTORequest';

@Injectable({
  providedIn: 'root'
})
export class PonctuationApiService {

  private baseURL = environment.base_api_url + "/ponctuation"
  constructor(private http: HttpClient) { }

  sendPonctuation(request: PonctuationDTORequest) {
    let url = this.baseURL + "/registerPonctuation";
    return this.http.post<PonctuactionDTOResponse>(url,request,{headers:this.getHeaderAuthentication()})
  }

  private getHeaderAuthentication(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + GlobalService.user.token,
      "Cache-Control": "no-cache",
    });
  }

}
