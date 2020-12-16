import { Component, HostBinding, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Categoria } from '../../models/Categoria';
import { Alumnos } from '../../models/Alumnos';
import { AlumnosService } from '../../services/alumnos.service';
import { CategoriaService } from '../../services/categoria.service';
import { TipoService } from '../../services/tipo.service';
import { Tipo } from '../../models/Tipo'
import {ActivatedRoute, Router } from '@angular/router';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Input } from '@angular/core';

declare let $: any;
@Component({
  selector: 'app-tipo-categoria-form',
  templateUrl: './tipo-categoria-form.component.html',
  styleUrls: ['./tipo-categoria-form.component.css']
})
export class TipoCategoriaFormComponent implements OnInit {
  @HostBinding('class') clasess ='row';

  aumentarTipo: number = 0;
  aumentarTipoX: number = 0;
  buttonValido: boolean;
  formCategoria: FormGroup;
  formAlumno : FormControl;
  categoria : Categoria={
    id:0,
    nombre:'',
    descripcion:'',
    tipo:[{nombre:'',descripcion:'',alumno:{id:0}}]
  }
  categoriaux : Categoria={
    id:0,
    nombre:'',
    descripcion:'',
    tipo:[{nombre:'',descripcion:'', alumno:{id:0}}]
  }
  categoriaux2 : any={
    id:0,
    nombre:'',
    descripcion:'',
    tipo:[{nombre:'',descripcion:'', alumno:{id: 0}}]
  }
  private contador : number;
  editar: boolean = false;
  id: number =0;
  idTipo: number =0;
  tipo:any = {nombre:'',descripcion:'',alumno:{id: 0}};
  conteliminar : number=0;
  alumno : any=[];
  alumnoEscogido : any = [];
  contadores : number = 0;
  constructor(private tipoService:TipoService, private fb: FormBuilder, private categoriaService: CategoriaService, private router:Router, private activeRouter: ActivatedRoute, private alumnosService: AlumnosService) { }

  ngOnInit() {
  
    this.contador=0;
    if(!this.editar){
    this.formCategoria = this.fb.group({
    nombre: '',
    descripcion: '',
    tipo: this.fb.array([]),
    });

  
  }
    
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
         this.imprimirTipo(this.categoriaux);
         this.editar = true;
          }else{
            console.log("no hay el parametro")
            this.router.navigate(['/tipo-categoria']);
          }
    },err => console.error("err"+err));

  }
  
}
ngAfterViewInit(){
  $('#id').on('change', (event) => {
    var symbolSelected= event.target.value;
    //you can use the selected value
    console.log(""+symbolSelected)
   
});
}

  anadirTipo() {
    this.alumnosService.getAlumnos().subscribe(
      res => { this.alumno = res},err => console.error("err "+err)
    );
    
    (this.formCategoria.controls['tipo'] as FormArray).push(this.fb.group({
      nombre: '',
      descripcion: '',
      alumno: this.fb.control({
        id:0
      })
    }));  
  }
  idAlumno(){
    return this.fb.group({
      id:this.alumno
    });
  }

  imprimirTipo(categorys: Categoria){
    this.formCategoria = this.fb.group({
      nombre: categorys.nombre,
      descripcion: categorys.descripcion,
      tipo: this.fb.array([]),
      id: this.fb.array([])
      });
      this.contador=0;
    while(this.contador<categorys.tipo.length){
      (this.formCategoria.controls['tipo'] as FormArray).push(this.fb.group({
        
        nombre: categorys.tipo[this.contador].nombre,
        descripcion: categorys.tipo[this.contador].descripcion
        // alumno : (this.formCategoria.controls['id'] as FormArray).push(this.fb.group({
        //   id:
        // }))
      }));
    
      this.contador++;
     }
     this.contador=0;
  }
  
  reloaded(){
   this.ngOnInit();
  }


  eliminarTipo(index: number) {
    this.categoria = Object.assign({}, this.formCategoria.value);
    (this.formCategoria.controls['tipo'] as FormArray).removeAt(index);
  }

  saveNewCategoria() {

    this.categoriaux2 = Object.assign({}, this.formCategoria.value);
    this.categoria.nombre = this.categoriaux2.nombre;
   
    this.categoria.descripcion = this.categoriaux2.descripcion;
    this.categoria.id = null;
    console.log(this.categoriaux2.tipo.length) 
    this.categoriaux2.tipo = this.categoriaux2.tipo.map(nuevocategoria => {
      
      this.categoria.tipo = this.categoria.tipo.map(categorianueva=>{
        let auxiliar =0;
        categorianueva.nombre = nuevocategoria.nombre;
        categorianueva.descripcion = nuevocategoria.descripcion;
        console.log(nuevocategoria.alumno)
        categorianueva.alumno.id = Number(nuevocategoria.alumno);
        auxiliar++;
        console.table(categorianueva)
        return categorianueva;
      })
      console.table(this.categoria.tipo)
      return this.categoria.tipo;
    })
    
    console.table(this.categoriaux2)
    this.categoriaService.saveCategoria(this.categoria).subscribe(res => {
      
    },err=>console.error(err));

  }


  actualizarCategoria(){
    this.categoria = Object.assign({}, this.formCategoria.value);
    console.table(this.categoria.tipo);

      this.categoriaService.updateCategoria(this.id,this.categoria).subscribe(res => {
        while(this.idTipo<this.categoria.tipo.length){
          this.aumentarTipo = this.categoriaux.tipo[this.idTipo] !=null ? this.categoriaux.tipo[this.idTipo].id : -1;
          
          console.log("dato nombre"+this.categoria.tipo[this.idTipo].nombre);
          console.log("dato des"+this.categoria.tipo[this.idTipo].descripcion);
          console.log("id categoria"+this.id);
          console.log("id del tipo obtenido del nuevo formulario "+ this.aumentarTipo )
          this.tipoService.actulaizarTipo(this.aumentarTipo, this.id, this.categoria.tipo[this.idTipo]).subscribe(
            res=>{
              console.log("res"+res)
            },err=>console.error("--",err)
          );
  
          this.idTipo++;
          }
        this.idTipo=0;
      },err=>console.error("ERROR ",err));
    
  }
  eliminarTipoBDD(i:number)
  {
    this.conteliminar+=i;
   // console.log("id del tipo que se va a borrar "+this.categoriaux.tipo[i].id)
    
    if(this.categoriaux.tipo[this.conteliminar]!=null){

      this.tipoService.deleteTipo(this.categoriaux.tipo[this.conteliminar].id).subscribe(
        res=>{
          console.log("se ha elimino"+ res);
          this.eliminarTipo(i);
          
         
               this.conteliminar++;
        
        },err=>console.log("no se elimino "+err)
      );

    }else{
      this.eliminarTipo(i);
      
    }
      


  }
  

  
}
