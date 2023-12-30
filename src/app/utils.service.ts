import { Injectable } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { min } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  static dateToString(date: any): string {
    let dateObj = new Date(date);
    return dateObj.toLocaleDateString();
  }

  static getTimeHoursToString(timestamp: number): string {
    let date = new Date(timestamp);

    let data: string = "" + date.getDate() + "/" + (date.getMonth() + 1) + "/" + (date.getFullYear()) + " - "

    if (date.getHours() == 0) {
      if (date.getMinutes() == 0) {
        return data + "00:00";
      }
      else {
        return data + "00:" + date.getMinutes();
      }
    } else {
      if (date.getMinutes() == 0) {
        return data + date.getHours() + ":00";
      }
      else {
        return data + date.getHours() + ":" + date.getMinutes();
      }
    }
  }

  static getIdade(date: Date): number {


    let now = new Date, ano_atual = now.getFullYear(),
      mes_atual = now.getMonth() + 1,
      dia_atual = now.getDate();

    try {
      let ano_aniversario = date.getUTCFullYear();
      let mes_aniversario = date.getUTCMonth();
      let dia_aniversario = date.getDay();

      let idade = ano_atual - ano_aniversario;

      if (mes_atual <= mes_aniversario && dia_atual < dia_aniversario) {
        idade--;
      }
      console.log(idade);

      return idade < 0 ? 0 : idade;
    } catch (e) {
      console.log("Falha ao verificar a data: " + e);
      throw e;
    }
  }
  
}
