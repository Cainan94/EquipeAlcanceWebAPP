import { Injectable } from '@angular/core';
import { StreamerApiService } from './requests/streamer-api.service';

@Injectable({
  providedIn: 'root'
})
export class StreamersService {

  constructor(private api: StreamerApiService) { }

  public getAllStreamersAtivos(){
    return this.api.getAllAtivoStreamer()
  }
}
