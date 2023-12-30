export class StreamersDTOTable {
    posicao: number = 0
    nome: string = "";
    ultima_stream: string = "";

    constructor(posicao?: number, nome?: string, ultima_stream?: string) {
        this.posicao = posicao || 0;
        this.nome = nome || "";
        this.ultima_stream = ultima_stream || "";

    }
}