import { Component, Input, OnInit } from '@angular/core';
import { resolve } from 'url';
import { CategoriaService } from '../../services/categoria.service';
import { TipoService } from '../../services/tipo.service';
import { Categoria } from '../../models/Categoria';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Tipo } from 'src/app/models/Tipo';
import { ɵAnimationGroupPlayer } from '@angular/animations';
declare let $: any;
@Component({
  selector: 'app-tipo-categoria-list',
  templateUrl: './tipo-categoria-list.component.html',
  styleUrls: ['./tipo-categoria-list.component.css']
})
export class TipoCategoriaListComponent implements OnInit {
  @Input() public lead: Tipo;
  @Input() public index;
  public nombrecollpase : string;
  numeroTipo : any=[];
  tipo : any =[];
  lista = Array();
  categorias : any=[];
  buscarCategoria: string;

  constructor(private tipoService : TipoService , private categoriaService : CategoriaService) { }

  ngOnInit() {

    this.getCat(); 
    this.buscarCategoria = '';
  }

  getCat(){
    this.categoriaService.getCategorias().subscribe(
      res=>{this.categorias = res
    
      },err=>console.log("err",err)
    );    
  }

  obtenerTipo(id: number){
    console.log("este es el id"+ id)
    this.tipoService.encontrarCategoria(id).subscribe(
      res=>{
        this.tipo = res
        console.log("",this.tipo);
      
    },err=>console.error("err",err)
    );
    this.tipo = [];
    
  }

  buscarCategoriaNombre(){
    if(this.buscarCategoria.length !=0 ){
      this.categoriaService.encontrarCategoriaNombre(this.buscarCategoria).subscribe(
        res=>{
          this.categorias=res
        },
        err=>console.error("error en buscar categoria por nombre"+ err)
      );

    }
  }

  vacio(esVacio:any){
    if(esVacio.length ==0){
      this.getCat();
    }
  }



}
