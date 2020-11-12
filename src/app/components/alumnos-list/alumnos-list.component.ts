import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumnos } from '../../models/Alumnos';
import { AlumnosService } from '../../services/alumnos.service';


@Component({
  selector: 'app-alumnos-list',
  templateUrl: './alumnos-list.component.html',
  styleUrls: ['./alumnos-list.component.css']
})
export class AlumnosListComponent implements OnInit {
  alumnos : any =[];
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
  borrarP(id:number){
    this.alumnosService.deleteAlumno(id).subscribe(
      res => {
        console.log("res: "+res);
        this.getAlumnos();
      },
      err => console.log("err: "+err)
    )

  }

}
