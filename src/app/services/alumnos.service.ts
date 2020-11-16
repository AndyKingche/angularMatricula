import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Alumnos } from '../models/Alumnos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  API_URI = 'api/alumnos';
  
  constructor( private http: HttpClient) { 
    
  }
  getAlumnos(){
    
    return this.http.get(`${this.API_URI}`);
    
  }
  getAlumno(id: number){
    return this.http.get(`${this.API_URI}/${id}`)
  }
  saveAlumno(alumnos : Alumnos):Observable<Alumnos>{
  
    return this.http.post(`${this.API_URI}`,alumnos);
  }
  deleteAlumno(id:number){
    return this.http.delete(`${this.API_URI}/${id}`)
  }
  updateAlumno(id: number, alumnos : Alumnos){
    return this.http.put(`${this.API_URI}/${id}`,alumnos);
  }
  encontrarAlumno(name: string){
    
    return this.http.get(`${this.API_URI}/find/${name}`);
  }
}
