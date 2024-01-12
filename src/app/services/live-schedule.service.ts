import { Injectable } from '@angular/core';
import { LiveScheduleAPIService } from './requests/live-schedule-api.service';
import { LiveSchedulesDTORequest } from '../models/LiveSchedules/LiveSchedulesDTORequest';

@Injectable({
  providedIn: 'root'
})
export class LiveScheduleService {

  constructor(private api: LiveScheduleAPIService) { }

  public getAllAgendamentosInactive(start: number, end: number) {
    return this.api.getAllAgendamentosInactive(start, end);
  }

  public getAllAgendamentosActive(start: number, end: number) {
    return this.api.getAllAgendamentosActive(start, end);
  }

  public getSChedulesActivesByPeriod(start: number, end: number) {
    return this.api.getAllPeriodActive(start, end);
  }

  public getSChedulesInactivesInPeriod(start: number, end: number) {
    return this.api.getAllPeriodInactive(start, end);
  }

  public register(liveScheduleDtoRequest: LiveSchedulesDTORequest) {
    return this.api.register(liveScheduleDtoRequest);
  }
  public registerByUser(liveScheduleDtoRequest: LiveSchedulesDTORequest) {
    return this.api.registerByUser(liveScheduleDtoRequest);
  }

  public update(liveScheduleDtoRequest: LiveSchedulesDTORequest) {
    return this.api.update(liveScheduleDtoRequest);
  }

  public delete(liveScheduleDtoRequest: LiveSchedulesDTORequest) {
    return this.api.delete(liveScheduleDtoRequest);
  }

  public getAllStreamerPodeAgendar(daySchedule: number) {
    return this.api.getAllStreamerPodeAgendar(daySchedule)
  }
  public getAllStreamerAgendado(daySchedule: number) {
    return this.api.getAllStreamersSchedules(daySchedule);
  }

  public getAvailableHours(daySchedule: number) {
    return this.api.getAvailableHours(daySchedule);
  }

  public AllScheduleOfDay() {
    let daySchedule = new Date().getTime();
    return this.api.AllScheduleOfDay(daySchedule);
  }

  public getLastScheduleUser() {
    return this.api.getLastScheduleUser();
  }

  public getAllPonctuationByPeriod(start:number, end:number){
    return this.api.getAllPonctuationByPeriod(start,end);
  }
  
  public getAllPonctuationByPeriodAndUser(start:number, end:number){
    return this.api.getAllPonctuationByPeriodAndUser(start,end);
  }

}
