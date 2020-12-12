import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumnos } from '../../models/Alumnos';
import { AlumnosService } from '../../services/alumnos.service';
import { Provincia } from '../../models/Provincia';
import { ProvinciaService } from '../../services/provincia.service';

import { CantonesService } from '../../services/cantones.service';
import { element } from 'protractor';
import { Console } from 'console';

declare let $: any;

@Component({
  selector: 'app-alumnos-form',
  templateUrl: './alumnos-form.component.html',
  styleUrls: ['./alumnos-form.component.css']
})
export class AlumnosFormComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  provincias :  any=[];
  selectDivece : string;
 // public options: Options;
  provinciaEscogida : any =[];
  alumnos : Alumnos ={
    id: 0,
    nombre: '',
    apellido: '',
    cedula: '',
    fechanacimiento: '',
    edad: 0,
    direccion:'',
    telefono:'',
    grado:'',
    numeromatricula:0,
    provincia: {id: 0}
  };

  cantones : any = [];
  cantonesEscogidos : any = [];
  edit: boolean = false;
  opcionseleccionado : string = '';
  numeroId : number =0;
  pe:any=null;
  constructor(private alumnosService:AlumnosService, private provinciasService: ProvinciaService, private cantonesServices: CantonesService,private router: Router,private activeroute: ActivatedRoute) {
    
   }

  ngOnInit() {
  
    const params = this.activeroute.snapshot.params;
    console.log(params);
    if(params.id){
      this.alumnosService.getAlumno(params.id).subscribe(
        res=>{
          if(res!= null){
            console.log(res);
            this.alumnos = res; // luego ponemos eso
            this.provinciasService.getProvincia(this.alumnos.provincia.id).subscribe(
              res => {this.provinciaEscogida =res 
                $('#provincias').select2({
                  placeholder: this.provinciaEscogida.nombre ,
                  allowClear:true
                });
              }
             , err=>("err en el ngOnit obteniendo la provincia escogida"+err)
            );
            this.edit = true;

          }else{
            this.router.navigate(['/alumnos']);
          }
          
        },
        err => console.log("hay error "+ err)
      )
    }
    this.getAlumno();
    this.imprimir(1);
    $('#provincias').select2({
      placeholder: "Seleccione una opcion....",
      allowClear:true,
    
    });
    $('#cantones').select2({
      placeholder: "Seleccione una opcion....",
      allowClear:true,
    
    });
   
     
  }
  ngAfterViewInit(){
    $('#provincias').on('change', (event) => {
      var symbolSelected= event.target.value;
      //you can use the selected value
      console.log(""+symbolSelected)
      this.cantonesServices.encontrarCantones(symbolSelected).subscribe(
        res => {
          this.cantones=res
        },err => console.error(err)
      );
  });

 }
  
  
  saveNewP(){ 
    let opcion=$('select').val();
    this.alumnos.provincia.id = opcion;
    console.log("id : "+ this.alumnos.provincia.id);
        this.alumnosService.saveAlumno(this.alumnos).subscribe(
          res => {
            console.log("res : "+ res);
            //this.router.navigate(['/provincia']);
            this.alumnos.nombre= '',
            this.alumnos.apellido= '',
            this.alumnos.cedula= '',
            this.alumnos.fechanacimiento= '',
            this.alumnos.edad= 0,
            this.alumnos.direccion='',
            this.alumnos.telefono='',
            this.alumnos.grado='',
            this.alumnos.numeromatricula=0,
            this.alumnos.provincia= {id: 0}
          },
          err => console.log("err : "+ err)
        );
      }
      onChange(deviceValue) {
       this.selectDivece= deviceValue;
       console.log("... "+this.selectDivece)
    }
  
      updateP(){
        let opcion=$('select').val();
        this.alumnos.provincia.id = opcion;
        this.alumnosService.updateAlumno(this.alumnos.id,this.alumnos).subscribe(
          res => {
            console.log("res: "+res);
            this.alumnos.nombre= '',
            this.alumnos.apellido= '',
            this.alumnos.cedula= '',
            this.alumnos.fechanacimiento= '',
            this.alumnos.edad= 0,
            this.alumnos.direccion='',
            this.alumnos.telefono='',
            this.alumnos.grado='',
            this.alumnos.numeromatricula=0,
            this.alumnos.provincia= {id: 0}
          },
          err => console.log("err: "+err)
        )
        console.log(this.alumnos);
      }

      getAlumno(){
        
        this.provinciasService.getProvincias().subscribe(
          res => {
            this.provincias = res;
          for(let x of this.provincias){
              // this.exampleData=[x];
              // console.log(this.exampleData)
            // this.options = {
            //   theme: 'classic',closeOnSelect: true,width: '300'
            // }
            }
            
          },
          err => console.error(err)
        );
        
        //console.log("estoy en getAlumnos "+this.provinciaSelect());
      }
   
    //   provinciaSelect():any{
        
    //     let selectedProvincia = $("#provincias").val();
    //     this.numeroId = Number(selectedProvincia);
    //     console.log("este es el numero "+this.numeroId)
    //  this.imprimirC = () => {
    //    this.cantonesServices.encontrarCantones(this.numeroId).subscribe(
    //      res => { this.cantones =res},
    //      err => console.error(err)     
    //    );
    //   console.log("si existo"+this.numeroId);
    //   console.log("sii")
    //  };
    //  this.imprimirC()
     
    //  return this.numeroId;
    // }

    imprimir(n:any){

      console.log("este es el numero"+ n);
      
       
    }
    
    onOptionsSelected(value:string){
      console.log("the selected value is " + value);
 }


}
