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
  renderedEmployees:any = [
    {
      heading : 'Current employees',
      employees:[]
    },
    {
      heading : 'Previous employees',
      employees:[]
    },
  ]
  private touchStartX: number = 0;
  private currentEmployee: any = null;
  private threshold: number = 50; 
  constructor(private router: Router,private indexedDBService: IndexeddbService) {}

  async ngOnInit() {
    this.renderedEmployees[0].employees=[]
    this.renderedEmployees[1].employees=[]
    await this.loadEmployees();
  }

  async loadEmployees() {
    this.renderedEmployees[0].employees=[]
    this.renderedEmployees[1].employees=[]
    try {
        let employees = await this.indexedDBService.getEmployees();
         employees.forEach((employee:any)=>
      {
        employee.translateX = 0; 
        if(employee.endDate == '')
        {
          this.renderedEmployees[0].employees.push(employee)
        }
        else
        {
          this.renderedEmployees[1].employees.push(employee)
        }
      })

      console.log('rendered',this.renderedEmployees)

    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  }

  async deleteEmployee(id: number) {
    try {
      await this.indexedDBService.deleteEmployee(id);
      this.renderedEmployees[0].employees=[]
      this.renderedEmployees[1].employees=[]
      await this.loadEmployees();
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

   
    if (swipeDistance < 0) {
      employee.translateX = swipeDistance; 
      this.currentEmployee = employee;
    }
  }

  onTouchEnd(employee: any) {
    const threshold = -250; 

    console.log("threshold",threshold,employee.translateX )
    if (employee.translateX < threshold) {
      
      this.deleteEmployee(employee.id);
    } else {
      
      employee.translateX = 0;
      employee.transition = 'transform 0.3s ease-out';
    }

    this.currentEmployee = null; // Clear the current swiped employee
  }

}

