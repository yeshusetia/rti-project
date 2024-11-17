import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, signal } from '@angular/core';

@Component({
  selector: 'app-custom-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.scss'],
})
export class CustomDropdownComponent {
  @Input() roles: { label: string; value: any }[] = [];
  @Input() set selectedRoleInput(value: { label: string; value: any } | null) {
    if (value) {
      this.selectedRole.set(value); 
    }
  }
  @Output() roleSelected = new EventEmitter<{ label: string; value: any }>();

  isDropdownOpen = signal(false);
  selectedRole = signal<{ label: string; value: string } | null>(null);

  ngOnInit(): void {
    if (this.selectedRoleInput) {
      this.selectedRole.set(this.selectedRoleInput);
    }
  }

  toggleDropdown() {
    this.isDropdownOpen.set(!this.isDropdownOpen());
  }

  selectRole(role: { label: string; value: string }) {
    this.selectedRole.set(role);
    this.isDropdownOpen.set(false);
    this.roleSelected.emit(role);
  }
}
