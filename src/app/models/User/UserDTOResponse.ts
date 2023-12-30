import { StreamersDTOResponse } from "../Streamers/StreamersDTOResponse";

export class UserDTOResponse {
    public id:string = ""
    public visible:boolean = true;
    public username = "";
    public streamersDTOResponse:StreamersDTOResponse = new StreamersDTOResponse();
    public token:string = "";
    public role = "";
}