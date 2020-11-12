import { Component, HostBinding, OnInit } from '@angular/core';
import { ProfesoresService } from '../../services/profesores.service';
import { Profesor } from '../../models/Profesor';
import {ActivatedRoute, Router } from '@angular/router'; 

@Component({
  selector: 'app-profesores-form',
  templateUrl: './profesores-form.component.html',
  styleUrls: ['./profesores-form.component.css']
})
export class ProfesoresFormComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  profesor : Profesor ={
    id: 0,
    nombre: '',
    apellido: '',
    cedula: '',
    fechanacimiento: '',
    edad: 0,
    direccion:'',
    telefono:'',
    titulo:'', 
  };
  edit: boolean = false;

  constructor(private profesorService: ProfesoresService,private router: Router,private activeroute: ActivatedRoute) { }

  ngOnInit() {
    const params = this.activeroute.snapshot.params;
    console.log(params);
    if(params.id){
      this.profesorService.getProfesor(params.id).subscribe(
        res=>{
          if(res!= null){
            console.log(res);
            this.profesor = res; // luego ponemos eso
            this.edit = true;

          }else{
            this.router.navigate(['/profesores']);
          }
          
        },
        err => console.log("hay error "+ err)
      )
    }
  }

  saveNewP(){
    this.profesorService.saveProfesor(this.profesor).subscribe(

      res => {
        console.log("res : "+ res);
        //this.router.navigate(['/provincia']);
        this.profesor.apellido= ' ';
        this.profesor.nombre= ' ';
        this.profesor.cedula= ' ';
        this.profesor.fechanacimiento= ' ';
        this.profesor.edad= 0,
        this.profesor.direccion=' ';
        this.profesor.telefono=' ';
        this.profesor.titulo=' ';
      },
      err => console.log("err : "+ err)
    );
  }

  updateP(){
    this.profesorService.updateProfesor(this.profesor.id,this.profesor).subscribe(
      res => {
        console.log("res: "+res);
        this.profesor.apellido= ' ';
        this.profesor.nombre= ' ';
        this.profesor.cedula= ' ';
        this.profesor.fechanacimiento= ' ';
        this.profesor.edad= 0;
        this.profesor.direccion=' ';
        this.profesor.telefono=' ';
        this.profesor.titulo=' ';
      },
      err => console.log("err: "+err)
    )
    console.log(this.profesor);
  }

}
