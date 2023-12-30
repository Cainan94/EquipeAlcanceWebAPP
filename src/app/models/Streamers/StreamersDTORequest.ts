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
}