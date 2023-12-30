import { StreamersDTOResponse } from '../Streamers/StreamersDTOResponse';
export class LiveSchedulesDTOResponse {
    id: string = "";
    visible: boolean = true;
    deleted: boolean = false;
    startTime: number = 0;
    endTime: number = 0;
    streamersDTOResponse: StreamersDTOResponse = new StreamersDTOResponse();
}