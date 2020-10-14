import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { CantonesService } from '../../services/cantones.service';

@Component({
  selector: 'app-cantones-list',
  templateUrl: './cantones-list.component.html',
  styleUrls: ['./cantones-list.component.css']
})
export class CantonesListComponent implements OnInit {

  cantones : any =[];
  constructor(private cantonesService: CantonesService) { }

  ngOnInit() {
    this.getCantones();
  }
  getCantones(){
    this.cantonesService.getCantones().subscribe(
      res => {
        this.cantones = res },
      err => console.error(err)
    )
  }
  borrarP(id:number){
    this.cantonesService.deleteCantones(id).subscribe(
      res => {
        console.log("res: "+res);
        this.getCantones();
      },
      err => console.log("err: "+err)
    )

  }

}
