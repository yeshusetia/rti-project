import { Routes } from '@angular/router';

export const routes: Routes = 
[
    {
        path : '',
        loadComponent:()=> import('../app/employee-management-view/landing/landing.component').then((c:any) => c.LandingComponent)
    },
    {
        path: 'add-employee', 
        loadComponent:()=> import('../app/employee-management-view/components/employee-add-edit/employee-add-edit.component').then((c:any) => c.EmployeeAddEditComponent)

      },
];
