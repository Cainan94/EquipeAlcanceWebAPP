import { PonctuactionDTOResponse } from "./PonctuationDTOResponse";

export class PonctuationDTOTable{
    date:String = "";
    pontuacaoes:PonctuactionDTOResponse[] = new Array<PonctuactionDTOResponse>();

    constructor(date:String){
        this.date = "Data da pontuação - "+date
    }
}