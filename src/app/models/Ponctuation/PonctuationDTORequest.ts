import { StreamersDTORequest } from "../Streamers/StreamersDTORequest";

export class PonctuationDTORequest{
    score:number = 0;
    streamersDTORequest:StreamersDTORequest = new StreamersDTORequest();

    constructor(score:number, streamer:StreamersDTORequest){
        this.score = score;
        this.streamersDTORequest = streamer;
    }
}