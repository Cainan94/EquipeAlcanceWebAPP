import { StreamersAgendamentoTable } from "../Streamers/StreamersAgendamentoTable";

export class LiveScheduleTable {
    dataAgendamento: String = "";
    streamers:Array<StreamersAgendamentoTable> = new Array();

    constructor(dataAgendamento: String){
        this.dataAgendamento =  "Agendamentos do dia " +dataAgendamento;
    }
}