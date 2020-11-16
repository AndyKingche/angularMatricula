import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumnos } from '../../models/Alumnos';
import { AlumnosService } from '../../services/alumnos.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
declare let $: any;

@Component({
  selector: 'app-alumnos-list',
  templateUrl: './alumnos-list.component.html',
  styleUrls: ['./alumnos-list.component.css']
})
export class AlumnosListComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  alumnos : any =[];
  alumnosBuscar : Alumnos ={
    nombre: ''
    
  };
  public formulario: FormGroup;
  constructor( private alumnosService: AlumnosService) { }

  ngOnInit() {
    this.getAlumnos();
   
  }
  getAlumnos(){
    this.alumnosService.getAlumnos().subscribe(
      res => {
        this.alumnos = res },
      err => console.error(err)
    )
  }
  onSearchChange(searchValue: string): void {  
    console.log("datos ingresados "+searchValue);
    if(searchValue.length != 0){
      this.alumnosBuscar.nombre = searchValue;
      this.buscarAlumno();
    }else{
     
      this.getAlumnos();
    }
   
  }
  borrarP(id:number){
    this.alumnosService.deleteAlumno(id).subscribe(
      res => {
       
        console.log("res: "+res);
        this.getAlumnos();
      },
      err => console.log("err: "+err)
    )

  }

  buscarAlumno(){
    if(this.alumnosBuscar.nombre.length != 0){
      this.alumnosService.encontrarAlumno(this.alumnosBuscar.nombre).subscribe(
        res=>{ 
          this.alumnos = res,
          console.log("--", this.alumnos)
        },
        err => console.log("error "+err)
      )
    }else{
      this.getAlumnos();
    }

  }

}
