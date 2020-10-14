import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProvinciaListComponent } from './components/provincia-list/provincia-list.component';
import { ProvinciaFromComponent } from './components/provincia-from/provincia-from.component';
import { CantonesFormComponent } from './components/cantones-form/cantones-form.component';
import { CantonesListComponent } from './components/cantones-list/cantones-list.component';
import { MateriasFormComponent } from './components/materias-form/materias-form.component';
import { MateriasListComponent } from './components/materias-list/materias-list.component';

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
},
{
  path:'cantones',
  component:  CantonesListComponent
},
{
  path: 'cantones/add',
  component: CantonesFormComponent
},
{
  path: 'cantones/edit/:id',
  component: CantonesFormComponent
}
//,{
//   path: 'materias',
//   component: MateriasListComponent
// },
// {
// path: 'materias/add',
// component: MateriasFormComponent
// },
// {
//   path: 'materias/edit/:id',
//   component: MateriasFormComponent
// }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
