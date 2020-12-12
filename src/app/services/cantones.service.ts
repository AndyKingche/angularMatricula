import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cantones }from '../models/Cantones'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CantonesService {
API_URI = 'api/cantones';
  constructor( private http: HttpClient ) { }
  getCantones(){
    return this.http.get(`${this.API_URI}`);
  }
  getCanton(id: number){
    return this.http.get(`${this.API_URI}/${id}`)
  }
  saveCantones(cantones : Cantones):Observable<Cantones>{
  
    return this.http.post(`${this.API_URI}`,cantones);
  }
  deleteCantones(id:number){
    return this.http.delete(`${this.API_URI}/${id}`)
  }
  updateCantones(id: number, cantones : Cantones){
    return this.http.put(`${this.API_URI}/${id}`,cantones);
  }
  encontrarCantones(id:number):Observable<Cantones>{
    return this.http.get(`${this.API_URI}/provincia/${id}`);
  }
}
