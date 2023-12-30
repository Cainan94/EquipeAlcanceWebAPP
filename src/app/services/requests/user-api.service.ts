import { Injectable } from '@angular/core';
import { UserDTORequest } from 'src/app/models/User/UserDTORequest';
import { UserDTOResponse } from '../../models/User/UserDTOResponse';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from 'src/app/global.service';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  header = new HttpHeaders();
  private baseURL = environment.base_api_url + "/user";

  constructor(private http: HttpClient) { }

  public doLogin(user: UserDTORequest): Observable<UserDTOResponse> {
    this.header = new HttpHeaders({ "Content-Type": "application/json"});
    return this.http.post<UserDTOResponse>(this.baseURL + "/login", user, { headers: this.header });
  }

  public doRegister(user: UserDTORequest) {
    console.log(user);
    
    this.header = new HttpHeaders({ "Content-Type": "application/json", "Authorization": "Bearer " + GlobalService.user.token })

    return this.http.post<UserDTOResponse>(this.baseURL + "/register", user, { headers: this.header })
  }

  public doUpdate(user: UserDTORequest) {
    this.header = new HttpHeaders({ "Content-Type": "application/json", "Authorization": "Bearer " + GlobalService.user.token })
    return this.http.post<UserDTOResponse>(this.baseURL+"/update",user,{headers:this.header})
  }

  public getUserByUsername(username: string) {
    this.header = new HttpHeaders({ "Content-Type": "application/json", "Authorization": "Bearer " + GlobalService.user.token })
    return this.http.get<UserDTOResponse>(this.baseURL + '/' + username, { headers: this.header })
  }
  public doDelete(user:UserDTORequest){
    this.header = new HttpHeaders({ "Content-Type": "application/json", "Authorization": "Bearer " + GlobalService.user.token })
    return this.http.post<String>(this.baseURL+"/delete",user,{headers:this.header})
  }

  private createHeader() {
    if (!this.header.has("Content-Type")) {
      this.header.append("Content-Type", "application/json")
    }
  }
}
