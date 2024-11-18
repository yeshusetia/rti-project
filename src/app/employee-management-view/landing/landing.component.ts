import { Component, computed, signal } from '@angular/core';
import { EmployeeListComponent } from '../components/employee-list/employee-list.component';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { IndexeddbService } from '../services/indexeddb.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [EmployeeListComponent, RouterOutlet, CommonModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {

  currentRoute = signal('');
  queryParams = signal<any>({});
  employeeId: any = '';
  mode = signal<'add' | 'edit'>('add');
  employeeDetail = signal<any>({});

  // headerTitle will depend on queryParams and currentRoute
  headerTitle = computed(() => {
    const route = this.currentRoute();
    const mode = this.queryParams()['mode'];

    if (mode === 'add') {
      return 'Add Employee';
    } else if (mode === 'edit') {
      return 'Edit Employee';
    } else {
      return 'Employee List';
    }
  });

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private indexedDBService: IndexeddbService
  ) {
    this.currentRoute.set(this.router.url);

    // Update queryParams signal whenever the route changes
    this.activatedRoute.queryParams.subscribe((params) => {
      this.queryParams.set(params);
      this.employeeId = params['id'];
    });
  }

  ngOnInit() {
    // Any initialization logic can go here
  }

  async deleteEmployee() {
    try {
      await this.indexedDBService.deleteEmployee(Number(this.employeeId));
      await this.navigateToListEmployee();
      await this.snackBar.open('Employee Deleted successfully!', 'Close', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: ['success-snackbar'],
      });
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  }

  navigateToListEmployee() {
    this.router.navigate(['/']).then(success => {
      console.log('Navigation successful:', success);
    }).catch(error => {
      console.error('Navigation error:', error);
    });
  }
}
