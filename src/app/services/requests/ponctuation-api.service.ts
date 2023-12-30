import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PonctuactionDTOResponse } from 'src/app/models/Ponctuation/PonctuationDTOResponse';
import { GlobalService } from 'src/app/global.service';
import { environment } from 'src/environments/environment.dev';
import { PonctuationDTOTable } from 'src/app/models/Ponctuation/PonctuationDTOTable';

@Injectable({
  providedIn: 'root'
})
export class PonctuationApiService {

  private baseURL = environment.base_api_url+"/ponctuation"
  constructor(private http: HttpClient) { }

  public getAllPonctuationByPeriod(start:number,end:number){
    return this.http.get<PonctuationDTOTable[]>(this.baseURL+"/getAllPonctuationByPeriod/"+start+"/"+end,{headers:this.getHeaderAuthentication()})
  }
  public getAllPonctuationByPeriodAndUser(start:number,end:number){
    return this.http.get<PonctuationDTOTable[]>(this.baseURL+"/getAllPonctuationByPeriodAndUser/"+start+"/"+end+"/"+GlobalService.user.streamersDTOResponse.id,{headers:this.getHeaderAuthentication()})
  }

  private getHeaderAuthentication(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + GlobalService.user.token,
      "Cache-Control": "no-cache",
    });
  }

}
