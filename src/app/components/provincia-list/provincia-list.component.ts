import { Component, OnInit } from '@angular/core';
import { Provincia } from '../../models/Provincia';
import { ProvinciaService } from '../../services/provincia.service';

@Component({
  selector: 'app-provincia-list',
  templateUrl: './provincia-list.component.html',
  styleUrls: ['./provincia-list.component.css']
})
export class ProvinciaListComponent implements OnInit {
  provincias : any = [];

  constructor(private provinciaService: ProvinciaService) { }

  ngOnInit() {
   this.getProvincia();
  }
  getProvincia(){
    this.provinciaService.getProvincias().subscribe(
      res => {
        this.provincias = res },
      err => console.error(err)
    )
  }
  borrarP(id:number){
    this.provinciaService.deleteProvincia(id).subscribe(
      res => {
        console.log("res: "+res);
        this.getProvincia();
      },
      err => console.log("err: "+err)
    )

  }

}
