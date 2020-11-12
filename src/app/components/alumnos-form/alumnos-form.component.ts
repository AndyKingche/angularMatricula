import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumnos } from '../../models/Alumnos';
import { AlumnosService } from '../../services/alumnos.service';
import { Provincia } from '../../models/Provincia';
import { ProvinciaService } from '../../services/provincia.service';

@Component({
  selector: 'app-alumnos-form',
  templateUrl: './alumnos-form.component.html',
  styleUrls: ['./alumnos-form.component.css']
})
export class AlumnosFormComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  provincias :  Provincia;
  selectDivece : string;
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
  
  edit: boolean = false;

  constructor(private alumnosService:AlumnosService, private provinciasService: ProvinciaService, private router: Router,private activeroute: ActivatedRoute) { }

  ngOnInit() {
    const params = this.activeroute.snapshot.params;
    console.log(params);
    if(params.id){
      this.alumnosService.getAlumno(params.id).subscribe(
        res=>{
          if(res!= null){
            console.log(res);
            this.alumnos = res; // luego ponemos eso
            this.edit = true;

          }else{
            this.router.navigate(['/cantones']);
          }
          
        },
        err => console.log("hay error "+ err)
      )
    }
    this.getAlumno();
  }

  saveNewP(){
    this.alumnos.provincia.id = +this.selectDivece;
    
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
    }
      updateP(){
        this.alumnos.provincia.id = +this.selectDivece;
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
            this.provincias = res },
          err => console.error(err)
        )
      }

}
