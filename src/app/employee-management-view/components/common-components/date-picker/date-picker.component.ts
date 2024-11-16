import { Component } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent {
  selectedDate: string = 'No date'; // Default selected date
  isDatePickerOpen: boolean = false; // Toggles the visibility of the date picker

  // Predefined date options
  quickDates = [
    { label: 'Today', value: new Date() },
    { label: 'Next Monday', value: this.getNextDayOfWeek(1) }, // Monday
    { label: 'Next Tuesday', value: this.getNextDayOfWeek(2) }, // Tuesday
    { label: 'After 1 week', value: this.addDays(new Date(), 7) },
  ];

  // Toggle date picker visibility
  toggleDatePicker() {
    this.isDatePickerOpen = !this.isDatePickerOpen;
  }

  // Set a date and close the picker
  setDate(date: Date) {
    this.selectedDate = date.toDateString();
    this.isDatePickerOpen = false;
  }

  // Utility: Get the next specific day of the week
  private getNextDayOfWeek(dayOfWeek: number): Date {
    const date = new Date();
    const diff = (dayOfWeek + 7 - date.getDay()) % 7 || 7; // Ensure we always get a future date
    return this.addDays(date, diff);
  }

  // Utility: Add days to a date
  private addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}
