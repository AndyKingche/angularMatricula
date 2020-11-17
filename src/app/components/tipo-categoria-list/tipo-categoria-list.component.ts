import { Component, OnInit } from '@angular/core';
import { resolve } from 'url';
import { CategoriaService } from '../../services/categoria.service';
import { TipoService } from '../../services/tipo.service';
import { Categoria } from '../../models/Categoria';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-tipo-categoria-list',
  templateUrl: './tipo-categoria-list.component.html',
  styleUrls: ['./tipo-categoria-list.component.css']
})
export class TipoCategoriaListComponent implements OnInit {

  tipo : any = [];
  x = Array();
  categoria : Categoria ={

    nombre: ' ',
    descripcion: ' ',
    tipo: {id: 0}
  };
  categorias : any = [];

  constructor(private tipoService : TipoService , private categoriaService : CategoriaService) { }

  ngOnInit() {

    this.getTipoCat();
  let x = document.getElementsByName("titulo")[0];
  console.log(""+x);
  }

  getTipoCat(){

   this.tipoService.getTipos().subscribe(
      res => { 
        this.tipo = res,
        this.x.push(res)
        this.categoriaService.getCategorias().subscribe(
          res1 => {
            this.categoria = res1
          },
    
          err => console.error(err)
        );
       
      },
      err => console.error(err)
    );
      
  }
  obtenerCat(x: String){
    console.log("kkk"+x )
  }



}
