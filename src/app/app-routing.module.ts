import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProvinciaListComponent } from './components/provincia-list/provincia-list.component';
import { ProvinciaFromComponent } from './components/provincia-from/provincia-from.component';

const routes: Routes = [{
 path:' ',
 redirectTo:'/provincia',
 pathMatch: 'full'
},{
  path:'provincia',
  component: ProvinciaListComponent
},
{
  path: 'provincia/add',
  component: ProvinciaFromComponent
},
{
  path:'provincia/edit/:id',
  component: ProvinciaFromComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
