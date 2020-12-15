import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumnos } from '../../models/Alumnos';
import { AlumnosService } from '../../services/alumnos.service';
import { Provincia } from '../../models/Provincia';
import { ProvinciaService } from '../../services/provincia.service';

import { CantonesService } from '../../services/cantones.service';
import { element } from 'protractor';
import { Console } from 'console';
import * as $1 from 'jquery';

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
  provinciaEscogida : any =[];
  cantonesEscogidosaux : any = [];
  cantonesEscogidos : any = [];
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
    provincia: {id: 0},
    cantones :{id:0,provincia:{id:0}}
  };

  cantones : any = [];
  idcanton : number = 0;
  edit: boolean = false;
  opcionseleccionado : string = '';
  numeroId : number =0;
  pe:any=null;
  constructor(private alumnosService:AlumnosService, private provinciasService: ProvinciaService, private cantonesServices: CantonesService,private router: Router,private activeroute: ActivatedRoute) {
    
   }

  ngOnInit() {
    this.cantonesEscogidosaux = null ;
    const params = this.activeroute.snapshot.params;
    console.log(params);
    if(params.id){
      this.alumnosService.getAlumno(params.id).subscribe(
        res=>{
          if(res!= null){
            console.log(res);
            this.alumnos = res; // luego ponemos eso
            this.provinciasService.getProvincia(this.alumnos.provincia.id).subscribe(
              res => {
                this.provinciaEscogida = res 
                $('#provincias').select2({
                  placeholder: this.provinciaEscogida.nombre ,
                  allowClear:true
                });
                console.log("esta es la "+this.alumnos.cantones.provincia.id);
                
              }
             , err=>("err en el ngOnit obteniendo la provincia escogida"+err)
            );
            this.idcanton = this.alumnos.cantones.id;
            this.cantonesServices.encontrarCantones(this.alumnos.cantones.provincia.id).subscribe(
              res => {
                
                this.cantones = res;

                let cantonobtenido = this.cantones.find(escogidos => { 
                  this.cantonesEscogidos.id = escogidos.id;
                return escogidos.id === this.idcanton;
                })
                console.log("cantonobtenido "+cantonobtenido);
                $('#cantones').select2({
                   
                  placeholder: cantonobtenido.nombre,
                  allowClear:true
                });
            
              }, err => console.log(err)
              
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
          this.cantones = res
          console.log("000 "+this.cantones)
        },err => console.error(err)
      );
  });

 }
  
  
  saveNewP(){ 
    let opcionProvincia = $('#provincias').val();
    let opcionCanton = $('#cantones').val();
    this.alumnos.provincia.id = opcionProvincia;
    this.alumnos.cantones.id = opcionCanton;
    console.log("idprovincia : "+ this.alumnos.provincia.id);
    console.log("idcanton : "+ this.alumnos.cantones.id);
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
        let opcionProvincia = $('#provincias').val();
        let opcionCanton = $('#cantones').val();
        this.alumnos.provincia.id = opcionProvincia;
        this.alumnos.cantones.id = opcionCanton;
        console.log("idprovincia : "+ this.alumnos.provincia.id);
        console.log("idcanton : "+ this.alumnos.cantones.id);
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
          },
          err => console.error(err)
        );
        
        
      }
   

    
    onOptionsSelected(value:string){
      console.log("the selected value is " + value);
 }


}
