import { StreamersDTORequest } from '../Streamers/StreamersDTORequest';

export class UserDTORequest {
    public id:string = ""
    public username: string = "";
    public password: String = "";
    public streamersRequestDTO: StreamersDTORequest = new StreamersDTORequest();
    public role: string = "";

}