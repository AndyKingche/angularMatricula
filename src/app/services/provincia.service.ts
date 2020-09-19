import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Provincia }from '../models/Provincia'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {
API_URI = 'api/provincias' ;
  constructor(private http: HttpClient) { }
    getProvincias(){
      return this.http.get(`${this.API_URI}`);
    }
    getProvincia(id: number){
      return this.http.get(`${this.API_URI}/${id}`)
    }
    saveProvincia(provincia : Provincia):Observable<Provincia>{
    
      return this.http.post(`${this.API_URI}`,provincia);
    }
    deleteProvincia(id:number){
      return this.http.delete(`${this.API_URI}/${id}`)
    }
    updateProvincia(id: number, provincia : Provincia){
      return this.http.put(`${this.API_URI}/${id}`,provincia);
    }
  
}
