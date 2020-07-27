import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { ListEmployeeComponent } from './list-employee/list-employee.component';

const routes: Routes = [
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: 'list-employee', component: ListEmployeeComponent },
  { path: '', redirectTo: 'list-employee', pathMatch: 'full' },
  { path: '**', redirectTo: 'list-employee', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
