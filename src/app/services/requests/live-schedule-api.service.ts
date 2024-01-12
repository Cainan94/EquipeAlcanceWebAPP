import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from 'src/app/global.service';
import { AvailableHours } from 'src/app/models/LiveSchedules/AvailableHours';
import { LiveScheduleTable } from 'src/app/models/LiveSchedules/LiveScheduleTable';
import { LiveSchedulesDTORequest } from 'src/app/models/LiveSchedules/LiveSchedulesDTORequest';
import { LiveSchedulesDTOResponse } from 'src/app/models/LiveSchedules/LiveSchedulesDTOResponse';
import { PonctuationDTOTable } from 'src/app/models/Ponctuation/PonctuationDTOTable';
import { StreamersDTOResponse } from 'src/app/models/Streamers/StreamersDTOResponse';
import { environment } from 'src/environments/environment.dev';


@Injectable({
  providedIn: 'root'
})
export class LiveScheduleAPIService {

  constructor(private http: HttpClient) { }

  private baseURL = environment.base_api_url + "/liveSchedules"

  public getAllAgendamentosInactive(start: number, end: number) {
    return this.http.get<LiveScheduleTable[]>(this.baseURL + "/AllAgendamentosInactive/" + start + "/" + end, { headers: this.getHeaderAuthentication() })
  }

  public getAllAgendamentosActive(start: number, end: number) {
    return this.http.get<LiveScheduleTable[]>(this.baseURL + "/AllAgendamentosActive/" + + start + "/" + end, { headers: this.getHeaderAuthentication() })
  }

  public getAllPeriodInactive(start: number, end: number) {
    return this.http.get<LiveSchedulesDTOResponse[]>(this.baseURL + "/AllPeriodInactive/" + start + "/" + end, { headers: this.getHeaderAuthentication() })
  }

  public getAllPeriodActive(start: number, end: number) {
    return this.http.get<LiveSchedulesDTOResponse[]>(this.baseURL + "/AllPeriodActive/" + + start + "/" + end, { headers: this.getHeaderAuthentication() })
  }

  public register(liveScheduleDtoRequest: LiveSchedulesDTORequest) {
    return this.http.post<LiveSchedulesDTOResponse>(this.baseURL + "/register", liveScheduleDtoRequest, { headers: this.getHeaderAuthentication() });
  }
  public registerByUser(liveScheduleDtoRequest: LiveSchedulesDTORequest) {
    return this.http.post<LiveSchedulesDTOResponse>(this.baseURL + "/registerByUser", liveScheduleDtoRequest, { headers: this.getHeaderAuthentication() });
  }

  public update(liveScheduleDtoRequest: LiveSchedulesDTORequest) {
    console.log(liveScheduleDtoRequest);
    
    return this.http.post<LiveSchedulesDTOResponse>(this.baseURL + "/update", liveScheduleDtoRequest, { headers: this.getHeaderAuthentication() });
  }

  public delete(liveScheduleDtoRequest: LiveSchedulesDTORequest) {
    return this.http.get<LiveSchedulesDTOResponse>(this.baseURL + "/delete/"+liveScheduleDtoRequest.id, { headers: this.getHeaderAuthentication() });
  }

  public getAllStreamerPodeAgendar(daySchedule: number) {
    return this.http.get<StreamersDTOResponse[]>(this.baseURL + '/getStreamersCamDoLive/' + daySchedule, { headers: this.getHeaderAuthentication() })
  }
  
  public getAllStreamersSchedules(daySchedule: number){
    return this.http.get<StreamersDTOResponse[]>(this.baseURL + '/getAllStreamersSchedules/' + daySchedule, { headers: this.getHeaderAuthentication() })
  }

  public getAvailableHours(daySchedule: number){
    return this.http.get<AvailableHours[]>(this.baseURL + '/getAvailableHours/' + daySchedule, { headers: this.getHeaderAuthentication() })
  }
  
  public getLastScheduleUser(){
    return this.http.get<LiveSchedulesDTOResponse>(this.baseURL + '/getLastScheduleUser/' + GlobalService.user.streamersDTOResponse.id, { headers: this.getHeaderAuthentication() })
  }

  public AllScheduleOfDay(daySchedule:number){
    return this.http.get<LiveSchedulesDTOResponse[]>(this.baseURL + '/AllScheduleOfDay/'+daySchedule, { headers: this.getHeaderAuthentication() })
  }

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
