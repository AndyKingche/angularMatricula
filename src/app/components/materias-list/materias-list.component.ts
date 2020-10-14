import { Component, OnInit } from '@angular/core';
import { MateriasService } from '../../services/materias.service';

@Component({
  selector: 'app-materias-list',
  templateUrl: './materias-list.component.html',
  styleUrls: ['./materias-list.component.css']
})
export class MateriasListComponent implements OnInit {

  materias : any = [];
  constructor( private materiaService : MateriasService ) { }

  ngOnInit() {
    this.getMateria();
  }
  getMateria(){
    this.materiaService.getMaterias().subscribe(
      res => {
        this.materias = res },
      err => console.error(err)
    )
  }
  borrarP(id:number){
    this.materiaService.deleteMateria(id).subscribe(
      res => {
        console.log("res: "+res);
        this.getMateria();
      },
      err => console.log("err: "+err)
    )

  }

}
