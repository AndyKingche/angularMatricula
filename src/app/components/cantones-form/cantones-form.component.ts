import { Component, ElementRef, HostBinding, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { Cantones } from 'src/app/models/Cantones';
import {ActivatedRoute, Router } from '@angular/router';
import { CantonesService } from '../../services/cantones.service';
import { ProvinciaService } from '../../services/provincia.service'
import { SelectorContext } from '@angular/compiler';
import { Provincia } from 'src/app/models/Provincia';
import { ProvinciaFromComponent } from '../provincia-from/provincia-from.component';
import { FormsModule, NgSelectOption } from '@angular/forms';
import { Reference } from '@angular/compiler/src/render3/r3_ast';
import { HAMMER_LOADER } from '@angular/platform-browser';

declare let $: any;


@Component({
  selector: 'app-cantones-form',
  templateUrl: './cantones-form.component.html',
  styleUrls: ['./cantones-form.component.css']
})
export class CantonesFormComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  provincias :  Provincia;
  provinciaEscogida : any =[];
  selectDivece : string;
  cantones : Cantones ={
    nombre: '',
    descripcion: '',
    provincia: {id: 0}
  };
  
  edit: boolean = false;

  constructor( private provinciaService: ProvinciaService,private cantonesService: CantonesService, private router: Router,private activeroute: ActivatedRoute) { }
   
  ngOnInit() {
    const params = this.activeroute.snapshot.params;
    console.log(params);
    if(params.id){
      this.cantonesService.getCanton(params.id).subscribe(
        res=>{
          if(res!= null){
            console.log(res);
            this.cantones = res; // luego ponemos eso
            console.log("---"+this.cantones.provincia.id);
            this.provinciaService.getProvincia(this.cantones.provincia.id).subscribe(
              res => {
                this.provinciaEscogida = res
                console.log("---"+this.provinciaEscogida.nombre);
                $('.js-example-placeholder-single').select2({
                  placeholder: this.provinciaEscogida.nombre,
                  allowClear:true
                });
                
              },
              err => console.log("error "+err)
            );
            this.edit = true;
          }else{
            this.router.navigate(['/cantones']);
          }
          
        },
        err => console.log("hay error "+ err)
      )
    }
    this.getProvincia();
    $('.js-example-placeholder-single').select2({
      placeholder: "Seleccione una opcion....",
      allowClear:true
    });

    
    
  }
  saveNewP(){
    let opcion=$('select').val();
    this.cantones.provincia.id = opcion;
    console.log(",,,",this.cantones.provincia.id)
    this.cantonesService.saveCantones(this.cantones).subscribe(
      res => {
        console.log("res : "+ res);
        //this.router.navigate(['/provincia']);
        this.cantones.nombre=' ';
        this.cantones.provincia={id:0};
        this.cantones.descripcion = ' ';
      },
      err => console.log("err : "+ err)
    );
  }

  updateP(){
    let opcion=$('select').val();
    this.cantones.provincia.id = opcion;
    console.log("",this.cantones.id)
    this.cantonesService.updateCantones(this.cantones.id,this.cantones).subscribe(
      res => {
        console.log("res: "+res);
        this.cantones.nombre=' ';
        this.cantones.provincia= {id: 0};
        this.cantones.descripcion = ' ';
      },
      err => console.log("err: "+err)
    )
    console.log(this.cantones);
  }
  getProvincia(){
    this.provinciaService.getProvincias().subscribe(
      res => {
        this.provincias = res },
      err => console.error(err)
    )
  }

}
