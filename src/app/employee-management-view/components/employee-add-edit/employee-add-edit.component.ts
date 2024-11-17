import { Component, computed, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePickerComponent } from '../common-components/date-picker/date-picker.component';
import { IndexeddbService } from '../../services/indexeddb.service';
import { CommonModule } from '@angular/common'; 
import { CustomDropdownComponent } from '../common-components/custom-dropdown/custom-dropdown.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-employee-add-edit',
  standalone: true,
  imports: [DatePickerComponent,CommonModule,CustomDropdownComponent],
  templateUrl: './employee-add-edit.component.html',
  styleUrl: './employee-add-edit.component.scss'
})
export class EmployeeAddEditComponent {
  constructor(private activeRoute: ActivatedRoute,private router: Router,private indexedDBService: IndexeddbService,private snackBar: MatSnackBar ) 
  {

  }
  mode = signal<'add' | 'edit'>('add');
  employeeDetail = signal<any>({});
  selectedRole = signal<any>({label:'',value:''});
  employeeName = signal<any>('');

  isFormValid = computed(() => {
    return this.employeeName().trim() !== '' && !!this.selectedRole()?.value;
  });
  
  roles = [
    { label: 'Product Designer', value: 'PRODUCT_DESIGNER' },
    { label: 'Flutter Developer', value: 'FLUTTER_DEVELOPER' },
    { label: 'QA Tester', value: 'QA_TESTER' },
    { label: 'Product Owner', value: 'PRODUCT_OWNER' },
  ];


   ngOnInit()
  {
    this.activeRoute.queryParams.subscribe((params: any) =>{
      if(params.mode == 'add')
      {
        this.mode.set('add'); 
        console.log("add Mode")
      }
      if(params.mode == 'edit')
      {
        this.mode.set('edit'); 
        console.log("edit Mode")
        this.loadEmployeeDetails(params.id); 

      }
    })
  }

  async loadEmployeeDetails(id: number): Promise<void> {
    try {
      const employee: any = await this.indexedDBService.getEmployeeById(Number(id)); 
      if (employee) {
        this.employeeDetail.set(employee)
        this.employeeName.set(employee.name);
        this.selectedRole.set(
          this.roles.find((role: any) => role.value === employee.role?.value) || { label: '', value: '' }
        
        );
        console.log('Selected role set to:', this.selectedRole());
        console.log('Employee loaded for edit:', employee);
      } else {
        console.error('Employee not found');
      }
    } catch (error) {
      console.error('Error loading employee details:', error);
    }
  }

  showSuccessSnackbar() {
    this.snackBar.open('Employee added successfully!', 'Close', {
      duration: 3000, 
      horizontalPosition: 'center', 
      verticalPosition: 'top',
      panelClass: ['success-snackbar'], 
    });
  }

  onRoleSelected(role: { label: string; value: string }) {
    this.selectedRole.set(role);
  }

 saveEmployee() {
  if (this.isFormValid()) {
    const employee = {
      id: this.employeeDetail()?.id || Date.now(), 
      name: this.employeeName(),
      role: this.selectedRole(),
      startDate: '946684800000',
      endDate: Math.random() < 0.5 ? '' : '1700307323000',
    };

    if (this.mode() == 'add') {
      // Add a new employee
      this.indexedDBService.addEmployee(employee).then(() => {
        this.navigateToListEmployee();
        console.log('Employee added successfully');
      });
    } else if (this.mode() == 'edit') {
      // Update existing employee
      this.indexedDBService.updateEmployee(employee).then(() => {
        this.navigateToListEmployee();
        console.log('Employee updated successfully');
      });
    }
  } else {
    alert('Please fill in all fields');
  }
}

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.employeeName.set(inputElement.value);
  }
  
  
  navigateToListEmployee() {
    this.router.navigate(['/']).then(success => {
      console.log('Navigation successful:', success);
    }).catch(error => {
      console.error('Navigation error:', error);
    });
  }
  
}
