import { Component, OnInit } from '@angular/core';
import { ProfesoresService } from '../../services/profesores.service';
import { Profesor } from '../../models/Profesor';

@Component({
  selector: 'app-profesores-list',
  templateUrl: './profesores-list.component.html',
  styleUrls: ['./profesores-list.component.css']
})
export class ProfesoresListComponent implements OnInit {
  profesores : any = [];

  constructor(private profesoresService: ProfesoresService) { }

  ngOnInit() {
    this.getProfesores();
  }
  getProfesores(){
    this.profesoresService.getProfesores().subscribe(
      res => {
        this.profesores = res },
      err => console.error(err)
    )
  }
  borrarP(id:number){
    this.profesoresService.deleteProfesor(id).subscribe(
      res => {
        console.log("res: "+res);
        this.getProfesores();
      },
      err => console.log("err: "+err)
    )

  }

}
