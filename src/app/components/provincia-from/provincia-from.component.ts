import { Component, HostBinding, OnInit } from '@angular/core';
import { Provincia } from 'src/app/models/Provincia';
import { ProvinciaService } from '../../services/provincia.service';
import {ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-provincia-from',
  templateUrl: './provincia-from.component.html',
  styleUrls: ['./provincia-from.component.css']
})
export class ProvinciaFromComponent implements OnInit {

  @HostBinding('class') classes = 'row';
  provincia : Provincia ={
    nombre: '',
    descripcion: '',
    habitantes: 0
  };
  edit: boolean = false;

  constructor(private provinciaService: ProvinciaService, private router: Router,private activeroute: ActivatedRoute) { }

  ngOnInit() {
    const params = this.activeroute.snapshot.params;
    console.log(params);
    if(params.id){
      this.provinciaService.getProvincia(params.id).subscribe(
        res=>{
          if(res!= null){
            console.log(res);
            this.provincia = res; // luego ponemos eso
            this.edit = true;

          }else{
            this.router.navigate(['/provincia']);
          }
          
        },
        err => console.log("hay error "+ err)
      )
    }
  }

  saveNewP(){
    this.provinciaService.saveProvincia(this.provincia).subscribe(

      res => {
        console.log("res : "+ res);
        //this.router.navigate(['/provincia']);
        this.provincia.nombre=' ';
        this.provincia.habitantes = 0;
        this.provincia.descripcion = ' ';
      },
      err => console.log("err : "+ err)
    );
  }

  updateP(){
    this.provinciaService.updateProvincia(this.provincia.id,this.provincia).subscribe(
      res => {
        console.log("res: "+res);
        this.provincia.nombre=' ';
        this.provincia.habitantes = 0;
        this.provincia.descripcion = ' ';
      },
      err => console.log("err: "+err)
    )
    console.log(this.provincia);
  }

}
