import { Component, HostBinding, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Categoria } from 'src/app/models/Categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { TipoService } from '../../services/tipo.service';
import { Tipo } from '../../models/Tipo'
import {ActivatedRoute, Router } from '@angular/router';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
@Component({
  selector: 'app-tipo-categoria-form',
  templateUrl: './tipo-categoria-form.component.html',
  styleUrls: ['./tipo-categoria-form.component.css']
})
export class TipoCategoriaFormComponent implements OnInit {
  @HostBinding('class') clasess ='row';

  aumentarTipo: string;
  buttonValido: boolean;
  formCategoria: FormGroup;
  categoria : Categoria={
    id:0,
    nombre:'',
    descripcion:'',
    tipo:[{nombre:'',descripcion:'',categoria:{id:0}}]
  }
  categoriaux : Categoria={
    id:0,
    nombre:'',
    descripcion:'',
    tipo:[{nombre:'',descripcion:'',categoria:{id:0}}]
  }
  contador : number;
  editar: boolean = false;
  id: number =0;
  idTipo: number =0;
  
  constructor(private tipoService:TipoService, private fb: FormBuilder, private categoriaService: CategoriaService, private router:Router, private activeRouter: ActivatedRoute) { }

  ngOnInit() {
    this.contador=0;
    this.formCategoria = this.fb.group({
    nombre: '',
    descripcion: '',
    tipo: this.fb.array([])
    });
    const params = this.activeRouter.snapshot.params;
    if(params.id){
      this.categoriaService.getCategoria(params.id).subscribe(
        res=>{
          console.log(res);
          if(res!=null){
            console.log(res);
          this.categoriaux = res;
          this.id = this.categoriaux.id;
          
          console.log("cate",this.categoriaux.id)
         while(this.contador<this.categoriaux.tipo.length){
          (this.formCategoria.controls['tipo'] as FormArray).push(this.fb.group({
            
            nombre: this.categoriaux.tipo[this.contador].nombre,
            descripcion: this.categoriaux.tipo[this.contador].descripcion
          }));
        
          this.contador++;
         }
         this.contador=0;
         this.editar = true;
          }else{
            console.log("no hay el parametro")
            this.router.navigate(['/tipo-categoria']);
          }
    },err => console.error("err"+err));

  }
}

  anadirTipo() {
    (this.formCategoria.controls['tipo'] as FormArray).push(this.fb.group({
      nombre: '',
      descripcion: ''
    }));
  
    
  }
  eliminarTipo(index: number) {
    (this.formCategoria.controls['tipo'] as FormArray).removeAt(index);
  }

  saveNewCategoria() {
    this.categoria = Object.assign({}, this.formCategoria.value);
    console.table(this.categoria);
    this.categoriaService.saveCategoria(this.categoria).subscribe(res => {
    },err=>console.error(err));
  }

  actualizarCategoria(){
    this.categoria = Object.assign({}, this.formCategoria.value);
    console.table(this.categoria.tipo);
    console.log("",this.id)
    this.categoriaService.updateCategoria(this.id,this.categoria).subscribe(res => {
      while(this.idTipo<this.categoriaux.tipo.length){
        this.categoria.tipo[this.idTipo] = this.categoriaux.tipo[this.idTipo];
        
        console.log("ide del tipo"+this.categoria.tipo[this.idTipo].id)
        console.log("datos"+this.categoria.tipo[this.idTipo].nombre)
        
        this.tipoService.actulaizarTipo(this.categoria.tipo[this.idTipo].id, this.id, this.categoria.tipo[this.idTipo]).subscribe(
          res=>{
            console.log("res"+res)
          },err=>console.error("--",err)
        );
        this.idTipo++;
        }
      this.idTipo=0;
      
    },err=>console.error("ERROR ",err));
  }
}
