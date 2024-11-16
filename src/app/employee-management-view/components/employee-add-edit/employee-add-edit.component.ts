import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatePickerComponent } from '../common-components/date-picker/date-picker.component';
import { IndexeddbService } from '../../services/indexeddb.service';

@Component({
  selector: 'app-employee-add-edit',
  standalone: true,
  imports: [DatePickerComponent],
  templateUrl: './employee-add-edit.component.html',
  styleUrl: './employee-add-edit.component.scss'
})
export class EmployeeAddEditComponent {
  constructor(private router: Router,private indexedDBService: IndexeddbService) {}

   ngOnInit() {

  }

  async saveEmployee() {
    if (true ) {
      const employee = {
        id: Date.now(),
        name: 'yeshu',
        role: 'yeshu',
        startDate: 'yeshu',
      };

      await this.indexedDBService.addEmployee(employee);
      console.log('Employee added successfully');
    } else {
      alert('Please fill in all fields');
    }
  }
  
  
  navigateToListEmployee() {
    this.router.navigate(['/']); // Navigate to the Add Employee page
  }
}
