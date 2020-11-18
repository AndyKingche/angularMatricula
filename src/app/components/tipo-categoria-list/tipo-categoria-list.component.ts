import { Component, Input, OnInit } from '@angular/core';
import { resolve } from 'url';
import { CategoriaService } from '../../services/categoria.service';
import { TipoService } from '../../services/tipo.service';
import { Categoria } from '../../models/Categoria';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Tipo } from 'src/app/models/Tipo';
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
  tipo : any =[];
  lista = Array();
  categorias : any=[];

  constructor(private tipoService : TipoService , private categoriaService : CategoriaService) { }

  ngOnInit() {

    this.getTipoCat(); 
    
  }

  getTipoCat(){
    this.categoriaService.getCategorias().subscribe(
      res=>{this.categorias = res
        for(let x in this.categorias){
          this.nombrecollpase = x;
        }
      },err=>console.log("err",err)
    );    
  }

  obtenerTipo(id: number){
    console.log("este es el id"+ id)
    this.tipoService.encontrarCategoria(id).subscribe(
      res=>{
        this.tipo = res
        console.log("",this.tipo)
    },err=>console.error("err",err)
    );
    this.tipo = [];
    
  }



}
