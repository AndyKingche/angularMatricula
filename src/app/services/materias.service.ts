import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Materias } from '../models/Materias';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {
  API_URI = 'api/materias' ;
  constructor( private http: HttpClient ) { }

  getMaterias(){
    return this.http.get(`${this.API_URI}`);
  }
  getMateria(id: number){
    return this.http.get(`${this.API_URI}/${id}`)
  }
  saveMateria(materia : Materias):Observable<Materias>{
  
    return this.http.post(`${this.API_URI}`,materia);
  }
  deleteMateria(id:number){
    return this.http.delete(`${this.API_URI}/${id}`)
  }
  updateMateria(id: number, materia : Materias):Observable<Materias>{
    return this.http.put(`${this.API_URI}/${id}`,materia);
  }


}
