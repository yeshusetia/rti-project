import { Component,computed,signal } from '@angular/core';
import { EmployeeListComponent } from '../components/employee-list/employee-list.component';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common'; 
@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [EmployeeListComponent,RouterOutlet,CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

  currentRoute = signal('');
  queryParams = signal<any>({});
  employeeId = signal('')
  mode = signal<'add' | 'edit'>('add');
  employeeDetail = signal<any>({});
  headerTitle = computed(
    () => {
      const route = this.currentRoute();
      const mode = this.queryParams()['mode'];
  
      if (route.includes('add-edit')) {
        if (mode == 'add') {
          return 'Add Employee';
        } else if (mode == 'edit') {
        
          return 'Edit Employee';
        }
      }
  
      return 'Employee List';
    }// Enable signal writes inside this computed
  );

  constructor(private router: Router, private activatedRoute: ActivatedRoute) 
  {
    this.currentRoute.set(this.router.url);
    this.activatedRoute.queryParams.subscribe((params) => {
      this.queryParams.set(params); 
    });
  }
  
  ngOnInit() 
  {
  
  }


  deletEmployee()
  {

  }
  // async loadEmployeeDetails(id: number): Promise<void> {
  //   try {
  //     const employee: any = await this.indexedDBService.getEmployeeById(Number(id)); 
  //     if (employee) {
  //       this.employeeDetail.set(employee)
  //       this.employeeName.set(employee.name);
  //       this.selectedRole.set(
  //         this.roles.find((role: any) => role.value === employee.role?.value) || { label: '', value: '' }
        
  //       );
  //       console.log('Selected role set to:', this.selectedRole());
  //       console.log('Employee loaded for edit:', employee);
  //     } else {
  //       console.error('Employee not found');
  //     }
  //   } catch (error) {
  //     console.error('Error loading employee details:', error);
  //   }
  // }

 
}

