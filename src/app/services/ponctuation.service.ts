import { Injectable } from '@angular/core';
import { PonctuationApiService } from './requests/ponctuation-api.service';
import { PonctuationDTORequest } from '../models/Ponctuation/PonctuationDTORequest';
import { GlobalService } from '../global.service';
import { StreamersDTORequest } from '../models/Streamers/StreamersDTORequest';

@Injectable({
  providedIn: 'root'
})
export class PonctuationService {

  constructor(private api:PonctuationApiService) { }

  sendPonctuation(points:number){
    let request = new PonctuationDTORequest(points,StreamersDTORequest.toDTO(GlobalService.user.streamersDTOResponse));
    return this.api.sendPonctuation(request);
  }
}
