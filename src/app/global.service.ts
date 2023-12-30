import { Injectable } from '@angular/core';
import { UserDTOResponse } from './models/User/UserDTOResponse';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }

  public static user: UserDTOResponse
  public static logo = "assets/Alcance_20231228_133324_0000.png";
  public static productName = "CAJS Lurk"
  public static menuVisible = true;

    public static userLogged(): boolean {
        if (this.user != null && this.user.token.trim().length > 0){
            return true;
        }
        return false;
    }
    public static userLoggedIsADM(){
      if (this.user != null && this.user.token.trim().length > 0){
        if(this.user.role.match("Admin")){
          return true;
        }
      }
      return false
    }
}
