import { StreamersDTORequest } from "../Streamers/StreamersDTORequest";

export class LiveSchedulesDTORequest {
    id: string = "";
    visible: boolean = true;
    deleted: boolean = false;
    startTime: number = 0;
    endTime: number = 0;
    streamersDTORequest: StreamersDTORequest = new StreamersDTORequest();
}