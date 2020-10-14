import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Materias } from 'src/app/models/Materias';
import { Profesor } from 'src/app/models/Profesor';
import { MateriasService } from '../../services/materias.service';
//import { ProfesorService } from '../../services/profesor.service';

@Component({
  selector: 'app-materias-form',
  templateUrl: './materias-form.component.html',
  styleUrls: ['./materias-form.component.css']
})
export class MateriasFormComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  profesor: Profesor;
  selectDivece : string;
  materias : Materias = {
    id: 0,
    nombre: '',
    horas:0,
    profesor: { id: 0}
  }
  edit: boolean = false;
  //private profseorService : ProfesorService;
  constructor(private materiasService: MateriasService, private router: Router,private activeroute: ActivatedRoute) { }

  ngOnInit() {
    const params = this.activeroute.snapshot.params;
    console.log(params);
    if(params.id){
      this.materiasService.getMateria(params.id).subscribe(
        res=>{
          if(res!= null){
            console.log(res);
            this.materias = res; // luego ponemos eso
            this.edit = true;

          }else{
            this.router.navigate(['/materias']);
          }
          
        },
        err => console.log("hay error "+ err)
      )
    }
   // this.getProfesores();
  }
  saveNewP(){
  
    this.materias.profesor.id = +this.selectDivece;
    
        this.materiasService.saveMateria(this.materias).subscribe(
    
          res => {
            console.log("res : "+ res);
            //this.router.navigate(['/provincia']);
            this.materias.nombre=' ';
            this.materias.profesor={id:0};
            this.materias.horas = 0;
          },
          err => console.log("err : "+ err)
        );
      }
      onChange(deviceValue) {
       this.selectDivece= deviceValue;
    }
    updateP(){
      this.materias.profesor.id = +this.selectDivece;
      this.materiasService.updateMateria(this.materias.id,this.materias).subscribe(
        res => {
          console.log("res: "+res);
          this.materias.nombre=' ';
          this.materias.profesor= {id: 0};
          this.materias.horas = 0;
        },
        err => console.log("err: "+err)
      )
      console.log(this.materias);
    }
    // getProvincia(){
    //   this.profesorService.getProfesores().subscribe(
    //     res => {
    //       this.profesor = res },
    //     err => console.error(err)
    //   )
    // }


}
