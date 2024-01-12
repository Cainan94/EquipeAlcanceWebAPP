import { StreamersDTOResponse } from "./StreamersDTOResponse";

export class StreamersDTORequest {
    public id: string = ""
    public visible: boolean = true;
    public twitchName: string = "";
    public birthday: number = 0;

    static getModelWithUser(twitchName: string) {
        let ret = new StreamersDTORequest()
        ret.twitchName = twitchName;
        return ret;
    }

    static toDTO(response: StreamersDTOResponse) {
        let result = new StreamersDTORequest();
        result.birthday = response.birthday
        result.id = response.id
        result.twitchName = response.twitchName
        result.visible = response.visible
        return result;
    }
}