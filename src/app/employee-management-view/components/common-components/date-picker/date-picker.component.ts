import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent {
  selectedDate: Date = new Date(); // Holds the selected date
  visibleMonth: Date = new Date(); // Holds the current visible month
  @Output() dateSelected = new EventEmitter<Date>(); // Emit the selected date to parent component
  @Output() cancelSelection = new EventEmitter<void>();
  // Get an array of dates for the visible month (including leading/trailing days)
  getCalendarDays(): Date[] {
    const days: Date[] = [];
    const firstDayOfMonth = new Date(this.visibleMonth.getFullYear(), this.visibleMonth.getMonth(), 1);
    const firstDayOfWeek = firstDayOfMonth.getDay(); // Sunday = 0, Monday = 1, etc.

    // Calculate the total days to show (42 days grid)
    for (let i = 0; i < 42; i++) {
      const date = new Date(
        this.visibleMonth.getFullYear(),
        this.visibleMonth.getMonth(),
        i - firstDayOfWeek + 1
      );
      days.push(date);
    }

    return days;
  }

  // Predefined date button handlers
  setToday() {
    this.selectedDate = new Date();
  }

  setNextMonday() {
    const today = new Date();
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + ((8 - today.getDay()) % 7 || 7));
    this.selectedDate = nextMonday;
  }

  setNextTuesday() {
    const today = new Date();
    const nextTuesday = new Date(today);
    nextTuesday.setDate(today.getDate() + ((9 - today.getDay()) % 7 || 7));
    this.selectedDate = nextTuesday;
  }

  setAfterOneWeek() {
    const today = new Date();
    const afterOneWeek = new Date(today);
    afterOneWeek.setDate(today.getDate() + 7);
    this.selectedDate = afterOneWeek;
  }

  // Calendar navigation
  changeMonth(offset: number) {
    this.visibleMonth.setMonth(this.visibleMonth.getMonth() + offset);
    this.visibleMonth = new Date(this.visibleMonth); // Update visible month
  }

  // Select a date
  selectDate(day: number) {
    this.selectedDate = new Date(this.visibleMonth.getFullYear(), this.visibleMonth.getMonth(), day);
  //  this.dateSelected.emit(this.selectedDate); 
  }


  cancel() {
    this.cancelSelection.emit(); // Emit the cancel event
  }

  saveSelection() {
    this.dateSelected.emit(this.selectedDate); // Emit the selected date when Save is clicked
    console.log('Selected Date:', this.selectedDate);
  }
}
