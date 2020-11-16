import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profesor } from '../models/Profesor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfesoresService {
  API_URI = 'api/profesores' ;
  constructor(private http: HttpClient) { }

  getProfesores(){
    return this.http.get(`${this.API_URI}`);
  }
  getProfesor(id: number){
    return this.http.get(`${this.API_URI}/${id}`)
  }
  saveProfesor(profesor : Profesor):Observable<Profesor>{
  
    return this.http.post(`${this.API_URI}`,profesor);
  }
  deleteProfesor(id:number){
    return this.http.delete(`${this.API_URI}/${id}`)
  }
  updateProfesor(id: number, profesor : Profesor){
    return this.http.put(`${this.API_URI}/${id}`,profesor);
  }
  encontrarProfesor(name: string){
    return this.http.get(`${this.API_URI}/find/${name}`);
  }

}
