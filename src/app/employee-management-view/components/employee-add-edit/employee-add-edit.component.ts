import { Component, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { DatePickerComponent } from '../common-components/date-picker/date-picker.component';
import { IndexeddbService } from '../../services/indexeddb.service';
import { CommonModule } from '@angular/common'; 
import { CustomDropdownComponent } from '../common-components/custom-dropdown/custom-dropdown.component';
@Component({
  selector: 'app-employee-add-edit',
  standalone: true,
  imports: [DatePickerComponent,CommonModule,CustomDropdownComponent],
  templateUrl: './employee-add-edit.component.html',
  styleUrl: './employee-add-edit.component.scss'
})
export class EmployeeAddEditComponent {
  constructor(private router: Router,private indexedDBService: IndexeddbService) {}
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
  
  }

  onRoleSelected(role: { label: string; value: string }) {
    this.selectedRole.set(role);
  }

  async saveEmployee() {
    if (true ) {
      const employee = {
        id: Date.now(),
        name: this.employeeName(),
        role: this.selectedRole(),
        startDate: 'yeshu',
      };

      await this.indexedDBService.addEmployee(employee);
       this.navigateToListEmployee()
      console.log('Employee added successfully');
    } 
    else {
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
