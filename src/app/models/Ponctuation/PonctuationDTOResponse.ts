import { StreamersDTOResponse } from "../Streamers/StreamersDTOResponse";

export class PonctuactionDTOResponse {
    id: String = "";
    score: number = 0.0;
    isregistered: boolean = true;
    date:number = 0;
    streamer: StreamersDTOResponse = new StreamersDTOResponse();
}