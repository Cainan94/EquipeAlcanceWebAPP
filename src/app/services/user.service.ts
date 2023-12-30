import { Injectable } from '@angular/core';
import { UserApiService } from './requests/user-api.service';
import { Router } from '@angular/router';
import { UserDTORequest } from '../models/User/UserDTORequest';
import { UserDTOResponse } from '../models/User/UserDTOResponse';
import { GlobalService } from '../global.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private userApi: UserApiService) { }

    login(login: string, password: string){

        let user: UserDTORequest = new UserDTORequest();
        user.password = btoa(password);
        user.username = login;
        return this.userApi.doLogin(user);
    }

    register(user:UserDTORequest){
       return this.userApi.doRegister(user);
    }

    update(user:UserDTORequest){
        return this.userApi.doUpdate(user);
    }

    getByUsername(username:string){
        return this.userApi.getUserByUsername(username);
    }

    delete(user:UserDTORequest){
        return this.userApi.doDelete(user)
    }
}
