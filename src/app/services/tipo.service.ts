import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tipo } from '../models/Tipo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoService {
  API_URI = 'api/tipos';

  constructor(private http: HttpClient) { }
  getTipos():Observable<Tipo>{
    return this.http.get(`${this.API_URI}`);
  }
  getTipo(id: number){
    return this.http.get(`${this.API_URI}/${id}`)
  }
  saveTipo(tipo : Tipo):Observable<Tipo>{
  
    return this.http.post(`${this.API_URI}`,tipo);
  }
  deleteTipo(id:number){
    return this.http.delete(`${this.API_URI}/${id}`)
  }
  updateTipo(id: number, tipo : Tipo){
    return this.http.put(`${this.API_URI}/${id}`,tipo);
  }

}
