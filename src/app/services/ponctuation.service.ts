import { Injectable } from '@angular/core';
import { PonctuationApiService } from './requests/ponctuation-api.service';

@Injectable({
  providedIn: 'root'
})
export class PonctuationService {

  constructor(private api:PonctuationApiService) { }

  public getAllPonctuationByPeriod(start:number, end:number){
    return this.api.getAllPonctuationByPeriod(start,end);
  }
  public getAllPonctuationByPeriodAndUser(start:number, end:number){
    return this.api.getAllPonctuationByPeriodAndUser(start,end);
  }
}
