import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../models/Categoria';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  API_URI = 'api/categorias';
  constructor( private http: HttpClient) { }

  getCategorias():Observable<Categoria>{
    return this.http.get(`${this.API_URI}`);
  }
  getCategoria(id: number){
    return this.http.get(`${this.API_URI}/${id}`)
  }
  saveCategoria(categoria : Categoria):Observable<Categoria>{
  
    return this.http.post(`${this.API_URI}`,categoria);
  }
  deleteCategoria(id:number){
    return this.http.delete(`${this.API_URI}/${id}`)
  }
  updateCategoria(id: number, categoria : Categoria):Observable<Categoria>{
    return this.http.put(`${this.API_URI}/${id}`,categoria);
  }
  encontrarCategoriaNombre(name:string){

    return this.http.get(`${this.API_URI}/find/${name}`);
  }
}
