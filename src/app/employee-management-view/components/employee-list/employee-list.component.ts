import { Component, OnInit } from '@angular/core';
import { IndexeddbService } from '../../services/indexeddb.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  private touchStartX: number = 0;
  private currentEmployee: any = null;
  private threshold: number = 50; // Minimum swipe distance to trigger action
  constructor(private router: Router,private indexedDBService: IndexeddbService) {}

  async ngOnInit() {
    this.employees = [];
    await this.loadEmployees();
  }

  async loadEmployees() {
    try {
      this.employees = await this.indexedDBService.getEmployees();
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  }

  async deleteEmployee(id: number) {
    try {
      await this.indexedDBService.deleteEmployee(id);
      this.employees = await this.indexedDBService.getEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  }

  navigateToAddEmployee() {
    this.router.navigate(['/add-edit-employee'], {
      queryParams: { mode: 'add'}, 
    });
  }
  navigateToEditEmployee(employee:any)
  {
    this.router.navigate(['/add-edit-employee'], {
      queryParams: { mode: 'edit',id:employee.id}, 
    });
  }


  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.touches[0].clientX;
  }

 

  onTouchMove(event: TouchEvent, employee: any) {
    const touchCurrentX = event.touches[0].clientX;
    const swipeDistance = touchCurrentX - this.touchStartX;

    // Limit swipe to left only (negative values)
    if (swipeDistance < 0) {
      employee.translateX = swipeDistance; // Update the translateX value dynamically
      this.currentEmployee = employee; // Track the swiped employee
    }
  }

  onTouchEnd(employee: any) {
    const threshold = -100; 

    if (employee.translateX < threshold) {
      // Swipe is successful, delete the employee
      this.deleteEmployee(employee.id);
    } else {
      // Reset translateX if swipe is incomplete
      employee.translateX = 0;
    }

    this.currentEmployee = null; // Clear the current swiped employee
  }

}

