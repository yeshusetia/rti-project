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
    this.router.navigate(['/add-employee']); // Navigate to the Add Employee page
  }
}

