import { Component,computed,signal } from '@angular/core';
import { EmployeeListComponent } from '../components/employee-list/employee-list.component';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [EmployeeListComponent,RouterOutlet],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

  currentRoute = signal('');
  queryParams = signal<any>({});

  headerTitle = computed(() => {
    const route = this.currentRoute();
    const mode = this.queryParams()['mode'];

    if (route.includes('add-edit')) {
      if (mode === 'add') {
        return 'Add Employee';
      } else if (mode === 'edit') {
        return 'Edit Employee';
      }
    }

    return 'Employee List'; 
  });

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

 
}

