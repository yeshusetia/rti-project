import { Routes } from '@angular/router';

export const routes: Routes = 
[
    {
        path : '',
        loadComponent:()=> import('../app/employee-management-view/landing/landing.component').then((c:any) => c.LandingComponent),
        children: [ 
            {
                path: '', 
                loadComponent:()=> import('../app/employee-management-view/components/employee-list/employee-list.component').then((c:any) => c.EmployeeListComponent)
            },
            {
            path: 'add-edit-employee', 
            loadComponent:()=> import('../app/employee-management-view/components/employee-add-edit/employee-add-edit.component').then((c:any) => c.EmployeeAddEditComponent)
          },
        ]
    },
  
   
];
