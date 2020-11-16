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
  profesoresBuscar : Profesor = {
    nombre:''
  };
  constructor(private profesoresService: ProfesoresService) { }

  ngOnInit() {
    this.getProfesores();
  
  }
  onSearchChange(searchValue: string): void {  
    console.log("datos ingresados "+searchValue);
    if(searchValue.length != 0){
      this.profesoresBuscar.nombre = searchValue;
      this.buscarProfesor();
    }else{
     
      this.getProfesores();
    }
   
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
  buscarProfesor(){
    if(this.profesoresBuscar.nombre.length != 0){
      this.profesoresService.encontrarProfesor(this.profesoresBuscar.nombre).subscribe(
      res => {this.profesores = res},
      err => console.error("error al encontrar profesor", err)
      );
    }else{
      this.getProfesores();
    }

  }

}
