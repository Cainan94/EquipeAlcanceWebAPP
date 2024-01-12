import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenRequestTwitch } from '../models/Twitch/TokenRequestTwitch';
import { TokenResponseTwitch } from '../models/Twitch/TokenResponseTwitch';
import { StreamsResponseTwitch } from '../models/Twitch/StreamsResponseTwitch';

@Injectable({
  providedIn: 'root'
})
export class TwitchAPIServiceService {

  private BASE_URL_REQUEST = "https://api.twitch.tv/helix/"
  private BASE_URL_TOKEN = "https://id.twitch.tv/oauth2/token";

  constructor(private http: HttpClient) { }

  private async getToken() {
    let tokenRequest = new TokenRequestTwitch();
    const body = new HttpParams()
      .set("client_id", tokenRequest.getClient_id())
      .set("client_secret", tokenRequest.getClient_secret())
      .set("grant_type", tokenRequest.getGrant_type())

    return await this.http.post<TokenResponseTwitch>(this.BASE_URL_TOKEN, body.toString());
  }


  async StreamIsOnlineAsync(twitchName: string) {
    if (twitchName == null || twitchName.trim().length < 1) {
      return false;
    }
    if(await this.checkStreamerOnline(twitchName)){
      return true;
    }
    return false;
  }

  private getHeaderAuthentication(tokenResponse:TokenResponseTwitch): HttpHeaders {
    let tokenRequest = new TokenRequestTwitch();
    return new HttpHeaders({
      'Authorization': 'Bearer ' + tokenResponse.access_token,
      "Client-Id": tokenRequest.getClient_id(),
    });
  }

  checkCurrentStreamAsync(streShowing:string , currentStre:string){
    if(streShowing.toLocaleLowerCase() == currentStre.toLocaleLowerCase()){
      return true;
    }
    return false;
  }


  private async checkStreamerOnline(twitchName:string){

    let tokenResponse = new TokenResponseTwitch();
    (await this.getToken()).subscribe(resultToken=>{
      tokenResponse = resultToken;
    });

    if(tokenResponse.access_token!=null){
      let url = this.BASE_URL_REQUEST + "streams?user_login=" + twitchName;
      let resultTwitch = new StreamsResponseTwitch();
      await this.http.get<StreamsResponseTwitch>(url, { headers: this.getHeaderAuthentication(tokenResponse) }).subscribe(result=>{
        resultTwitch = result;
      });
      if(resultTwitch!=null && resultTwitch.data.length > 0){
        return true
      }
    }
    return false;
  }
}
