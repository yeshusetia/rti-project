import { Component } from '@angular/core';
import { EmployeeListComponent } from '../components/employee-list/employee-list.component';
@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [EmployeeListComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  ngOnInit(): void {
  
  }
}
