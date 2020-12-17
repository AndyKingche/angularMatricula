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
  categoriaux3 : any={
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
  mensage : any=[];
  cont : number =0 ;
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
 // this.mensage = "Seleccione uno.."
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
 
  $('#id').select2({  
    tags: "true",           
    allowClear:true,
    data: this.getAlumno()
  }); 
  












}

  anadirTipo() {
    this.mensage[this.cont]="Seleccione una opcion";
    //this.getAlumno();
    (this.formCategoria.controls['tipo'] as FormArray).push(this.fb.group({
      nombre: '',
      descripcion: '',
      alumno: this.fb.control({
        id:0
      })
    }));  
   this.cont++;
  }
 

  imprimirTipo(categorys: Categoria){
   
    this.formCategoria = this.fb.group({
      nombre: categorys.nombre,
      descripcion: categorys.descripcion,
      tipo: this.fb.array([]),
      });
      this.contador=0;
      
    while(this.contador<categorys.tipo.length){
      this.alumnosService.getAlumno(categorys.tipo[this.contador].alumno.id).subscribe(
        res => {
          this.alumnoEscogido=res
        
        }, err => console.error("error "+err)
      );
      (this.formCategoria.controls['tipo'] as FormArray).push(this.fb.group({
        
        nombre:categorys.tipo[this.contador].nombre,
          descripcion:categorys.tipo[this.contador].descripcion,
          alumno:this.fb.control({
            id:categorys.tipo[this.contador].alumno.id
          })
      
      }));
      this.mensage[this.contador]=categorys.tipo[this.contador].alumno.nombre+" "+categorys.tipo[this.contador].alumno.apellido;
          console.log(this.alumnoEscogido);
          console.log(this.mensage[this.contador]);
      this.contador++;
      
     }
     
     this.contador=0;
  }
  
  eliminarTipo(index: number) {
    this.categoria = Object.assign({}, this.formCategoria.value);
    (this.formCategoria.controls['tipo'] as FormArray).removeAt(index);
    this.cont--;
    if(this.cont < 0){
      this.cont = 0;
    }
  }

  saveNewCategoria() {
    this.categoriaux2 = Object.assign({}, this.formCategoria.value);
    this.categoria.nombre = this.categoriaux2.nombre; 
    this.categoria.descripcion = this.categoriaux2.descripcion;
    this.categoria.id = null;
    for(let i = 0 ; i < this.categoriaux2.tipo.length ; i++){
      this.categoria.tipo[i] = {
        nombre:this.categoriaux2.tipo[i].nombre,
        descripcion:this.categoriaux2.tipo[i].descripcion,
        alumno:{id:Number(this.categoriaux2.tipo[i].alumno)}};
      }
    console.table(this.categoria)
    this.categoriaService.saveCategoria(this.categoria).subscribe(res => {
      this.cont=0;
    },err=>console.error(err));

  }

  actualizarCategoria(){
    this.categoriaux3 = Object.assign({}, this.formCategoria.value);
    
    this.categoria.nombre = this.categoriaux3.nombre; 
    this.categoria.descripcion = this.categoriaux3.descripcion;
    this.categoria.id = null;
    
    for(let i =0 ; i<this.categoriaux3.tipo.length;i++){
      if(typeof this.categoriaux3.tipo[i].alumno == 'object'){
        this.categoria.tipo[i] = {
          nombre:this.categoriaux3.tipo[i].nombre,
          descripcion:this.categoriaux3.tipo[i].descripcion,
          alumno:{id:Number(this.categoriaux3.tipo[i].alumno.id)}};
      }else{
        this.categoria.tipo[i] = {
          nombre:this.categoriaux3.tipo[i].nombre,
          descripcion:this.categoriaux3.tipo[i].descripcion,
          alumno:{id:Number(this.categoriaux3.tipo[i].alumno)}};
      }

    }
    console.table(this.categoria)
      this.categoriaService.updateCategoria(this.id,this.categoria).subscribe(res => {
        while(this.idTipo<this.categoria.tipo.length){
          
          this.aumentarTipo = this.categoriaux.tipo[this.idTipo] !=null ? this.categoriaux.tipo[this.idTipo].id : -1;
         
          this.tipoService.actulaizarTipo(this.aumentarTipo, this.id,this.categoria.tipo[this.idTipo].alumno.id,this.categoria.tipo[this.idTipo]).subscribe(
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

  getAlumno(){
    this.alumnosService.getAlumnos().subscribe(
      res => { this.alumno = res},err => console.error("err "+err)
    );
    
  }
  
}
